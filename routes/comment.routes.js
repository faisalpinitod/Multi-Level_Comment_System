const express = require('express');
const {
  createComment,
  replyToComment,
  getComments,
  expandComment,
} = require('../controllers/comment.controller');
const authenticate = require('../middleware/auth.middleware');
const {
  createCommentLimiter,
  replyCommentLimiter,
} = require('../middleware/rateLimiter.middleware');

const router = express.Router();

// Route to create a new comment
router.post('/posts/:postId/comments', authenticate, createCommentLimiter, createComment);

// Route to reply to an existing comment
router.post('/posts/:postId/comments/:commentId/reply', authenticate, replyCommentLimiter, replyToComment);

// Route to get comments for a post
router.get('/posts/:postId/comments', getComments);

// Route to expand a parent-level comment with pagination
router.get('/posts/:postId/comments/:commentId/expand', expandComment);

module.exports = router;
