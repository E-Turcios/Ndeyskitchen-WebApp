import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import ForgotPassword from '../pages/ForgotPassword';
import useAuthContext from '../hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />

            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />

            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />

            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
