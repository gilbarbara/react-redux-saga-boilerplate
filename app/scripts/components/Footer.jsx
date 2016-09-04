import React from 'react';
import { autobind } from 'core-decorators';
import { shouldComponentUpdate } from 'utils/helpers';

import { goTo } from 'actions';

export default class Footer extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    const date = new Date();
    return (
      <footer className="app__footer">
        <div className="app__container">
          <div>
            <i className="i-creative-commons" />
            <span>{`${date.getFullYear()} RRS-B`}</span>
          </div>
        </div>
      </footer>
    );
  }
}
