import React from "react";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useStateValue } from "./StateProvider";
import country from "../country.json";
import study from "../study.json";

function Sidebar() {
  const [{ playlists }, dispatch] = useStateValue();
  const c = country[Math.floor(Math.random()*country.length)];
  const id = c.urls[Math.floor(Math.random()*c.urls.length)];
  const s = study[Math.floor(Math.random()*study.length)];
  const sid = s.urls[Math.floor(Math.random()*s.urls.length)];

  return (
    <div className="sidebar" id="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOption Icon={HomeIcon} title="Home" link="/home"/>
      <SidebarOption Icon={SearchIcon} title="Search" link="/search"/>
      <SidebarOption Icon={LibraryMusicIcon} title="Dicover Weekly" link="/"/>
      <SidebarOption Icon={DriveEtaIcon} title="Drive Mode" link={"/drive/" + id}/>
      <SidebarOption Icon={MenuBookIcon} title="Study Mode" link={"/study/" + sid} footerView={false}/>
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      <div className="playlist__container">
        {playlists?.items?.map((playlist) => (
          <SidebarOption title={playlist.name} link={"/playlist/" + playlist.id}/>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;