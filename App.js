import React, { Component } from 'react';
import Container from './components/Container.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>DINER</h1>
        <div className=".main-wrapper">
          <Container />
        </div>
      </div>
    );
  }
}
export default App;
