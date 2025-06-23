import { Client } from 'pg';

const client = new Client({
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'TherapyAppBeta2025',
    database: 'therapy_app_beta',
});

client.connect()
    .then(() => {
        console.log('✅ Connected!');
        return client.end();
    })
    .catch((err) => {
        console.error('❌ Connection failed:', err.message);
    });
