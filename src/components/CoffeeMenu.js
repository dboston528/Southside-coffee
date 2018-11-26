import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';

class CoffeeMenu extends Component {
    state = {
        open: false,
        query: ""
    }

    styles = {
        list: {
            width: "250px",
            padding: "0px 15px 0px"
        },
        noBullets: {
            listStyleType: "none",
            padding: 0
        },
        fullList: {
            width: 'auto'
        },
        listItem: {
            marginBottom: "15px"
        },
        listLink: {
            background: "transparent",
            border: "none",
            color: "black",
            width: "100%"
        },
        listItemName: {
            fontWeight: "bold"
        },
        filterEntry: {
            border: "1px solid gray",
            padding: "3px",
            margin: "30px 0px 10px",
            width: "100%"
        }
    };

    updateQuery = (newQuery) => {
        
        this.setState({query: newQuery});
        this
            .props
            .filterVenues(newQuery);
    }

    render = () => {
        return (
            <div>
                <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
                    <div style={this.styles.list}>
                        <input
                            style={this.styles.filterEntry}
                            type="text"
                            placeholder="Filter list"
                            name="filter"
                            onChange={e => this.updateQuery(e.target.value)}
                            value={this.state.query}/>
                        <ul style={this.styles.noBullets}>
                            {this.props.venues && this
                                .props
                                .venues
                                .map((venue, index) => {
                                    return (
                                        <li style={this.styles.listItem} key={venue.id}>
                                            <button
                                                style={this.styles.listLink}
                                                key={index}
                                                onClick={e => this
                                                .props
                                                .clickMarker(venue.id)}>
                                                <div>
                                                    <div style={this.styles.listItemName}>
                                                        {venue.name}
                                                    </div>
                                                </div>
                                            </button>
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default CoffeeMenu;