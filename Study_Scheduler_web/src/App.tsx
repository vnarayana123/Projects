// src/App.tsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import CalendarPage from './components/CalendarPage';
import { AnimatePresence, motion } from 'framer-motion';

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition} transition={{ duration: 0.4 }}>
              <AuthForm />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div {...pageTransition} transition={{ duration: 0.4 }}>
              <CalendarPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
