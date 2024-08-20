const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const createCommentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many comments created from this IP, please try again after 15 minutes',
});

const replyCommentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: 'Too many replies from this IP, please try again after 15 minutes',
});

module.exports = { createCommentLimiter, replyCommentLimiter };
