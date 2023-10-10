const express = require('express');
const userRoutes = require('./routes/users');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// app.use(
//   cors({
//     origin: 'http://127.0.0.1:8080',
//   })
// );

app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome' });
});

//routes
app.use('/api/users', userRoutes);
app.post('/api/users', userRoutes);

module.exports = app;
