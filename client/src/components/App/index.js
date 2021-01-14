import React from 'react';

import LoginRegisterPage from "../pages/Login-Register";

import { AuthProvider } from '../../context/auth';

import './style.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <LoginRegisterPage />
      </AuthProvider>
    </div>
  );
}

export default App;
