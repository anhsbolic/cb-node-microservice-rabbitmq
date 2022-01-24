const express = require('express');
require('dotenv').config();

const db = require('./db');
const respond = require('./helper/respond');

// router
const billingRouter = require('./app/billing/router');
const invoiceRouter = require('./app/invoice/router');
const productRouter = require('./app/product/router');
const purchaseOrderRouter = require('./app/purchaseOrder/router');

// app
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db connection
db.on('error', function () {
  console.log('Could not connect to MongoDB');
});

db.on('connected', function () {
  console.log('Connection established to MongoDB');
});

db.on('disconnected', function () {
  console.log('Lost MongoDB connection...');
});

db.on('reconnected', function () {
  console.log('Reconnected to MongoDB');
});

// api routes
app.use('/billing', billingRouter);
app.use('/invoice', invoiceRouter);
app.use('/product', productRouter);
app.use('/purchase-order', purchaseOrderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  respond.responseNotFound(res);
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  respond.responseError(res);
});

app.listen(port, () => {
  console.log(`Server listening on the port : ${port}`);
});
