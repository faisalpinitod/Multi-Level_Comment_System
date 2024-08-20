const Comment = require('../models/comment.model');

// Create a new comment
const createComment = async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;

  // Input validation
  if (!text || !postId) {
    return res.status(400).json({ message: 'Text and postId are required' });
  }

  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Create new comment
    const comment = await Comment.create({
      text,
      postId,
      userId: req.user._id,
    });

    res.status(201).json({
      message: 'Comment successfully created',
      comment,
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Reply to an existing comment
const replyToComment = async (req, res) => {
  const { text } = req.body;
  const { postId, commentId } = req.params;

  // Input validation
  if (!text || !postId || !commentId) {
    return res.status(400).json({ message: 'Text, postId, and commentId are required' });
  }

  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Create new reply
    const reply = await Comment.create({
      text,
      postId,
      userId: req.user._id,
      parentCommentId: commentId,
    });

    res.status(201).json({
      message: 'Reply successfully created',
      reply,
    });
  } catch (error) {
    console.error('Error replying to comment:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Get comments for a post
const getComments = async (req, res) => {
  const { postId } = req.params;
  const { sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

  // Validate query parameters
  const validSortFields = ['createdAt', 'updatedAt']; // Add other fields as needed
  if (!validSortFields.includes(sortBy) || !['asc', 'desc'].includes(sortOrder)) {
    return res.status(400).json({ message: 'Invalid sort parameters' });
  }

  try {
    // Fetch comments
    const comments = await Comment.find({ postId, parentCommentId: null })
      .sort({ [sortBy]: sortOrder })
      .populate('replies');

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Expand a parent-level comment with pagination
const expandComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { page = 1, pageSize = 2 } = req.query;

  // Validate pagination parameters
  if (page < 1 || pageSize < 1) {
    return res.status(400).json({ message: 'Invalid pagination parameters' });
  }

  try {
    // Fetch parent comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Fetch replies with pagination
    const replies = await Comment.find({ parentCommentId: commentId })
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .sort({ createdAt: 'asc' });

    res.json({
      commentId: comment._id,
      text: comment.text,
      createdAt: comment.createdAt,
      postId: comment.postId,
      replies,
    });
  } catch (error) {
    console.error('Error expanding comment:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

module.exports = { createComment, replyToComment, getComments, expandComment };
