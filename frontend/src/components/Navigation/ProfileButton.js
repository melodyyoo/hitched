import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const history=useHistory();

  return (
    <div>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
    {  showMenu && <div ref={ulRef}>
        {user ? (
          <div className="user-info" style={{position: 'absolute', right: 0}} >
          <button onClick={e=>history.push('/spots/current')}style={{all:'unset', cursor:'pointer'}}>Manage Spots</button>
            <p>{user.username}</p>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <p>
              <button onClick={logout}>Log Out</button>
            </p>
          </div>
        ) : (
          <div className="menu-buttons" style={{position:'absolute', right:0}}>
            <p>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </p>
            <p>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </p>
          </div>
        )}
      </div>}
    </div>
  );
}

export default ProfileButton;
