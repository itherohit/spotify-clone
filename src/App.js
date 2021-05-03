import React, { useEffect, useState, useStateValue } from "react";
import './App.css';
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from "./components/Spotify";
import Login from "./components/Login";
import Player from "./components/Player"

const spotify = new SpotifyWebApi();

function App() {

  const [token, setToken] = useState();

  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    window.location.hash = "";
    if(_token){
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        console.log(user);
      })
    }
  }, [token]);

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
