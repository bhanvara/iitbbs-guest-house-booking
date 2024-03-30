import express from 'express';
import cors from 'cors';
import bookings from './routes/bookings';
import users from './routes/users';

const app = express();

app.use(cors());

app.use("/api/bookings", bookings);

app.use("/api/users", users);

export default app;