import { React, useState, useSyncExternalStore } from 'react';
import categoryStore from '../stores/categoryStore';
import filterStore from '../stores/filterStore';

export default function Category() {
  const [isAllButton, setIsAllButton] = useState(true);
  const [isSweetButton, setIsSweetButton] = useState(false);
  const [isSavoryButton, setIsSavoryButton] = useState(false);

  useSyncExternalStore(categoryStore.subscribe, categoryStore.getCategory);

  useSyncExternalStore(filterStore.subscribe, filterStore.getFilter);

  function handleCategoryButtonClick(category) {
    categoryStore.setId(category);
    filterStore.setId('All');

    setIsSweetButton(category === 'Sweet');
    setIsSavoryButton(category === 'Savory');
    setIsAllButton(category === 'All');
  }

  function handleSweetButtonClick() {
    handleCategoryButtonClick('Sweet');
  }

  function handleSavoryButtonClick() {
    handleCategoryButtonClick('Savory');
  }

  function handleAllButtonClick() {
    handleCategoryButtonClick('All');
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
