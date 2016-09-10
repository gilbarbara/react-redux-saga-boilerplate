import React from 'react';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  };

  render() {
    return this.props.children;
  }
}

export default App;
