import { React, useSyncExternalStore } from 'react';
import Navbar from '../components/Home/Navbar';
import LargeEventCateringBanner from '../components/Home/LargeEventCateringBanner';
import Category from '../components/Home/Category';
import Filter from '../components/Home/Filter';
import ItemCard from '../components/Home/ItemCard';
import Footer from '../components/Home/Footer';
import Loader from '../components/Loader';
import categoryStore from '../stores/categoryStore';
import filterStore from '../stores/filterStore';
import searchResultStore from '../stores/searchResultStore';
import useFetchedItems from '../hooks/useFetchedItems';

export default function Home() {
  const category = useSyncExternalStore(
    categoryStore.subscribe,
    categoryStore.getCategory
  );

  const filter = useSyncExternalStore(
    filterStore.subscribe,
    filterStore.getFilter
  );

  const searchResult = useSyncExternalStore(
    searchResultStore.subscribe,
    searchResultStore.getResult
  );

  if (searchResult) filterStore.setId('All');

  const { items, isLoading } = useFetchedItems();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="home-page-container">
      <Navbar />
      <LargeEventCateringBanner />
      <Category />
      <div className="filter-menu-container">
        <Filter />

        <div className="menu-container">
          <div className="menu-content">
            {searchResult !== '' &&
              items
                .filter(item => item.name === searchResult)
                .map(item => (
                  <ItemCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    components={item.components}
                    src={item.image}
                  />
                ))}

            {category === 'All' &&
              searchResult === '' &&
              items
                .filter(item => filter === 'All' || item.filter === filter)
                .map(item => (
                  <ItemCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    components={item.components}
                    src={item.image}
                  />
                ))}

            {category === 'Sweet' &&
              searchResult === '' &&
              items
                .filter(
                  item =>
                    (filter === 'All' && item.category === category) ||
                    item.filter === filter
                )
                .map(item => (
                  <ItemCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    components={item.components}
                    src={item.image}
                  />
                ))}

            {category === 'Savory' &&
              searchResult === '' &&
              items
                .filter(
                  item =>
                    (filter === 'All' && item.category === category) ||
                    item.filter === filter
                )
                .map(item => (
                  <ItemCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    components={item.components}
                    src={item.image}
                  />
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
