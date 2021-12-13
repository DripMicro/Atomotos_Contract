import './App.css';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom"
import ReactNotifications from "react-notifications-component";
import {Header , Footer} from "./component/header-footer";
// import LandingPage from './view/LandingPage'
import LandingPage from "./view/LandingPage";
import Black from "./view/Black";
import Admin from "./view/Admin";
import Owner from "./view/Owner";
import PrivateSale from "./view/Private_sale";
import React, { Component }  from 'react';

function App() {
  return (
    
        <Router>
          {/* <Header/> */}
          {/* <Routes/> */}
          <ReactNotifications />
          <Switch>
            <Route exact path = "/develop" component = {Black}/>
            <Route exact path = "/" component = {LandingPage}/>
            <Route exact path = "/admin" component = {Admin}/>
            <Route exact path = "/owner" component = {Owner}/>
            <Route exact path = "/private_sale" component = {PrivateSale}/>
          </Switch>
          {/* <Footer/> */}
        </Router>
         
    
  );
}

export default App;

