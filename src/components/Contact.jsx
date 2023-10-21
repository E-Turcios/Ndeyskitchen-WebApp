import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faSnapchat,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <div className="contact">
      <div className="information">
        <div className="email-support">
          <p>Email & IT Support</p>
          <a href="mailto:ndeyskitchen@gmail.com" style={{ color: 'white' }}>
            ndeyskitchen@gmail.com
          </a>
        </div>

        <div className="social-media">
          <p>Social Network</p>
          <a href="https://www.instagram.com/ndeyskitchen/">
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="font-awesome-icon"
              target="_blank"
            />
          </a>

          <a href="https://t.snapchat.com/yFmBavsK">
            <FontAwesomeIcon
              icon={faSnapchat}
              size="lg"
              className="font-awesome-icon"
              target="_blank"
            />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100069842234410">
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              className="font-awesome-icon"
              target="_blank"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
