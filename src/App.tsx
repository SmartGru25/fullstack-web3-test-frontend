import React, { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from './components';
import { Feed, LogIn, Profile, SignUp } from './pages';
import { IUser } from './interfaces';

export default function App() {
  const [currentUser, setCurrentUser] = useState<IUser|null>(null);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
            <LogIn onLogIn={setCurrentUser} />
          </Route>
          <Route exact path="/profile">
            {currentUser ?
              (
                <Fragment>
                  <Navbar currentUser={currentUser} onLogOut={() => setCurrentUser(null)} />
                  <Profile currentUser={currentUser} onProfileChange={setCurrentUser} />
                </Fragment>
              ) :
              <Redirect to="/login" />
            }
          </Route>
          <Route exact path="/signup">
            <SignUp onSignUp={setCurrentUser} />
          </Route>
          <Route exact path="/">
            <Navbar currentUser={currentUser} onLogOut={() => setCurrentUser(null)}  />
            <Feed />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
