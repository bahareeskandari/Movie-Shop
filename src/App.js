import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cart from "./Cart";
import "./App.css";
import Liked from "./Liked";
import { StateProvider } from "./StateHolder";
import Home from "./Home";

function App() {
  return (
    <StateProvider>
      <div className="container">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <Link className="nav-item active" to="/">
              Home
            </Link>
            <Link className="nav-item" to="/Liked">
              Liked
            </Link>
            <Link className="nav-item" to="/Cart">
              Cart
            </Link>
          </nav>

          <Route path="/" exact component={Home} />
          <Switch>
            <Route path="/Liked" component={Liked} />
            <Route path="/Cart" component={Cart} />
          </Switch>
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;
