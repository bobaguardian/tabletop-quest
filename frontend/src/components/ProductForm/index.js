
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import './ProductForm.css';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [description, setDescription] = useState('');
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    return <Redirect to='/'></Redirect>
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div>
    <h2>Submit a New Product</h2>
      <form onSubmit={handleSubmit}>
        <input

        />
      </form>
    </div>
  );
}

export default ProductForm;
