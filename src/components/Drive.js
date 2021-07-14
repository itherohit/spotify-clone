import React, {useState,useEffect} from 'react'
import YouTube from 'react-youtube';
import {Link,useParams} from "react-router-dom";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import country from "../country.json";
import studies from "../study.json";
import { useStateValue } from "./StateProvider";
import Loader from "react-loader-spinner";

function Drive({ study,spotify }) {
    const [full,setfull] = useState(true);
    const [mute,setmute] = useState(1);
    const [{}, dispatch] = useStateValue();
    useEffect(()=>{
        if(study){
            setmute(0);
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        }
        else
            setmute(1);
    },[study])

    let { id } = useParams();
    const handleClick = () => {
        setfull(!full);
        document.getElementById("sidebar").classList.toggle("close");
    }

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0, 
            autohide: 1,
            loop: 1,
            mute: 1,
            allowfullscreen: 1,
            autohide: 1,
            loop: 1,
            showinfo: 0, 
            rel: 0,
        },
      };

    return (
        <div className="playback">
            <div class="playback__loader lds-ripple"><div></div><div></div></div>
            { full && <FullscreenIcon onClick={handleClick} className="full__icon"/> }
            { !full && <FullscreenExitIcon onClick={handleClick} className="full__icon"/> }
            <div class="dropdown select__country">
                <button class="dropbtn">{study ? "Beats" : "Country"}</button>
                <div class="dropdown-content">
                    { study ?
                        studies.map(c=>{
                            return (<Link to={"/study/"+ c.urls[Math.floor(Math.random()*c.urls.length)]} className="a">{c.country}</Link>);
                        }) :
                        country.map(c=>{
                            return (<Link to={"/drive/"+ c.urls[Math.floor(Math.random()*c.urls.length)]} className="a">{c.country}</Link>);
                        })
                    }
                    
                    {/* <Link to="/" className="a">India</Link>
                    <Link to="/" className="a">India</Link>
                    <Link to="/" className="a">India</Link>
                    <Link to="/" className="a">India</Link>
                    <Link to="/" className="a">India</Link> */}
                </div>
            </div>
            <iframe className="playback__player" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; loop;" title="YouTube video player" width="100%" height="100%" src={`https://www.youtube.com/embed/${id}?autoplay=1&amp;mute=${mute}&amp;controls=0&amp;start=40&amp;loop=1&amp;origin=http%3A%2F%2Flocalhost:3000/drive&amp;playsinline=1&amp;rel=0&amp;showinfo=0&amp;loop=1&amp;enablejsapi=1&amp;widgetid=1`} id="widget2"></iframe>
            <div className="playback__overlay"></div>
            {/* <YouTube videoId="UTiXQcrLlv4" opts={opts} /> */}
            
        </div>
    );
}

export default Drive
