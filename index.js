require('dotenv').config();

const express = require('express');
const cors = require('cors');
const controller = require('./controller');
const connectDatabase = require('./config/mongoDB');

const PORT = process.env.PORT;

const app = express();

connectDatabase();

app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
);

app.use(express.json());
app.use('/api', controller);

app.get('/', (req, res) => {
    res.send('database');
});

app.listen(PORT, () => {
    console.log(`Sever Running In ${PORT}`);
});
