import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './Contexts/UserContext';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Welcome from './Components/Welcome';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/ia04/welcome" element={<Welcome />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/ia04/' element={<Home />} />
          </Route>
          <Route path="/ia04/register" element={<Register />} />
          <Route path="/ia04/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/ia04/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
