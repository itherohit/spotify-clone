import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Discover from "./Discover";
import Home from "./Home";
import Search from "./Search";
import Playlist from "./Playlist";
import Drive from "./Drive";

function Player({ spotify }) {
  return (
    <div className="player">
      <div className="player__body">
      <Router>
        <Sidebar />
          <Switch>
            <Route path="/home">
              <Home spotify={spotify} />
            </Route>
            <Route path="/search">
              <Search spotify={spotify} />
            </Route>
            <Route path="/playlist/:id">
              <Playlist spotify={spotify} />
            </Route>
            <Route path="/drive/:id">
              <Drive spotify={spotify} study={false}/>
            </Route>
            <Route path="/study/:id">
              <Drive spotify={spotify} study={true}/>
            </Route>
            <Route path="/">
              <Discover spotify={spotify} />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default Player;