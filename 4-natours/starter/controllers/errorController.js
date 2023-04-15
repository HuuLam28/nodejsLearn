const AppError = require('../utils/appError');

const handlerCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400)
}

handlerDuplicateError =  err => { 
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate value: ${value}`;
    return new AppError(message, 400);
}
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    else {
        console.error('ERROR', err)  

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
            name: err.name,
        })
    }
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    })
};

module.exports = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    if (process.env.NODE_ENV === 'production') {
        if (err.name === 'CastError') {
            err = handlerCastError(err);
        }
        if ( err.code === 11000) {
            err = handlerDuplicateError(err);
        }
        sendErrorProd(err, res);
    }
    else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
}