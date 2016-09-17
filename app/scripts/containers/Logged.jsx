import React from 'react';

import readme from '../../../README.md';

const Logged = () => (
  <div key="Logged" className="app__logged app__route">
    <div className="app__container" dangerouslySetInnerHTML={{ __html: readme }} />
  </div>
);

export default Logged;
