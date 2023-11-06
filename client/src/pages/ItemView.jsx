import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemViewImageAndName from '../components/ItemViewImageAndName';
import ItemViewNavbar from '../components/ItemViewNavbar';
import Loader from '../components/Loader';
import Quantity from '../components/Quantity';
import Size from '../components/Size';
import DateAndTime from '../components/DateAndTime';
import useFetchedItems from '../hooks/useFetchedItems';
import useCartSizeContext from '../hooks/useCartSizeContext';

export default function ItemView() {
  const { id } = useParams();
  const { items, isLoading } = useFetchedItems();

  const { dispatch } = useCartSizeContext();

  const [instructions, setInstructions] = useState('');
  const [validateButton, setValidateButtonText] = useState('Add to');
  const [isDisabled, setIsDisabled] = useState(false);

  let itemSize;
  let itemPrice;
  let quantity;

  const item = items.find(item => item._id === id);

  function handleSizeSelect(size) {
    itemSize = size;
  }

  function handleSizeSelectPrice(price) {
    itemPrice = price;
  }

  function getQuantity(amount) {
    quantity = amount;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const addedItem = {
      name: item.name,
      components: item.components,
      quantity: quantity,
      price: itemPrice,
      size: itemSize,
      instructions: instructions,
      image: item.image,
      alt: item.alt,
    };

    let localStorageCart = JSON.parse(localStorage.getItem('cart'));

    if (localStorageCart === null) localStorageCart = [];

    localStorageCart.push(addedItem);

    localStorage.setItem('cart', JSON.stringify(localStorageCart));

    dispatch({
      type: 'SET_CART_SIZE',
      payload: localStorageCart !== null ? localStorageCart.length : '',
    });

    setIsDisabled(true);
    setValidateButtonText('Item added to');
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="view-container">
      <ItemViewNavbar />

      <div className="item-view-container">
        <form className="item-view-card" onSubmit={handleSubmit}>
          <ItemViewImageAndName item={item} />

          <div className="item-view-information-container">
            <div className="item-view-card-body">
              <span className="divider"></span>

              <p className="tag">Components</p>

              <span className="content"> {item.components} </span>

              <span className="divider"></span>

              <Quantity getQuantity={getQuantity} />

              <span className="divider"></span>

              <Size
                item={item}
                handleSizeSelect={handleSizeSelect}
                handleSizeSelectPrice={handleSizeSelectPrice}
              />

              <span className="divider"></span>

              <DateAndTime item={item} />

              <span className="divider"></span>

              <p className="tag">Additional Instructions</p>
              <textarea
                onChange={event => {
                  setInstructions(event.target.value);
                }}
                cols="40"
                rows="3"
                className="additional-instructions"
              ></textarea>

              <button
                disabled={isDisabled}
                className="add-item-btn"
                type="submit"
              >
                {validateButton}
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
