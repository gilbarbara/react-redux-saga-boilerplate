import React from 'react';

import Github from 'containers/GitHub';

export default class Private extends React.PureComponent {
  render() {
    return (
      <div key="Private" className="app__private app__route">
        <div className="app__container">
          <div className="app__private__header">
            <h1>Oh hai!</h1>
            <p>You can get this boilerplate{' '}
              <a
                href="https://github.com/gilbarbara/react-redux-saga-boilerplate/"
                target="_blank"
              >
                here
              </a>
            </p>
          </div>
          <div className="app__private__content">
            <div className="app__private__intro">
              <h5>Here are some GitHub data</h5>
              <small className="text-muted"><i>*Just to have some api requests on the sagas...</i></small>
            </div>
            <Github />
          </div>
        </div>
      </div>
    );
  }
}
