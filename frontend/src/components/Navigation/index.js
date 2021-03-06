import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div id='submit-icon-div'>
        <NavLink to='/products/new'>Submit Product</NavLink>
        <ProfileButton id='profile-btn' user={sessionUser}/>
      </div>
    );
  } else {
    sessionLinks = (
      <div id='login-signup-div'>
        <LoginFormModal id='login-modal' />
        <NavLink to='/signup'>Sign Up</NavLink>
      </div>
    );
  }

  return (
    <nav>
      <div className='nav-links'>
        <div>
          <NavLink id='home-nav' exact to='/'>Home</NavLink>
          <NavLink id='products-nav' to='/products'>Products</NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div>
      <h1><Link id="tabletop-quest" exact to='/'>Tabletop Quest</Link></h1>
    </nav>
  );
}

export default Navigation;
