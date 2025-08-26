import React, { useEffect, useState } from 'react';
import { fetchPolls } from '../api';

export default function PollViewer({ setCurrentPollId }) {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls().then(res => setPolls(res.data));
  }, []);

  return (
    <div>
      {polls.length === 0 && <p>No polls available.</p>}
      <ul>
        {polls.map(poll => (
          <li key={poll._id}>
            <button onClick={() => setCurrentPollId(poll._id)}>{poll.question}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
