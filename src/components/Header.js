import React,{ useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Visibility } from "@material-ui/icons";

function Header({ spotify }) {
  const [{ user }, dispatch] = useStateValue();
  
  return (
    <div className="header">
      <div className="header__left" style={{visibility: "hidden"}}>
        <SearchIcon />
        <input
          placeholder="Search for Songs"
          type="text"
          className="search__input"
        />
      </div>
      <div className="header__right">
        <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;