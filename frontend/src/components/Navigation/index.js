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

      <div >
        <NavLink to="/spots/new">Create a spot</NavLink>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
