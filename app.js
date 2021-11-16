require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));




var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server up and running...');
});