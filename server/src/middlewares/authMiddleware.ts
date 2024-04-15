import jwksRsa from 'jwks-rsa';
var { expressjwt: jwt } = require("express-jwt");
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = jwt({
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

export default authMiddleware;
