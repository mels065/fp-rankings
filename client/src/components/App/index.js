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

import './style.css';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/users/:userId">
              <UserPage />
            </Route>
            <Route path="/rankings">
              <RankingsPage />
            </Route>
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
