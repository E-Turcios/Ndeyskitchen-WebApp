const express = require('express');
const userRoutes = require('./routes/users');
const itemsRoutes = require('./routes/items');
const ordersRoutes = require('./routes/orders');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

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
app.use('/api/items', itemsRoutes);
app.use('/api/orders', ordersRoutes);

module.exports = app;
