import React, { useState } from 'react';
import { db, auth } from '../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';

const SessionForm = () => {
  const [sessionName, setSessionName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateSession = async () => {
    if (!sessionName || !startTime || !endTime) return;

    const hostName = auth.currentUser?.displayName || auth.currentUser?.email;

    try {
      setLoading(true);
      await addDoc(collection(db, 'sessions'), {
        name: sessionName,
        start: new Date(startTime).toISOString(),
        end: new Date(endTime).toISOString(),
        createdBy: hostName,
        createdAt: new Date().toISOString(),
      });

      setSessionName('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create a Session</h2>
      <input
        type="text"
        placeholder="Session Name"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        className="border w-full mb-3 p-2 rounded"
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border w-full mb-3 p-2 rounded"
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="border w-full mb-3 p-2 rounded"
      />
      <button
        onClick={handleCreateSession}
        disabled={loading}
        className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Creating...' : 'Create Session'}
      </button>
    </div>
  );
};

export default SessionForm;
