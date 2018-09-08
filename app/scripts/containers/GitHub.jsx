import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import treeChanges from 'tree-changes';

import { getRepos, showAlert, searchRepos } from 'actions';
import { STATUS } from 'constants/index';

import Loader from 'components/Loader';

export class GitHub extends React.Component {
  state = {
    query: '',
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    github: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { query } = this.state;
    const { dispatch } = this.props;

    if (query) {
      dispatch(getRepos(query));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    if (changedTo('github.repos.status', STATUS.ERROR)) {
      dispatch(showAlert(nextProps.github.repos.message, { type: 'error' }));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { query } = e.target.elements;
    const { dispatch, github } = this.props;

    this.setState({
      query: query.value,
    });

    if (github.repos.status !== STATUS.RUNNING) {
      dispatch(searchRepos(query.value));
    }
  }

  render() {
    const { query } = this.state;
    const { github } = this.props;
    let output;

    if (github.repos.status === STATUS.READY) {
      if (github.repos.data[query] && github.repos.data[query].length) {
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
        output = <h3>Nothing found</h3>;
      }
    }
    else if (github.repos.status === STATUS.RUNNING) {
      output = <Loader />;
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
                'is-valid': query,
              })}
              name="query"
              placeholder="Repository"
            />
          </div>
        </form>
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
