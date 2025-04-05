import React, { useState } from 'react';
import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [role, setRole] = useState<'host' | 'member' | ''>('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (!role) {
      alert('Please select a role before signing in.');
      return;
    }

    try {
      await signInWithPopup(auth, provider);
      navigate(`/dashboard?role=${role}`);
    } catch (error: any) {
      console.error('Google Sign-In failed', error);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Study Scheduler</h1>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select your role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'host' | 'member')}
            className="w-full border rounded-md p-2"
          >
            <option value="">-- Choose Role --</option>
            <option value="host">Host</option>
            <option value="member">Member</option>
          </select>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="bg-red-500 hover:bg-red-600 transition text-white py-2 px-4 rounded-md w-full font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
