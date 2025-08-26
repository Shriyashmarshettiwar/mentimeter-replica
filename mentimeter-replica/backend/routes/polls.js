const express = require('express');
const Poll = require('../models/Poll');
const router = express.Router();

// Create poll
router.post('/', async (req, res) => {
  const { question, options } = req.body;
  if (!question || !options || options.length < 2) {
    return res.status(400).json({ error: 'Question and at least two options are required' });
  }
  const poll = new Poll({
    question,
    options: options.map(text => ({ text }))
  });
  await poll.save();
  res.status(201).json(poll);
});

// Get all polls
router.get('/', async (req, res) => {
  const polls = await Poll.find();
  res.json(polls);
});

// Get one poll by ID
router.get('/:id', async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ error: 'Poll not found' });
  res.json(poll);
});

module.exports = router;
