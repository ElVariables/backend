require('dotenv').config();

const express = require('express');
const cors = require('cors');
const controller = require('./controller');
const { handleDatabase } = require('./config/mongoDB');

const PORT = process.env.PORT;

const app = express();

handleDatabase();

app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
);

app.use(express.json());
app.use('/', controller);

app.get('/', (req, res) => {
    res.send('database');
});

app.listen(PORT, () => {
    console.log(`Sever Running In ${PORT}`);
});
