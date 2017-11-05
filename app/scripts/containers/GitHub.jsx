import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { getRepos } from 'actions';

import Loader from 'components/Loader';

export class GitHub extends React.Component {
  state = {
    query: 'react',
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;

    dispatch(getRepos(query));
  }

  handleClick = (e) => {
    const { query } = e.currentTarget.dataset;
    const { dispatch } = this.props;

    this.setState({
      query,
    });

    dispatch(getRepos(query));
  };

  render() {
    const { query } = this.state;
    const { github } = this.props;
    let output;

    if (github.repos.data.length) {
      output = (
        <ul className="app__github__grid">
          {github.repos.data.map(d => (
            <li key={d.id}>
              <div className="app__github__item">
                <img src={d.owner.avatar_url} alt={d.owner.login} />
                <div>
                  <h5>
                    <a href={d.html_url} target="_blank">{d.owner.login}/{d.name}</a>
                  </h5>
                  <div>{d.description}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    } else {
      output = <Loader />;
    }

    return (
      <div key="GitHub" className="app__github">
        <div className="app__github__selector">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={cx('btn', {
                'btn-dark': query !== 'react',
                'btn-primary': query === 'react',
                'btn-loading': query === 'react' && github.repos.isRunning,
              })}
              data-query="react"
              onClick={this.handleClick}
            >
              React
            </button>
            <button
              type="button"
              className={cx('btn', {
                'btn-dark': query !== 'redux',
                'btn-primary': query === 'redux',
                'btn-loading': query === 'redux' && github.repos.isRunning,
              })}
              data-query="redux"
              onClick={this.handleClick}
            >
              Redux
            </button>
          </div>
        </div>
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { github: state.github };
}

export default connect(mapStateToProps)(GitHub);
