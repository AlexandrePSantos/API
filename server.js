require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const router_cm = require('./routes/cm/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/cm/', router_cm);

const port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.log('Express server listening on port', port)
})

app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
})