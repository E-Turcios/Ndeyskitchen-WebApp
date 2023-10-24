import { React, useState, useSyncExternalStore } from 'react';
import categoryStore from '../stores/categoryStore';

export default function Category() {
  const [isAllButton, setIsAllButton] = useState(true);
  const [isSweetButton, setIsSweetButton] = useState(false);
  const [isSavoryButton, setIsSavoryButton] = useState(false);

  const style = {
    color: '#371821',
    backgroundColor: ' #FFFFFF',
    border: ' 1px solid #371821',
  };

  const category = useSyncExternalStore(
    categoryStore.subscribe,
    categoryStore.getCategory
  );

  function handleSweetButtonClick(event) {
    if (category === '' || category === 'Savory') {
      categoryStore.setId(event.target.id);
      setIsSweetButton(!isSweetButton);
      setIsSavoryButton(false);
      setIsAllButton(false);
    } else {
      categoryStore.setId('');
      setIsSweetButton(!isSweetButton);
    }
  }

  function handleSavoryButtonClick(event) {
    if (category === '' || category === 'Sweet') {
      categoryStore.setId(event.target.id);
      setIsSavoryButton(!isSavoryButton);
      setIsSweetButton(false);
      setIsAllButton(false);
    } else categoryStore.setId('');
  }

  function handleAllButtonClick(event) {
    if (category === 'Savory' || category === 'Sweet') {
      categoryStore.setId('');
      setIsAllButton(!isAllButton);
      setIsSweetButton(false);
      setIsSavoryButton(false);
    } else categoryStore.setId('');
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
