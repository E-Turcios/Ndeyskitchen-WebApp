import { React } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Loader from '../components/Loader';
import Image from '../components/Image';
import Quantity from '../components/Quantity';
import DateAndTime from '../components/DateAndTime';
import useFetchedItems from '../hooks/useFetchedItems';

export default function ItemView() {
  const { id } = useParams();
  const { items, isLoading } = useFetchedItems();

  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1050px)' });

  const item = items.find(item => item._id === id);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="view-container">
      <a href="/" className="back-btn-container">
        <span className="material-symbols-outlined">arrow_back</span>
        <>Back</>
      </a>

      <div className="item-view-container">
        <div className="item-view-card">
          <div className="item-view-image-container">
            {isBigScreen && (
              <div className="header-price-container">
                <p className="item-view-card-header">{item.name}</p>
                <p className="item-price"> D {item.price}</p>
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
                <p className="item-price"> D {item.price}</p>
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

              <p className="tag">Size</p>
              <div className="size-container">
                <p>Small</p>

                <p>Medium</p>

                <p>Large</p>
              </div>

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

              <button className="add-item-btn">
                Add to cart
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
