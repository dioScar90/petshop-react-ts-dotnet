import React from 'react';
import logo from './logo.svg';
import { TimeNow } from './TimeNow';
import { StepLabel } from './StepLabel';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        <div>
          <h1>Hello, world!</h1>
          <StepLabel />
          <TimeNow />
        </div>
      </header>
    </div>
  );
}

export default App;
