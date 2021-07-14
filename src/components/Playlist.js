import React,{ useState,useEffect } from 'react'
import {useParams} from "react-router-dom";
import Header from "./Header";
import SongRow from "./SongRow";
import { useStateValue } from "./StateProvider";

function Playlist({ spotify}) {
    let { id } = useParams();
    const [{}, dispatch] = useStateValue();
    const [songs,setSongs] = useState();
    const [name,setName] = useState("");

    useEffect(()=> {
        spotify.getPlaylist(id.toString()).then(res => {
            setSongs(res.tracks);
            setName(res.name);
          })
    },[id]);

    useEffect(()=> {
        spotify
            .play({
                context_uri: `spotify:playlist:${id}`
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
    },[id]);

    return (
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body__infoText">
                <h2>{name}</h2>
            </div>
            {songs?.items.map((item,index) => (
                <SongRow songNo={index} spotify={spotify} track={item.track} />
            ))}
        </div>
    )
}

export default Playlist
