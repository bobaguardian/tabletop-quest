import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const { username, email } = user;
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return <Redirect to='/' />;
  }

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);


  return (
    <div className='profile-icon-menu'>
      <button className='icon-btn' onClick={openMenu}>
        <i className = "fas fa-user-circle" />
      </button>
      <div id='profile-dropdown-div'>
        <ul>
          <li>{username}</li>
          <li>{email}</li>
          <li>
            <button id="logout-btn" onClick={logout}>Log Out</button>
          </li>
        </ul>
      </div>
      {/* {showMenu && (
        <ul id='profile-dropdown'>
          <li>{username}</li>
          <li>{email}</li>
          <li>
            <button id="logout-btn" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )} */}
    </div>
  );
}

export default ProfileButton;
