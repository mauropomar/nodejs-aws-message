import express from "express";
import AWS from 'aws-sdk';

import bodyparser from "body-parser";
import 'dotenv/config';

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// import routes
import { messageRoutes } from './routes/index.js';

// route middlewares

app.use('/api/message', messageRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to server with s3' });
});

const ssmClient = new AWS.SSM({
    region: 'us-east-1',
    accessKeyId: process.env.PASSWORD_ACCESS,
    secretAccessId: process.env.PASSWORD_ACCESS_SECRET
});

/*ssmClient.putParameter({
    Name: 'test-paymeter',
    Description: 'This is a simple key',
    Type: 'SecureString',
    Value: 'testSecretValue'
}, (err, data) => {
    if (err) console.log(err);
    console.log(data);
})

ssmClient.getParameter({
    Name: 'test-paymeter',
    WithDecryption: true
}, (err, data) => {
    if (err) console.log(err);
    console.log(data);
})*/

// iniciar server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})