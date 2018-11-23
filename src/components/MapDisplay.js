import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY = "AIzaSyBlx6nrpogJFZyYMdMyfU7GTMGmHGYKJnQ";

class MapDisplay extends Component {
    state = {
        map: null
    };

    componentDidMount = () => {

    }

    MapReady = (props, map) => {
        this.setState({map});
    }

    render = () => {
        const style ={
            width: '100%',
            height: '100%'
        }

        const center = {
            lat: this.props.lat,
            lng: this.props.lon
        }

        return (
            <Map>
                role = "application"
                aria-label = "map"
                onReady = {this.mapReady}
                google = {this.props.google}
                style = {style}
                initialCenter={center}
                onClick={this.closeInfoWindow}
                
                </Map>


        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)