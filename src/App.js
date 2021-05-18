import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';

// pages
import CreatePeople from './pages/CreatePeople';
import Companies from './pages/Companies';
import PeopleWithoutCompany from './pages/PeopleWithoutCompany';

import axios from 'axios';

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  axios.defaults.baseURL = 'http://localhost:5001/afry-test/europe-west1/api';
} else {
  axios.defaults.baseURL = 'https://europe-west1-afry-test.cloudfunctions.net/api';
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="container">
          <Switch>
            <Route exact path='/' component={CreatePeople}/>
            <Route exact path='/companies' component={Companies}/>
            <Route exact path='/people' component={PeopleWithoutCompany}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
