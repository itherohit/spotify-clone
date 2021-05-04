import React, { useEffect, useState } from "react";
import './App.css';
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from "./components/Spotify";
import Login from "./components/Login";
import Player from "./components/Player";
import { useStateValue } from './components/StateProvider';

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token },dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    window.location.hash = "";
    if(_token){
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })
      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        });
      })

      spotify.getUserPlaylists().then( playlist => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlist
        });
      })

      spotify.getPlaylist("37i9dQZEVXcUCHBjZBZn0e").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
  }, []);
  console.log(user);
  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
