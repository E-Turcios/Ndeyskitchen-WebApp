import React from 'react';

export default function LoyaltyProgramBanner() {
  return (
    <div className="loyalty-program-banner">
      <span className="loyalty-program-banner-icons">
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
      </span>

      <a href="/signup">
        {' '}
        JOIN OUR LOYALTY PROGRAM BY SIGNING UP AND GET FREE ITEMS
      </a>

      <span className="loyalty-program-banner-icons">
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
        <span class="material-symbols-outlined">star</span>
      </span>
    </div>
  );
}
