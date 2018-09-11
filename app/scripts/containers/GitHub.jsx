import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import treeChanges from 'tree-changes';

import { showAlert, getUsers, getUser } from 'actions';
import { STATUS } from 'constants/index';

import Loader from 'components/Loader';

export class GitHub extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    if (changedTo('github.user.status', STATUS.ERROR)) {
      dispatch(showAlert(nextProps.github.user.message, { type: 'error' }));
    }
  }

  handleClick = (e) => {
    const { query } = e.currentTarget.dataset;
    const { dispatch } = this.props;

    dispatch(getUser(query));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { query } = e.target.elements;
    const { dispatch, github } = this.props;

    if (github.user.status !== STATUS.RUNNING) {
      dispatch(getUsers(query.value));
    }
  }

  render() {
    const { github } = this.props;
    let repolist;
    let userlist;

    if (github.users.status === STATUS.READY) {
      if (github.users.data.length) {
        userlist = (
          <div className={`app__github__userlist app__github__userlist--${github.user.data.login}`}>
            <h3>GitHub users</h3>
            {github.users.data
              .map(u => (
                <button
                  key={u.id}
                  type="button"
                  className={cx('btn btn-sm', {
                    'btn-outline-secondary': u.login !== github.user.data.login,
                    'btn-primary': u.login === github.user.data.login,
                  })}
                  data-query={u.login}
                  onClick={this.handleClick}
                >
                  {u.login}
                </button>
              ))}
          </div>
        );
      }
      else {
        userlist = (<h3>User not found</h3>);
      }
    }
    else if (github.users.status === STATUS.RUNNING) {
      userlist = <Loader />;
    }

    if (github.user.data.login && github.user.status === STATUS.READY) {
      if (github.user.repos.length) {
        repolist = (
          <div>
            <h3>Repositories for "{github.user.data.login}"</h3>
            <ul className={`app__github__grid app__github__grid--${github.user.data.login}`}>
              {github.user.repos
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
          </div>
        );
      }
      else {
        repolist = (<h3>No repositories found for "{github.user.data.login}"</h3>);
      }
    }
    else if (github.user.status === STATUS.RUNNING) {
      repolist = <Loader />;
    }

    return (
      <div key="GitHub" className="app__github">
        <form
          className="app__github__search"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <input
              type="search"
              className={cx('form-control', {
                'is-valid': github.users.data.length,
              })}
              name="query"
              placeholder="GitHub username"
            />
          </div>
        </form>
        {userlist}
        {repolist}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { github: state.github };
}

export default connect(mapStateToProps)(GitHub);
