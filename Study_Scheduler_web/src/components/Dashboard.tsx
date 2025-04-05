import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import SessionForm from './SessionForm';
import CalendarView from './CalendarView';

interface DashboardProps {
  role: 'host' | 'member';
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [sessions, setSessions] = useState<any[]>([]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  useEffect(() => {
    const q = query(collection(db, 'sessions'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSessions(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {user?.photoURL && (
            <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full" />
          )}
          <div>
            <p className="text-xl font-semibold text-gray-800">
              Welcome, {user?.displayName || user?.email}!
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {role === 'host' && (
        <div className="mb-8">
          <SessionForm />
        </div>
      )}

      <CalendarView sessions={sessions} role={role} />
    </div>
  );
};

export default Dashboard;
