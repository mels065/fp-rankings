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

import { AuthProvider } from '../../context/auth';

import ProtectedRoute from '../routes/ProtectedRoute';
import PublicRoute from '../routes/PublicRoute';

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
            <PublicRoute path="/login">
              <LoginRegisterPage/>
            </PublicRoute>
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
