import React from 'react';
import config from 'config';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div key="404" className="app__not-found app__route">
    <h1>404</h1>
    <h2><Link to="/">{config.name}</Link></h2>
  </div>
);

export default NotFound;
