import React, { useState } from 'react';
import PollCreator from './components/PollCreator';
import PollViewer from './components/PollViewer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentPollId, setCurrentPollId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Mentimeter Replica</h1>
      {!currentPollId && !isAdmin && (
        <>
          <button onClick={() => setIsAdmin(true)}>Admin Panel</button>
          <h2>Available Polls</h2>
          <PollViewer setCurrentPollId={setCurrentPollId} />
        </>
      )}
      {isAdmin && <AdminPanel setIsAdmin={setIsAdmin} />}
      {currentPollId && (
        <PollCreator pollId={currentPollId} setCurrentPollId={setCurrentPollId} />
      )}
    </div>
  );
}
