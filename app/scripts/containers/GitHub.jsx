import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { getRepos, showAlert } from 'actions';

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

  componentWillReceiveProps(nextProps) {
    const { dispatch, github: { repos } } = this.props;
    const { github: { repos: nextRepos } } = nextProps;

    if (repos.status === 'running' && nextRepos.status === 'error') {
      dispatch(showAlert(nextRepos.message, { type: 'error' }));
    }
  }

  handleClick = (e) => {
    const { query } = e.currentTarget.dataset;
    const { dispatch, github } = this.props;

    this.setState({
      query,
    });

    if (!github.repos.data[query] || !github.repos.data[query].length) {
      dispatch(getRepos(query));
    }
  };

  render() {
    const { query } = this.state;
    const { github } = this.props;
    let output;

    if (github.repos.data[query] && github.repos.status === 'loaded') {
      output = (
        <ul className={`app__github__grid app__github__grid--${query}`}>
          {github.repos.data[query]
            .map(d => (
              <li key={d.id}>
                <div className="app__github__item">
                  <img src={d.owner.avatar_url} alt={d.owner.login} />
                  <div>
                    <h5>
                      <a href={d.html_url} target="_blank">{d.name}</a>
                      <small>{d.owner.login}</small>
                    </h5>
                    <div>{d.description}</div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      );
    }
    else {
      output = <Loader />;
    }

    return (
      <div key="GitHub" className="app__github">
        <div className="app__github__selector">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={cx('btn', {
                'btn-primary': query === 'react',
                'btn-outline-primary': query !== 'react',
                'btn-loading': query === 'react' && github.repos.status === 'running',
              })}
              data-query="react"
              onClick={this.handleClick}
            >
              React
            </button>
            <button
              type="button"
              className={cx('btn', {
                'btn-primary': query === 'redux',
                'btn-outline-primary': query !== 'redux',
                'btn-loading': query === 'redux' && github.repos.status === 'running',
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
