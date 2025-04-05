import React from 'react';
import { format } from 'date-fns';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

interface Session {
  id: string;
  sessionName: string;
  start: string;
  end: string;
  createdBy: string;
  jitsiLink?: string;
}

interface Props {
  role: 'host' | 'member';
  sessions: Session[];
}

const CalendarView: React.FC<Props> = ({ role, sessions }) => {
  const handleLaunchSession = async (sessionId: string) => {
    const jitsiLink = `https://meet.jit.si/study-${sessionId}`;
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, { jitsiLink });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white rounded-xl shadow p-4 flex justify-between items-center animate-fadeIn"
        >
          <div>
            <h3 className="text-xl font-semibold">{session.sessionName}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(session.start), 'PPPpp')} -{' '}
              {format(new Date(session.end), 'PPPpp')}
            </p>
            <p className="text-sm text-gray-600 mt-1">Host: {session.createdBy}</p>
          </div>

          {role === 'host' ? (
            session.jitsiLink ? (
              <a
                href={session.jitsiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                Join Live Session
              </a>
            ) : (
              <button
                onClick={() => handleLaunchSession(session.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
              >
                Launch
              </button>
            )
          ) : session.jitsiLink ? (
            <a
              href={session.jitsiLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Join
            </a>
          ) : (
            <span className="text-yellow-500 font-semibold">Wait for Host</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarView;
