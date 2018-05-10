import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Game2048 from './containers/2048'
import './App.css';

import store from './store'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Game2048 />
        </div>
      </Provider>
    );
  }
}

export default App;
