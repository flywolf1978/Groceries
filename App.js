/* @flow weak */

import React, { Component } from "react";
import Main from './components/Main';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import itemApp from "./reducers";
import { AppRegistry, StatusBar } from "react-native";

// Create store with logger.
// Use Cmd + D to open developer menu to start debugger
const store = createStore(itemApp, applyMiddleware(logger));

class App extends Component {
  componentDidMount() {
    // Set status bar text to white
    StatusBar.setHidden(false);
    StatusBar.setBarStyle("light-content");
  }

  render() {
    return (
  <Provider store={store}>
  <Main/>
  </Provider>
);
}
}


export default App;

AppRegistry.registerComponent("App", () => App);
