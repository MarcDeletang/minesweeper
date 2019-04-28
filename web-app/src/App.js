import React from "react";
import { createStore } from "redux";
import { StoreContext } from "redux-react-hook";
import "./App.css";
import { reducer } from "./redux/gameReducer";
import { Game } from "./components/game";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

function App() {
  return (
    <StoreContext.Provider value={store}>
      <div className="app">
        <Game />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    </StoreContext.Provider>
  );
}

export default App;
