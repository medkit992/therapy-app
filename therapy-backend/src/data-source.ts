import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'db', // or try '127.0.0.1' if needed
    port: 5432,
    username: 'postgres',
    password: 'TherapyAppBeta2025',
    database: 'therapy_app_beta',
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, '/entity/**/*.ts')],
    migrations: [path.join(__dirname, '/migration/**/*.ts')],
});
