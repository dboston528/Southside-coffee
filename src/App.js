import React, { Component } from 'react';
import './App.css';

import MapDisplay from './components/MapDisplay';
import CoffeeMenu from './components/CoffeeMenu';

const FS_CLIENT = "KPUCN0TGOYUCICIMKY02EWOMBDSGA3EW5UXAIMRWVKHTYMTK";
const FS_SECRET = "3RPA5ITJQMPVJA4ICX1K5VIRAVWDIAV1L5IJ5SHPA11CZGMT";
const FS_VERSION = "20180323";

class App extends Component {
  state = {
    lat: 41.7687627,
    lon: -87.6546593,
    zoom: 13,
    all: [],
    filtered: null,
    open: false,
    selectedId: null,
    activeMarker: null
  }

  realMarkers = [];

  styles = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "white",
      padding: 10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };


  componentDidMount = () => {
    //Coffee shop Cdata from FourSquare
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=5000&ll=${this.state.lat},${this.state.lon}&intent=browse&query=Coffee`;
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    });
    fetch(request)
      .then(response => response.json())
      .then(json => {
        const all = json.response.venues;
        this.setState({
          all,
          filtered: this.filterVenues(all, "")
        });
      })
      .catch(error => {
        alert("Sorry. The FourSquare data could not be retrieved");
      });
  }

  saveRealMarker = marker => {
    if (this.realMarkers.indexOf(marker) === -1 && marker !== null) 
      this.realMarkers.push(marker);
    }

    toggleDrawer = () => {
      
      this.setState({
        open: !this.state.open
      });
    }

    updateQuery = (query) => {
      
      this.setState({
        selectedIndex: null,
        filtered: this.filterVenues(this.state.all, query)
      });
    }
  
    filterVenues = (venues, query) => {
      
      return venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    }
  
    clickMarker = (id) => {
      
      const marker = this.realMarkers.filter(marker => marker.marker.id === id)[0];
      this.setState({
        selectedId: id,
        activeMarker: marker
      })
    }

  
  render() {
    return (
      <div className="App">
        <div>
        <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
            <i className="fa fa-bars">=</i>
          </button>
          <h1>Chicagoland Trio Programs</h1>
        </div>

        <MapDisplay
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.all}
          locations={this.state.all}
          venues={this.state.filtered}
          saveRealMarker={this.saveRealMarker}
          clickMarker={this.clickMarker}
          activeMarker={this.state.activeMarker} />
          <CoffeeMenu
          venues={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterVenues={this.updateQuery}
          clickMarker={this.clickMarker}/>
      </div>
    );
  }

}

export default App;
