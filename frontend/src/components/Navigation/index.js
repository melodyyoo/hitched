import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar" style={{ display: "flex", width: "100%", justifyContent: "space-between", borderBottom: 'solid rgb(175, 175, 175)'}}>
      <NavLink className="logo-link" exact to="/">
      <i class="fa-solid fa-ring" style={{color:" #6d9864", width:'fit-content'}}></i>
        hitched
      </NavLink>

      <div style={{display:'flex'}}>
        {sessionUser && <NavLink style={{marginRight: 15, textDecoration: 'none', color: 'black', fontSize:14, marginTop: 12}}to="/spots/new">Create a New Spot</NavLink>}
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
