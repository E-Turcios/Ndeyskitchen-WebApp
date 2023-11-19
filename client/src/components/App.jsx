import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import AddressAndNumberUpdatePage from '../pages/AddressAndNumberUpdatePage';
import Home from '../pages/Home';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import RedirectToForgotPassword from '../pages/RedirectToForgotPassword';
import VerifyEmail from '../pages/VerifyEmail';
import ItemView from '../pages/ItemView';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import useAuthContext from '../hooks/useAuthContext';
import useCartSizeContext from '../hooks/useCartSizeContext';
import useUserUpdateInfoTokenVerifier from '../hooks/useUserUpdateInfoTokenVerifier';
import '../style/style.css';

export default function App() {
  const { user } = useAuthContext();
  const { cartSize } = useCartSizeContext();
  const { token } = useUserUpdateInfoTokenVerifier();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          {user ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/item/:id" element={<ItemView />} />
              <Route path="/cart" element={<Cart />} />
              {token ? (
                <>
                  <Route
                    path="/update-address-and-number"
                    element={<AddressAndNumberUpdatePage />}
                  />
                  <Route
                    path="*"
                    element={
                      <Navigate
                        to="/update-address-and-number"
                        replace={true}
                      />
                    }
                  />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/item/:id" element={<ItemView />} />
                  <Route path="/cart" element={<Cart />} />
                  {cartSize && (
                    <Route path="/checkout" element={<Checkout />} />
                  )}
                  <Route path="/orders" element={<Orders />} />
                </>
              )}

              {cartSize && <Route path="/checkout" element={<Checkout />} />}
              <Route path="/orders" element={<Orders />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/verify-email/:userToken"
                element={<VerifyEmail />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:userToken"
                element={<ResetPassword />}
              />
              <Route
                path="/redirect-to-forgot-password"
                element={<RedirectToForgotPassword />}
              />

              <Route path="/item/:id" element={<ItemView />} />

              <Route path="/cart" element={<Cart />} />
              {cartSize && <Route path="/checkout" element={<Checkout />} />}
              <Route path="/orders" element={<Orders />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}
