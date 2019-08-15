import React, { Component } from 'react';
import { Router } from 'react-router-dom'
import Routes from './Routes'
import history from './history'
import Root from './Root'

class App extends Component {
  render() {
    return (
      <Root>
        <Router history={history} >
          <Routes />
        </Router>
      </Root>
    );
  }
}

export default App;
