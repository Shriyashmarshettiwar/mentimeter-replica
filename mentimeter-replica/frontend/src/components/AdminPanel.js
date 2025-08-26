import React, { useState } from 'react';
import { createPoll } from '../api';

export default function AdminPanel({ setIsAdmin }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredOptions = options.filter(opt => opt.trim() !== '');
    if (!question.trim() || filteredOptions.length < 2) {
      alert('Enter a question and at least two options');
      return;
    }
    await createPoll({ question, options: filteredOptions });
    alert('Poll created!');
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <div>
      <h2>Admin Panel - Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question: </label>
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Options:</label>
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={e => handleOptionChange(i, e.target.value)}
              required={i < 2}
            />
          ))}
          <button type="button" onClick={addOption}>Add Option</button>
        </div>
        <button type="submit">Create Poll</button>
      </form>
      <button onClick={() => setIsAdmin(false)}>Back</button>
    </div>
  );
}
