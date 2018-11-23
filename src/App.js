import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './components/MapDisplay';

class App extends Component {
  state = {
    lat: 29.7844913,
    lon: -95.7880231,
    zoom: 13,
    all: locations
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>Chicagoland Trio Programs</h1>
        </div>

        <MapDisplay
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.all}/>
      </div>
    );
  }

}

export default App;
