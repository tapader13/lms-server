const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookey_parser = require('cookie-parser');
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.static('build'));
app.use(cookey_parser());
app.use(express.json());
app.use(express.static('public'));
const adminRoute = require('./routes/adminroute');
const studentRouter = require('./routes/studentroute');
app.use('/auth', adminRoute);
app.use('/studentauth', studentRouter);
app.listen(process.env.PORT || 4000, () =>
  console.log(`server start at http://localhost:${4000}`)
);
