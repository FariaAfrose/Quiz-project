import React from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import Layout from './Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import PrivateRoute from './pages/PrivateRoute';
import PublicRoute from './pages/PublicRoute';

function App() {
return (
  <Router>
    <AuthProvider>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/*" element={<PublicRoute />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/*" element={<PrivateRoute />}>
            <Route path="quiz/:videoID" element={<Quiz />} />
            <Route path="result/:videoID" element={<Result />} />
          </Route>

        </Routes>
      </Layout>
    </AuthProvider>
  </Router>
);
}

export default App;
