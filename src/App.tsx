import { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Navbar } from './components';
import { Secrets, LogIn } from './pages';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={
          <Fragment>
            <Navbar />
            <Secrets />
          </Fragment>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
