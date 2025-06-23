import { DataSource } from "typeorm";

const test = new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [],
  synchronize: true,
});

test.initialize().then(() => {
  console.log("✅ TypeORM is working");
}).catch(err => {
  console.error("❌ TypeORM failed:", err);
});
