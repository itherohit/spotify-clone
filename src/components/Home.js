import React,{useEffect} from 'react';
import Header from "./Header";
import SongRow from "./SongRow";
import Artist from "./Artist";
import { useStateValue } from "./StateProvider";

function Home({ spotify }) {
    const [{ recently_played, top_artists, item }, dispatch] = useStateValue();
    
    useEffect(()=> {
      spotify.getMyRecentlyPlayedTracks().then(recently_played => {
        dispatch({
          type: "SET_RECENTLY",
          recently_played: recently_played,
        })
      })
    },[]);

    return (
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body__infoText">
                <h2>Top Artist</h2>
            </div>
            <div className="artist__row">
                {top_artists?.items.map((item) => (
                    <Artist name={item.name} image={item.images[0].url} />
                ))}
            </div>
            <div className="body__infoText">
                <h2>Recently Played</h2>
            </div>
            {recently_played?.items.map((item) => (
                <SongRow spotify={spotify} track={item.track} />
            ))}
      </div>
    )
}

export default Home;
