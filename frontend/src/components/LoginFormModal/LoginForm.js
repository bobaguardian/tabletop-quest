import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // // if user is logged in, redirect to home page
  if (sessionUser) return history.push('/products');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({email, password}))
      .then((res) => history.push('/products'))
      .catch(async(res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        setPassword('');
      });
  }

  const demo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({
      email: 'demo@user.io',
      password: 'imdebestmouse'
    })).then((res) => history.push('/products'));
  }

  return (
    <div id='login-div'>
      <h2>Log In</h2>
      <form id='login-form' onSubmit={handleSubmit}>
        <ul className='errors-ul'>
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
        <button className='form-ele login-btn' type='submit'>Log In</button>
        <button className='demo-btn form-ele' onClick={demo}>Demo as a guest!</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
