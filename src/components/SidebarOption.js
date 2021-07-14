import React from "react";
import {Link} from "react-router-dom";
import { useStateValue } from "./StateProvider";

function SidebarOption({ title = "title", Icon, link = "/", footerView = true}) {
  const [{}, dispatch] = useStateValue();
  function handleClick(){
    if(footerView){
      dispatch({
        type: "SET_FOOTER",
        footer: true,
      });
    }else{
      dispatch({
        type: "SET_FOOTER",
        footer: false,
      });
    }
  }
  return (
    <Link to={link} onClick={handleClick}> 
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
    </Link>
  );
}

export default SidebarOption;