import { React, useState, useSyncExternalStore } from 'react';
import categoryStore from '../stores/categoryStore';
import filterStore from '../stores/filterStore';

export default function Category() {
  const [isAllButton, setIsAllButton] = useState(true);
  const [isSweetButton, setIsSweetButton] = useState(false);
  const [isSavoryButton, setIsSavoryButton] = useState(false);

  const category = useSyncExternalStore(
    categoryStore.subscribe,
    categoryStore.getCategory
  );

  useSyncExternalStore(filterStore.subscribe, filterStore.getFilter);

  function handleCategoryButtonClick(event, newCategory) {
    if (category === newCategory) {
      categoryStore.setId('All');
    } else {
      categoryStore.setId(newCategory);
      filterStore.setId('All');
    }
    setIsSweetButton(newCategory === 'Sweet');
    setIsSavoryButton(newCategory === 'Savory');
    setIsAllButton(newCategory === 'All');
  }

  function handleSweetButtonClick(event) {
    handleCategoryButtonClick(event, 'Sweet');
  }

  function handleSavoryButtonClick(event) {
    handleCategoryButtonClick(event, 'Savory');
  }

  function handleAllButtonClick() {
    handleCategoryButtonClick(null, 'All');
  }

  return (
    <div className="category-container" id="menu">
      <button
        className={
          isAllButton
            ? 'category-sweet-salty-btn-on-click'
            : 'category-sweet-salty-btn'
        }
        onClick={handleAllButtonClick}
      >
        All
      </button>
      <button
        id="Sweet"
        className={
          isSweetButton
            ? 'category-sweet-salty-btn-on-click'
            : 'category-sweet-salty-btn'
        }
        onClick={handleSweetButtonClick}
      >
        Sweet
      </button>
      <button
        id="Savory"
        className={
          isSavoryButton
            ? 'category-sweet-salty-btn-on-click'
            : 'category-sweet-salty-btn'
        }
        onClick={handleSavoryButtonClick}
      >
        Savory
      </button>
    </div>
  );
}
