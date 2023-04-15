import app from './app';
// import './database';

const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Arranca el servidor
app.listen(process.env.SERVER_PORT, () => {
  //console.log('Server listening on port', app.get('port'));
  console.log('Server is listening on port: ' + process.env.SERVER_PORT);
});
