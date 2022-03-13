const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  //poUr les CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/utilisateurs');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', postsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;