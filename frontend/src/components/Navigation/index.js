import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton id='profile-btn' user={sessionUser}/>
  } else {
    sessionLinks = (
      <div id='login-signup-div'>
        {/* <NavLink to='/login'>Log In</NavLink> */}
        <LoginFormModal />
        <NavLink to='/signup'>Sign Up</NavLink>
      </div>
    );
  }

  return (
    <nav>
      <NavLink exact to='/'>Home</NavLink>
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
