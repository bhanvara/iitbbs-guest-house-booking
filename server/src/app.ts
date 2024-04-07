import express from 'express';
import cors from 'cors';
import bookings from './routes/bookings';
import users from './routes/users';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json()); // for parsing application/json

app.use(cors());

app.use("/api/bookings", bookings);

app.use("/api/users", users);

export default app;