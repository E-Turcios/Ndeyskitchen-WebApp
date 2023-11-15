import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import useAuthContext from '../hooks/useAuthContext';
import useCartSizeContext from '../hooks/useCartSizeContext';
import useUserUpdateInfoTokenVerifier from '../hooks/useUserUpdateInfoTokenVerifier';
import '../style/style.css';
import '../style/login.css';
import '../style/signup.css';
import '../style/forgot-password.css';
import '../style/reset-password.css';
import '../style/home.css';
import '../style/navbar.css';
import '../style/filter.css';
import '../style/item-card.css';
import '../style/item-view.css';
import '../style/cart.css';
import '../style/checkout.css';
import '../style/profile.css';

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
              {token && (
                <Route
                  path="/update-address-and-number"
                  element={<AddressAndNumberUpdatePage />}
                />
              )}

              {cartSize && <Route path="/checkout" element={<Checkout />} />}
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
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}
