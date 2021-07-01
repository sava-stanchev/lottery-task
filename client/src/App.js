import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components/Navbar';
import LotteryPage from './components/LotteryPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route exact path="/home" component={LotteryPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
