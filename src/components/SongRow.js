import React from "react";
import { useStateValue } from "./StateProvider";
import {useParams} from "react-router-dom";

function SongRow({ track, spotify, songNo=0 }) {
  const [{}, dispatch] = useStateValue();
  let { id } = useParams();
  const playSong = (sid,track) => {
    if(id){
      spotify
        .play({
          context_uri: `spotify:playlist:${id}`,
          offset: {
            "position": songNo,
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
    }
    else{
      spotify
      .play({
        uris: [`spotify:track:${sid}`],
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
    }
  };

  return (
    <div className="songRow" onClick={() => playSong(track.id,track)}>
      <img className="songRow__album" src={track.album?.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;