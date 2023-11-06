import React from 'react';
import Image from '../components/Image';
import { useMediaQuery } from 'react-responsive';

export default function ItemViewImageAndName({ item }) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1050px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1050px)' });

  return (
    <div className="item-view-image-container">
      {isBigScreen && (
        <div className="header-price-container">
          <p className="item-view-card-header">{item.name}</p>
          <p className="item-price">D {item.price}</p>
        </div>
      )}

      <Image alt={item.alt} className="item-view-image" src={item.image} />

      {isSmallScreen && (
        <div className="header-price-container">
          <p className="item-view-card-header">{item.name}</p>
          <p className="item-price">D {item.price}</p>
        </div>
      )}
    </div>
  );
}
