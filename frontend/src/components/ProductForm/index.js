
import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/products';
import './ProductForm.css';

const ProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);


  if (!sessionUser) {
    return <Redirect to='/'></Redirect>
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      userId: sessionUser.id,
      title,
      imageSrc,
      description
    }

    setErrors([]);
    dispatch(productActions.submitProduct(product))
      .then((res) => {
        history.push('/');
      })
      .catch(async(res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });
  }

  return (
    <div className='submit-product-div'>
      <h2>Submit a New Product</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='form-ele'>
          <label htmlFor='title'>
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type='text'
            placeholder='The best title ever!'
            required
            id='title'
          />
        </div>
        <div className='form-ele'>
          <label htmlFor='description'>
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder='Why my quest is over for the best tabletop game!'
            required
            id='description'
          />
        </div>
        <div className='form-ele'>
          <label htmlFor='imageSrc'>
            Image URL
          </label>
          <input
            onChange={(e) => setImageSrc(e.target.value)}
            value={imageSrc}
            type='text'
            placeholder=''
            required
            id='imageSrc'
          />
        </div>
        <button className='form-ele' type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default ProductForm;
