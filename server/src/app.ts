import express from 'express';
import cors from 'cors';
import bookings from './routes/bookings';
import users from './routes/users';
import bodyParser from 'body-parser';
import authMiddleware from './middlewares/authMiddleware';

const app = express();
app.use(bodyParser.json());
// app.use(authMiddleware); 

app.use('/protected', authMiddleware, (req, res) => {
    console.log(req.headers.authorization);
    res.send('You have accessed a protected route!');
});

app.use(cors());

app.use("/api/bookings", bookings);
app.use("/api/users", users);

export default app;