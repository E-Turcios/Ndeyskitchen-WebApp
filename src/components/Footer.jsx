import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

export default function Footer() {
  const date = new Date();

  return (
    <div className="footer">
      <p>
        <span>
          <FontAwesomeIcon icon={faCopyright} />
        </span>
        <i> {date.getFullYear()} Ndey's Kitchen. All rights reserved.</i>
      </p>
    </div>
  );
}
