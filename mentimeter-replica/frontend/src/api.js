import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchPolls = () => axios.get(`${API_URL}/polls`);
export const fetchPoll = (id) => axios.get(`${API_URL}/polls/${id}`);
export const createPoll = (pollData) => axios.post(`${API_URL}/polls`, pollData);
export const voteOnPoll = (pollId, optionIndex) => axios.post(`${API_URL}/${pollId}/vote`, { optionIndex });
