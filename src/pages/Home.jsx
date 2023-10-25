import { React, useState, useEffect, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoyaltyProgramBanner from '../components/LoyaltyProgramBanner';
import Category from '../components/Category';
import Filter from '../components/Filter';
import ItemCard from '../components/ItemCard';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import useAuthContext from '../hooks/useAuthContext';
import categoryStore from '../stores/categoryStore';
import filterStore from '../stores/filterStore';

export default function Home() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const category = useSyncExternalStore(
    categoryStore.subscribe,
    categoryStore.getCategory
  );

  const filter = useSyncExternalStore(
    filterStore.subscribe,
    filterStore.getFilter
  );

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      const response = await fetch('api/items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) console.log(json.message);

      setItems(json);
      setIsLoading(false);
    }
    getItems();
  }, []);

  function logOut() {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="home-page-container">
      <Navbar />
      <LoyaltyProgramBanner />
      <Category />
      <div className="filter-menu-container">
        <Filter />

        <div className="menu-container">
          <div className="menu-content">
            {category === 'All' &&
              items
                .filter(item => filter === 'All' || item.filter === filter)
                .map(item => (
                  <ItemCard
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    components={item.components}
                    src={item.image}
                  />
                ))}

            {category === 'Sweet' &&
              items
                .filter(
                  item =>
                    item.category === 'Sweet' &&
                    (filter === 'All' || item.filter === filter)
                )
                .map(item => (
                  <ItemCard
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    components={item.components}
                    src={item.image}
                  />
                ))}

            {category === 'Savory' &&
              items
                .filter(
                  item =>
                    item.category === 'Savory' &&
                    (filter === 'All' || item.filter === filter)
                )
                .map(item => (
                  <ItemCard
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    components={item.components}
                    src={item.image}
                  />
                ))}
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}
