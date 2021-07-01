import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components/Navbar';
import LotteryPage from './components/LotteryPage'
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route exact path="/home" component={LotteryPage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
