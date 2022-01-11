
import { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { submitProduct, editProduct } from '../../store/products';
import './ProductForm.css';

const ProductForm = ({type, productsObj}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  let initialTitle = '';
  let initialImageSrc = '';
  let initialDescription = '';

  let productId = parseInt(useParams().id, 10);
  let productDetails;
  if (productId) {
    productDetails = productsObj[productId];
    if (productDetails){
      initialTitle = productDetails.title;
      initialImageSrc = productDetails.imageSrc;
      initialDescription = productDetails.description;
    }
  }

  const [title, setTitle] = useState(initialTitle);
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [description, setDescription] = useState(initialDescription);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) {
    return <Redirect to='/'></Redirect>
  }

  if (productId && productDetails.userId !== sessionUser.id){
    return <Redirect to='/products' />;
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

    if (type === 'create') { // CREATE
      dispatch(submitProduct(product))
        .then((res) => {
          history.push('/products');
        })
        .catch(async(res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
    } else { // UPDATE
      dispatch(editProduct(productId, product))
        .then((res) => {
          history.push('/products');
        })
        .catch(async(res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
    }
  }

  return (
    <div className='submit-product-div'>
      {(type === 'create') ? <h2>Submit a New Product</h2> : <h2>Edit Your Product</h2>}

      <form className='submit-product-form' onSubmit={handleSubmit}>
        <ul className='errors-ul'>
          {errors.map((error, idx) => <li key={idx}>* {error} *</li>)}
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
            rows='7'
            cols='50'
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
