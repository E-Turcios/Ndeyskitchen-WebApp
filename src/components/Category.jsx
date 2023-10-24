import { React, useState, useSyncExternalStore } from 'react';
import categoryStore from '../stores/categoryStore';

export default function Category() {
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
    categoryStore.setId(event.target.id);
    setIsSweetButton(!isSweetButton);
    setIsSavoryButton(false);
  }

  function handleSavoryButtonClick(event) {
    categoryStore.setId(event.target.id);
    setIsSavoryButton(!isSavoryButton);
    setIsSweetButton(false);
  }

  console.log(category);

  return (
    <div className="category-container" id="menu">
      <button
        id="sweet"
        className="category-sweet-salty-btn category-sweet-btn"
        onClick={handleSweetButtonClick}
        style={isSweetButton ? style : null}
      >
        Sweet
      </button>
      <button
        id="savory"
        className="category-sweet-salty-btn category-sweet-btn"
        onClick={handleSavoryButtonClick}
        style={isSavoryButton ? style : null}
      >
        Savory
      </button>
    </div>
  );
}
