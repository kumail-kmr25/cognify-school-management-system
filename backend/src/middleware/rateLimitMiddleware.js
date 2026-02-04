const rateLimit = require('express-rate-limit');

// General limiter
exports.limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 10 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter limiter for Auth
exports.authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: 'Too many login attempts, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false,
});
