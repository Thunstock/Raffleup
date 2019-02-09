import React from "react";
import { Switch, Route } from "react-router-dom";
import Raffle from "./Components/Raffle";
import Home from "./Components/Home";
import About from "./Components/About";
import ReactGA from "react-ga";
import NavBar from "./Components/NavBar";

function App() {
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/raffle" component={Raffle} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
