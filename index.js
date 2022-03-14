const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const route = require('./routes/router');

mongoose.connect(process.env.MONGO_URL, () =>
  console.log('DataBase connected')
);

app.use(express.json());
app.use(route);

app.listen(3000);
