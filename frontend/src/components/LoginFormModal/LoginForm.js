import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // // if user is logged in, redirect to home page
  // if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({email, password}))
      .catch(async(res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        setPassword('');
      });
  }

  const demo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      email: 'demo@user.io',
      password: 'imdebestmouse'
    }))
  }

  return (
    <div id='login-div'>
      <h1>Log In</h1>
      <form id='login-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='form-ele'>
          <label htmlFor='email'>
            Email
          </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              placeholder='someemail@email.com'
              required
              id='email'
            />
        </div>

        <div className='form-ele'>
          <label htmlFor='password'>
            Password
          </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              required
              id='password'
            />
        </div>
        <button className='form-ele' type='submit'>Log In</button>
        <button className='demo-btn form-ele' onClick={demo}>Demo as a guest!</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
