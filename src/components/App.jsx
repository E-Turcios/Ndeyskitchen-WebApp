import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import RedirectToForgotPassword from '../pages/RedirectToForgotPassword';
import useAuthContext from '../hooks/useAuthContext';

export default function App() {
  const { user } = useAuthContext();

  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          {user ? (
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:userToken"
                element={<ResetPassword />}
              />
              <Route
                path="/redirect-to-forgot-password"
                element={<RedirectToForgotPassword />}
              />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}
