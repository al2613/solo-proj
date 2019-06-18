import React, { Component } from 'react';
import Reviews from './Reviews.js';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.displayDetails = this.displayDetails.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.state = {
      reviews: null,
      clicked: false,
      sentiment: null
    };
  }
  // post request to db to handle thumbs up/thumbs down
  handleRating(details, experience) {
    fetch('/rated', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: details.name,
        rating: details.rating,
        user_experience: experience
      })
    });
  }

  // fetch specific restaurant data when clicked
  displayDetails(id) {
    fetch(`/restaurant/${id}`, {
      crossDomain: true,
      'access-control-allow-origin': '*',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => JSON.parse(data))
      .then(results => {
        console.log('result', results);
        this.setState({
          reviews: results.result.reviews,
          clicked: true
        });
      })
      .catch(err => {
        console.log(err);
      });

    // retrieve sentiment analysis data and pass as props
    fetch(`/sentiment/${id}`, {
      crossDomain: true,
      'access-control-allow-origin': '*',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ sentiment: data });
        console.log('state', this.state);
      })
      .catch(err => {
        console.log(err);
      });

    event.preventDefault();
  }
  render() {
    const { details } = this.props;
    const { clicked, reviews, sentiment } = this.state;

    return (
      <div className="entry">
        <h2>{details.name}</h2>
        <section>Address: {details.formatted_address}</section>
        <section>Rating: {details.rating}</section>
        <button
          className="btn"
          onClick={() => this.displayDetails(details.place_id)}
        >
          View Reviews
        </button>
        <button className="btn btn--positive">
          <i
            class="fa fa-thumbs-up fa-lg"
            onClick={() => this.handleRating(details, 'positive')}
          />
        </button>
        <button className="btn btn--negative">
          <i
            class="fa fa-thumbs-down fa-lg"
            onClick={() => this.handleRating(details, 'negative')}
          />
        </button>
        <div>
          {clicked && <Reviews reviews={reviews} sentiment={sentiment} />}
        </div>
      </div>
    );
  }
}

export default Entry;
