const express = require("express");
const morgan = require("morgan");

const AppError = require('./4-natours/starter/utils/appError');
const globalErrorHandler = require('./4-natours/starter/controllers/errorController');
const tourRouter = require("./4-natours/starter/routes/tourRoute");
const usersRouter = require("./4-natours/starter/routes/userRoute");

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/4-natours/starter/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler)

 
module.exports = app;
