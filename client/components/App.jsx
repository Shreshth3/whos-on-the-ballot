import React, { Component } from 'react';
import { render } from 'react-dom';
// import Container from './Container.jsx'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      // <div>
      //   <Container />
      // </div>
      <a href="/auth/google">Login</a>
    );
  }
}

export default App;
