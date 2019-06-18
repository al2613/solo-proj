import React, { Component } from 'react';
import Entry from './Entry.js';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.printCoorindates = this.printCoorindates.bind(this);
    // set up initial state
    this.state = { restaurants: null, lat: null, long: null };
  }
  // grab location
  componentDidMount() {
    this.getLocation();
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(this.printCoorindates);
  }

  printCoorindates(position) {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
    console.log('state', this.state);
  }

  // request to server to fetch data
  handleSubmit(event) {
    fetch(
      `/developer/${this.refs.search.value}/${this.state.lat}/${
        this.state.long
      }`,
      {
        crossDomain: true,
        'access-control-allow-origin': '*',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(res => res.json())
      .then(data => JSON.parse(data))
      .then(results => {
        console.log('result', results);
        this.setState({ restaurants: results.results });
        this.refs.search.value = '';
      });
    event.preventDefault();
  }
  render() {
    const { restaurants } = this.state;
    const options = [];

    if (restaurants) {
      restaurants.forEach(restaurant => {
        options.push(<Entry details={restaurant} />);
      });
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="insert a restaurant to search..."
            ref="search"
          />
        </form>
        <div className="restaurants">{options}</div>
      </div>
    );
  }
}
export default Container;
