import React from 'react';

const Footer = () => (
  <footer className="app__footer">
    <div className="app__container">
      <div className="app__footer__github">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=gilbarbara&repo=react-redux-saga-boilerplate&type=star&count=true"
          frameBorder="0"
          scrolling="0" width="110px" height="20px"
        />
        <iframe
          src="https://ghbtns.com/github-btn.html?user=gilbarbara&type=follow&count=true"
          frameBorder="0"
          scrolling="0" width="130px" height="20px"
        />
      </div>
    </div>
  </footer>
);

export default Footer;
