import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faSnapchat,
  faFacebook,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <div className="contact" id="contact">
      <div className="information">
        <div className="email-support">
          <p>Contact & IT Support</p>
          <a href="mailto:ndeyskitchen@gmail.com">support@ndeyskitchen.com</a>
          <a target="_blank">
            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            <span> Gambia +220 794 4636</span>
          </a>
          <a target="_blank">
            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            <span> Mali +223 93 97 77 74</span>
          </a>
        </div>

        <div className="social-media">
          <p>Social Network</p>
          <a href="https://www.instagram.com/ndeyskitchen/" target="_blank">
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="font-awesome-icon"
            />
          </a>

          <a href="https://t.snapchat.com/yFmBavsK" target="_blank">
            <FontAwesomeIcon
              icon={faSnapchat}
              size="lg"
              className="font-awesome-icon"
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
