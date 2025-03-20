function errorHandler(err, req, res, next) {

    const statusCode = err.statusCode || 500;


    const message = err.message || 'Algo salió mal';
    const stack = process.env.NODE_ENV === 'development' ? err.stack : null;

    console.error(err);

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: stack,
    });
}

module.exports = errorHandler;
