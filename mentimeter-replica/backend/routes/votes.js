const express = require('express');
const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const router = express.Router();

module.exports = (io) => {
  // Vote on a poll option
  router.post('/:pollId/vote', async (req, res) => {
    const { optionIndex } = req.body;
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Invalid option index' });
    }

    // Save vote
    const vote = new Vote({ pollId, optionIndex });
    await vote.save();

    // Update vote count in Poll
    poll.options[optionIndex].votes += 1;
    await poll.save();

    // Emit updated poll to clients in real-time
    io.to(pollId).emit('pollUpdated', poll);

    res.json({ message: 'Vote recorded', poll });
  });

  return router;
};
