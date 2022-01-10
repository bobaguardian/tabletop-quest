import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({username, email, password}))
        .catch(async(res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          setPassword('');
          setConfirmPassword('');
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field.']);
  }

  const demo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      email: 'demo@user.io',
      password: 'imdebestmouse'
    }))
  }

  return (
    <div id='signup-div'>
      <h1>Sign Up</h1>
      <form id='signup-form' onSubmit={handleSubmit}>
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
          <label htmlFor='username'>
            Username
          </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type='text'
              placeholder='TheBobaGuardian'
              required
              id='username'
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

        <div className='form-ele'>
          <label htmlFor='confirmPassword'>
            Confirm Password
          </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type='password'
              required
              id='confirmPassword'
            />
        </div>

        <button className='login-btn form-ele' type='submit'>Sign Up</button>
        <button className='demo-btn form-ele' onClick={demo}>Demo as a guest!</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
