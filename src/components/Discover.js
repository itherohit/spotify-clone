import React,{useEffect} from "react";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Discover({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();
  useEffect(()=>{
    console.log(discover_weekly);
  },[]);
  const playPlaylist = () => {
    spotify
      .play({
        uris: [`spotify:track:${discover_weekly?.items[0].id}`],
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
      <Header spotify={spotify}/>

      <div className="body__info">
        {/* <img src={discover_weekly?.images[0]?.url} alt="" /> */}
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you. Updates every Monday</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.items.map((item) => (
          <SongRow spotify={spotify} track={item} />
        ))}
      </div>
    </div>
  );
}

export default Discover;