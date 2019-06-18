import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import SavedRestaurants from './components/SavedRestaurants.js';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rated-restaurants">My Rated Restaurants</Link>
        </li>
      </ul>
      <Route exact path="/" component={App} />
      <Route path="/rated-restaurants" component={SavedRestaurants} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('app'));
