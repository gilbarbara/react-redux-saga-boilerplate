import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import { appColor } from 'modules/theme';

import { getRepos, showAlert, switchMenu } from 'actions/index';
import { STATUS } from 'constants/index';

import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
const { grays } = theme;

const Grid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(4)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(5)} auto 0;
  padding: 0;
  ${/* istanbul ignore next */p => responsive({
    ix: `
      grid-gap: ${spacer(6)(p)};
      width: 90%;
    `,
    sm: `
      grid-gap: ${spacer(4)(p)};
      grid-template-columns: repeat(2, 1fr);
      width: 100%;
    `,
    md: `
      grid-gap: ${spacer(5)(p)};
    `,
    lg: `
      grid-template-columns: repeat(3, 1fr);
    `,
    xl: `
      grid-gap: ${spacer(6)(p)};
      grid-template-columns: repeat(4, 1fr);
      margin-top: ${spacer(6)(p)};
    `,
  })};

  > li {
    display: flex;
  }
`;

const Item = styled(Box)`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  padding: ${spacer(4)};
  text-align: center;
  width: 100%;
  ${/* istanbul ignore next */p => responsive({
    md: `
      padding: ${spacer(2)(p)};
    `,
    lg: `
      padding: ${spacer(5)(p)};
    `,
  })};

  > a {
    margin-bottom: ${spacer(2)};
  }

  img {
    height: 8rem;
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};
  
  a {
    display: block;
  }

  small {
    color: ${grays.gray60};
  }
`;

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
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    if (changedTo('github.repos.status', STATUS.ERROR)) {
      dispatch(showAlert(nextProps.github.repos.message, { variant: 'danger' }));
    }
  }

  handleClick = (e) => {
    const { query } = e.currentTarget.dataset;
    const { dispatch } = this.props;

    this.setState({
      query,
    });

    dispatch(switchMenu(query));
  };

  render() {
    const { query } = this.state;
    const { github } = this.props;
    const data = github.repos.data[query] || [];
    let output;

    if (github.repos.status === STATUS.READY) {
      if (data.length) {
        output = (
          <Grid data-type={query}>
            {github.repos.data[query]
              .map(d => (
                <li key={d.id}>
                  <Item>
                    <Link href={d.html_url}>
                      <Image src={d.owner.avatar_url} alt={d.owner.login} />
                    </Link>
                    <ItemHeader>
                      <Link href={d.html_url}>
                        <Heading as="h5" lineHeight={1}>{d.name}</Heading>
                        <small>{d.owner.login}</small>
                      </Link>
                    </ItemHeader>
                    <Paragraph>{d.description}</Paragraph>
                  </Item>
                </li>
              ))}
          </Grid>
        );
      }
      else {
        output = <h3>Nothing found</h3>;
      }
    }
    else {
      output = <Loader />;
    }

    return (
      <div key="GitHub">
        <Flex justifyContent="center">
          <ButtonGroup role="group" aria-label="GitHub Selector">
            <Button
              animate={query === 'react' && github.repos.status === 'running'}
              outline={query !== 'react'}
              size="lg"
              data-query="react"
              onClick={this.handleClick}
            >
              React
            </Button>
            <Button
              animate={query === 'redux' && github.repos.status === 'running'}
              outline={query !== 'redux'}
              size="lg"
              data-query="redux"
              onClick={this.handleClick}
            >
              Redux
            </Button>
          </ButtonGroup>
        </Flex>
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
