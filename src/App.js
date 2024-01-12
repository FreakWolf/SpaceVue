import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Charts from './components/Chart';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <Dashboard />
          <Charts />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;