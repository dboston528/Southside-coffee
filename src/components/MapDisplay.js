import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY = "AIzaSyBlx6nrpogJFZyYMdMyfU7GTMGmHGYKJnQ";

class MapDisplay extends Component {
    state = {
        map: null,
        markers: [],
        markerProps: [],
        activeMarker: null,
        activeMarkerProps: null,
        showingInfoWindow: false
    };

    componentDidMount = () => {

    }

    MapReady = (props, map) => {
        this.setState({map});
        this.updateMarkers(this.props.locations)
    }

    closeInfoWindow = () => {
        this.state.activeMarker && this
            .state
            .activeMarker
            .setAnimation(null);
        this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps:null });
    }

    markerClick = (props, marker, e) => {
        this.closeInfoWindow();

        this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
    }

    updateMarkers = (locations) => {
        if (!locations)
            return;

        this.state.markers.forEach(marker => marker.setMap(null));

        let markerProps = [];
        let markers = locations.map((location, index) => {
            let mProps = {
                key: index,
                index,
                name: location.name,
                position: location.pos,
                url: location.url
            };
            markerProps.push(mProps);

            let animation = this.props.google.maps.Animation.Drop;
            let marker = new this.props.google.maps.Marker({
                position: location.pos,
                map: this.state.map,
                animation
            });

            marker.addListener('click', () => {
                this.markerClick(mProps, marker, null);
            });
            return marker;
        })
        this.setState({markers, markerProps});
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
        let amProps = this.state.activeMarkerProps;

        return (
            <Map
                role = "application"
                aria-label = "map"
                onReady = {this.mapReady}
                google = {this.props.google}
                style = {style}
                initialCenter={center}
                onClick={this.closeInfoWindow}>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                        <div>
                            <h3>{amProps && amProps.name}</h3>
                            {amProps && amProps.url
                                ? (
                                    <a href={amProps.url}>See website</a>
                                )
                            : ""}
                        </div>
                    </InfoWindow>
                </Map>


        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)