import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import axiosWithAuth from "./helpers/axiosWithAuth";

function App(props) {

  const handleLogout = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/logout')
        .then(res=>{
          //console.log(res);
          localStorage.removeItem("token");
        })
        .catch(err => {
          console.log('error ' + err)
        })

  }
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a onClick={handleLogout} data-testid="logoutButton" href="/login">logout</a>
        </header>
        <PrivateRoute path='/bubbles' component={BubblePage}/>
        <Route exact path='/' component={Login}/>
        <Route path='/login' component={Login}/>
        
      </div>
    </Router>

  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.