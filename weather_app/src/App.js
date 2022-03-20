/* import logo from './logo.svg'; */
import React from 'react';
import './App.css';
import Forecast from "./components/Forecast/Forecast";

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Weather App</h1>
      </header>
      <main>
        <Forecast />

        <h2 id="place"></h2>
        
        <div id="weatherCards"></div>

      </main>
      <footer>
          Created by Andrew Peterson
      </footer>
    </div>
  );
}

export default App;
