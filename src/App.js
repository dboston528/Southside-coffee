import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './components/MapDisplay';

class App extends Component {
  state = {
    lat: 41.7687627,
    lon: -87.6546593,
    zoom: -100,
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
          zoom={this.state.all}
          locations={this.state.all}/>
      </div>
    );
  }

}

export default App;
