// therapy-backend/src/index.ts
import "reflect-metadata";
import cors from "cors";
import path from "path";
import cron from "node-cron";
import http from "http";
import { Server as IOServer } from "socket.io";
import express from 'express';
import { AppDataSource } from "./data-source";
import sessionsRouter from "./routes/sessions";
import notesRouter from "./routes/notes";
import clientsRouter from "./routes/clients";
import dashboardRouter from "./routes/dashboard";
import analyticsRouter from "./routes/analytics";
import recordingRouter from "./routes/recording";

import { Session } from "./entity/Session";
import { sendEmail, sendSms } from "./utils/messaging";

const PORT = process.env.PORT || 3001;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Mount routers (all of these are express.Router instances)
app.use("/api/sessions", sessionsRouter);
app.use("/api/notes", notesRouter);
app.use("/api/notes", recordingRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/analytics", analyticsRouter);

// WebSocket setup
const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
    path: "/signaling",
    cors: { origin: "*" },
});
io.on("connection", socket => {
    socket.on("join-room", (roomId: string) => socket.join(roomId));
    socket.on("signal", ({ roomId, signal }) => {
        socket.to(roomId).emit("signal", signal);
    });
});

// Initialize DB and then start HTTP + cron
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Data Source has been initialized");

        // Scheduled job: 10-minute telehealth reminders
        cron.schedule("* * * * *", async () => {
            const repo = AppDataSource.getRepository(Session);
            const now = new Date();
            const inTen = new Date(now.getTime() + 10 * 60000);
            const day = now.toISOString().slice(0, 10);
            const time = inTen.toTimeString().slice(0, 5);

            const sessions = await repo
                .createQueryBuilder("s")
                .leftJoinAndSelect("s.client", "client")
                .where("s.isTelehealth = :t", { t: true })
                .andWhere("s.date = :d", { d: day })
                .andWhere("s.time = :tm", { tm: time })
                .getMany();

            for (const session of sessions) {
                const when = `${session.date} ${session.time}`;
                const link = session.telehealthUrl!;
                const emailMsg = `
          <p>Hi ${session.client!.name},</p>
          <p>Your telehealth session starts at <strong>${when}</strong>.</p>
          <p>Join via: <a href="${link}">${link}</a></p>
        `;
                await sendEmail(session.client!.email!, "Your Telehealth Session Starts Soon", emailMsg);
                await sendSms(session.client!.phone!, "verizon", `Session at ${when}. Join: ${link}`);
                console.log(`🔔 Reminder sent for session ${session.id}`);
            }
        });

        // Start server
        httpServer.listen(PORT, () => {
            console.log(`Server & WebSocket listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Error during Data Source initialization", err);
    });
