import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

const NotFound = () => (
  <div key="404" className="app__not-found app__route">
    <h1>404</h1>
  </div>
);

NotFound.shouldComponentUpdate = shouldComponentUpdate;

export default NotFound;
