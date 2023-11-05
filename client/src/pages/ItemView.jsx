import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Headroom from 'react-headroom';
import Loader from '../components/Loader';
import Image from '../components/Image';
import Quantity from '../components/Quantity';
import Size from '../components/Size';
import DateAndTime from '../components/DateAndTime';
import useFetchedItems from '../hooks/useFetchedItems';

export default function ItemView() {
  const { id } = useParams();
  const { items, isLoading } = useFetchedItems();

  let itemSize;
  let itemPrice;

  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1050px)' });

  const item = items.find(item => item._id === id);

  function handleSizeSelect(size) {
    itemSize = size;
  }

  function handleSizeSelectPrice(price) {
    itemPrice = price;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(itemSize);
    console.log(itemPrice);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="view-container">
      <Headroom>
        <div className="item-view-navbar">
          <div className="back-button">
            <a href="/" className="back-btn-container">
              <span className="material-symbols-outlined">arrow_back</span>
              <>Back</>
            </a>
          </div>

          <div className="shopping-bag-container">
            <a>
              <span className="items-number">1</span>
              <span className="material-symbols-outlined">shopping_bag</span>
            </a>
          </div>
        </div>
      </Headroom>

      <div className="item-view-container">
        <form className="item-view-card" onSubmit={handleSubmit}>
          <div className="item-view-image-container">
            {isBigScreen && (
              <div className="header-price-container">
                <p className="item-view-card-header">{item.name}</p>
                <p className="item-price">D {item.price}</p>
              </div>
            )}

            <Image
              alt={item.alt}
              className="item-view-image"
              src={item.image}
            />

            {isSmallScreen && (
              <div className="header-price-container">
                <p className="item-view-card-header">{item.name}</p>
                <p className="item-price">D {item.price}</p>
              </div>
            )}
          </div>

          <div className="item-view-information-container">
            <div className="item-view-card-body">
              <span className="divider"></span>

              <p className="tag">Components</p>

              <span className="content"> {item.components} </span>

              <span className="divider"></span>

              <Quantity />

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
                name=""
                id=""
                cols="40"
                rows="3"
                className="additional-instructions"
              ></textarea>

              <button className="add-item-btn" type="submit">
                Add to cart
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
