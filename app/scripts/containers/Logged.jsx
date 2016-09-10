import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

import readme from '../../../README.md';

const Logged = () => (
  <div key="Logged" className="app__logged app__route">
    <div className="app__container" dangerouslySetInnerHTML={{ __html: readme }} />
  </div>
);

Logged.shouldComponentUpdate = shouldComponentUpdate;

export default Logged;
