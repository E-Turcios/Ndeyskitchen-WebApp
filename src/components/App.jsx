import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import useAuthContext from '../hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
