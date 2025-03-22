function errorHandler(err, req, res, next) {


    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation error: ' + Object.values(err.errors).map(e => e.message).join(', ');
    }

    if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized. Please check your access token.';
    }

    if (err.message.includes('Access denied') || err.message.includes('Unauthorized access')) {
        statusCode = 403;
    }

    const stack = process.env.NODE_ENV === 'development' ? err.stack : null;

    console.error(`[ERROR] ${statusCode}: ${message}`);

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: stack,
    });
}

module.exports = errorHandler;
