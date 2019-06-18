import React, { Component } from 'react';

class SavedRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ratedRestaurants: null };
  }

  // request to db to get saved restaurants
  componentDidMount() {
    fetch('/rated')
      .then(res => res.json())
      .then(data => {
        let obj = { ratedRestaurants: data };
        this.setState(obj);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { ratedRestaurants } = this.state;
    if (ratedRestaurants) {
      return (
        <div>
          <h1>My Rated Restaurants</h1>
          {ratedRestaurants.map(restaurant => (
            <div className="saved">
              <p>Name: {restaurant.name}</p>
              <p>Overall rating: {restaurant.rating}</p>
              <p>User experience: {restaurant.user_experience}</p>
            </div>
          ))}
        </div>
      );
    } else return null;
  }
}

export default SavedRestaurants;
