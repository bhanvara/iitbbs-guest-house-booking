import * as mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Create connection pool
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.query('SELECT 1 + 1 AS solution')
.then(([rows, fields]: [any, mysql.FieldPacket[]]) => {
    console.log('Connected to database. Result:', rows[0].solution);
})
.catch(error => {
    console.error('Error connecting to database:', error);
});