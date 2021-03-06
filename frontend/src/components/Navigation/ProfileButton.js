import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const { username, email } = user;
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then((res) => {
      history.push('/');
    });
  }

  return (
    <div className='profile-icon-menu'>
      <button className='icon-btn'>
        <i className = "fas fa-user-circle" />
      </button>
      <div id='profile-dropdown-div'>
        <ul id='profile-dropdown-ul'>
          <li>{username}</li>
          <li id = 'email-dropdown'>{email}</li>
          <li id='logout-li'>
            <button id="logout-btn" onClick={logout}>Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
