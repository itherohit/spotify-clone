import React, { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SongRow from "./SongRow";

function Search({spotify}) {
    const [{ user, discover_weekly }, dispatch] = useStateValue();
    const [search, changeSearch] = useState("");
    const [results, setResults] = useState();
    useEffect(() => {
        spotify.searchTracks(search).then(response => {
            setResults(response);
        })
    },[search])


    const playPlaylist = (id) => {
        spotify
          .play({
            context_uri: `spotify:playlist:37i9dQZEVXcUCHBjZBZn0e`,
            offset: {
              "position": 1
            }
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };
    
    return (
        <div className="body">
            <div className="header">
                <div className="header__left">
                <SearchIcon />
                <input
                    placeholder="Search for Songs"
                    type="text"
                    className="search__input"
                    onChange={(event) => changeSearch(event.target.value) }
                />
                </div>
                <div className="header__right">
                    <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
                    <h4>{user?.display_name}</h4>
                </div>
            </div>
            {results?.tracks.items.map((item) => (
              <SongRow spotify={spotify} track={item} />
            ))}
        </div>
    )
}

export default Search
