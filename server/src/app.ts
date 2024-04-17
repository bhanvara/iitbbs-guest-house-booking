import express from 'express';
import cors from 'cors';
import bookings from './routes/bookings';
import users from './routes/users';
import admin from './routes/admin';
import bodyParser from 'body-parser';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
  res.send(`Backend for IIT BBS Guest House Booking System!`);
});

app.use(authMiddleware);

app.get('/protected', (req: any, res: any) => {
  res.send(`Hello there!`);
});

app.use('/admin', admin);
app.use("/api/bookings", bookings);
app.use("/api/users", users);

export default app;