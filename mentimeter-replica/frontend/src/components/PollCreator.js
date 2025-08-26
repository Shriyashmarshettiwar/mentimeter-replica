import React, { useState, useEffect } from 'react';
import { fetchPoll, voteOnPoll } from '../api';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function PollCreator({ pollId, setCurrentPollId }) {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetchPoll(pollId).then(res => setPoll(res.data));

    socket.emit('joinPoll', pollId);

    socket.on('pollUpdated', (updatedPoll) => {
      setPoll(updatedPoll);
    });

    return () => {
      socket.emit('leavePoll', pollId);
      socket.off('pollUpdated');
    };
  }, [pollId]);

  const handleVote = async () => {
    if (selectedOption === null) return;
    await voteOnPoll(pollId, selectedOption);
    setSelectedOption(null);
  };

  if (!poll) return <p>Loading poll...</p>;

  return (
    <div>
      <h2>{poll.question}</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {poll.options.map((opt, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name="option"
                value={i}
                checked={selectedOption === i}
                onChange={() => setSelectedOption(i)}
              />
              {opt.text} — Votes: {opt.votes}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleVote} disabled={selectedOption === null}>Vote</button>
      <br />
      <button onClick={() => setCurrentPollId(null)}>Back to Polls</button>
    </div>
  );
}
