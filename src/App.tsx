import React, { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Navbar } from './components';
import { Secrets, LogIn, Profile } from './pages';
import { IUser } from './interfaces';

export default function App() {
  const [currentUser, setCurrentUser] = useState<IUser|null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn onLogIn={setCurrentUser} />} />
        <Route path="/profile" element={
          currentUser ?
          (
            <Fragment>
              <Navbar currentUser={currentUser} onLogOut={() => setCurrentUser(null)} />
              <Profile currentUser={currentUser} onProfileChange={setCurrentUser} />
            </Fragment>
          ) :
          <Navigate to="/login" />
        } />
        <Route path="/" element={
          <Fragment>
            <Navbar currentUser={currentUser} onLogOut={() => setCurrentUser(null)}  />
            <Secrets />
          </Fragment>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
