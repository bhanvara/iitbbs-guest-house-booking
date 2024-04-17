import jwksRsa from 'jwks-rsa';

var { expressjwt: jwt } = require("express-jwt");
import dotenv from 'dotenv';
import {jwtDecode} from 'jwt-decode';
dotenv.config();

import express from 'express';

const app = express();

export const authMiddleware = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
}).unless({ path: [] }); 

app.use(function (err: any, req: any, res: any, next: any) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    }
});

// export const adminMiddleware = async (req: any, res: any, next: any) => {

//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwtDecode(token);
//     console.log(decodedToken);
    
//     next();
// };