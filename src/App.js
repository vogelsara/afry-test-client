import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';

// pages
import CreatePeople from './pages/CreatePeople';
import Companies from './pages/Companies';
import PeopleWithoutCompany from './pages/PeopleWithoutCompany';

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
