import React from 'react';

import readme from '../../../README.md';

const Private = () => (
  <div key="Private" className="app__private app__route">
    <div className="app__container" dangerouslySetInnerHTML={{ __html: readme }} />
  </div>
);

export default Private;
