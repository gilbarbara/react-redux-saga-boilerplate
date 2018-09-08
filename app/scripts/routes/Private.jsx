import React from 'react';

import Github from 'containers/GitHub';

export default class Private extends React.PureComponent {
  render() {
    return (
      <div key="Private" className="app__private app__route">
        <div className="app__container">
          <div className="app__private__content">
            <div className="app__private__intro">
              <h5>Here's some GitHub data</h5>
              <small className="text-muted"><i>*Just to have some requests in the sagas...</i></small>
            </div>
            <Github />
          </div>
        </div>
      </div>
    );
  }
}
