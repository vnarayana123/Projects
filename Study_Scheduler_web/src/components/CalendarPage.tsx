// src/components/CalendarPage.tsx
import React from 'react';
import Dashboard from './Dashboard';
import { useLocation } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roleParam = params.get('role');
  const role = roleParam === 'host' ? 'host' : 'member';

  return <Dashboard role={role} />;
};

export default CalendarPage;
