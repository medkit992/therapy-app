import { Router, RequestHandler } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const repo = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || "replace_with_env_secret";

// POST /auth/register
const register: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (await repo.findOneBy({ email })) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }
        const hash = await bcrypt.hash(password, 10);
        const user = repo.create({ email, password: hash });
        const saved = await repo.save(user);
        res.status(201).json({ id: saved.id, email: saved.email });
    } catch (err) {
        next(err);
    }
};

// POST /auth/login
const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await repo.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "8h" }
        );
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

router.post("/register", register);
router.post("/login", login);

export default router;
