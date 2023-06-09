import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
      <NavLink exact to="/">
        Home
      </NavLink>

      <div style={{display:'flex'}}>
        {sessionUser && <NavLink style={{marginRight: 15, textDecoration: 'none', color: 'black', fontSize:14, marginTop: 12}}to="/spots/new">Create a New Spot</NavLink>}
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
