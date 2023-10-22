import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoyaltyProgramBanner from '../components/LoyaltyProgramBanner';
import Category from '../components/Category';
import Filter from '../components/Filter';
import ItemCard from '../components/ItemCard';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useAuthContext from '../hooks/useAuthContext';

export default function Home() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const src =
    'https://img.freepik.com/free-photo/delicious-glazed-doughnut_23-2150674014.jpg?t=st=1697665555~exp=1697669155~hmac=8bbad599c8852eb3079c96c2eaf79b5f747f07de8a8e18f1d28a4ff7576a03d0&w=826';

  const price = '$ 20.99';
  const name = 'CHOCOLATE CAKE';
  const components = 'Chocolate filling, vanilla icing';

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className="home-page-container">
      <Navbar />
      <LoyaltyProgramBanner />
      <Category />
      <div className="filter-menu-container">
        <Filter />

        <div className="menu-container">
          <div className="menu-content">
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
            <ItemCard
              src={src}
              price={price}
              name={name}
              components={components}
            />
          </div>
        </div>
      </div>
      {/* <Contact />
      <Footer /> */}
    </div>
  );
}
