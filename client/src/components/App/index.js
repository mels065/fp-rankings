import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import HomePage from '../pages/Home';
import LoginRegisterPage from '../pages/Login-Register';
import RankingsPage from '../pages/Rankings';
import UserPage from '../pages/User';

import ProtectedRoute from '../routes/ProtectedRoute';

import { AuthProvider } from '../../context/auth';

import './style.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <ProtectedRoute path="/users/:userId">
              <UserPage />
            </ProtectedRoute>
            <ProtectedRoute path="/rankings">
              <RankingsPage />
            </ProtectedRoute>
            <Route path="/login">
              <LoginRegisterPage/>
            </Route>
            <Route path="/">
              <HomePage/>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
