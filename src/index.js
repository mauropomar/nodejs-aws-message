import express from "express";
import validateToken from "./validations/validate-token.js";

import bodyparser from "body-parser";
import 'dotenv/config';

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// import routes
import { emailRoutes } from './routes/index.js';
import { smsRoutes } from './routes/index.js';
import { tokenRoutes } from './routes/index.js';

// route middlewares

app.use('/api/v1/email', validateToken, emailRoutes);
app.use('/api/v1/sms', validateToken, smsRoutes);
app.use('/api/v1/token', tokenRoutes);

// iniciar server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})