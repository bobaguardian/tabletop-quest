import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import './ProductProfile.css';
import { removeProduct } from '../../store/products';

const ProductProfile = ({ productId, productsObj, sessionUser, onClose }) => {
  const [showEditDeleteMenu, setShowEditDeleteMenu] = useState(false);
  const [edMenuId, setEdMenuId] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const {userId, title, imageSrc, description, updatedAt, createdAt} = productsObj[productId];

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
    return dispatch(removeProduct(productId))
      .then((res) => <Redirect to='/products'/>);
  };

  return (
    <div id='product-profile-div'>
      <div id='product-profile-header'>
        <img src={imageSrc} alt={title} />
        <div id='product-profile-title-dates'>
          <h2>{title}</h2>
            {(sessionUser && sessionUser.id === userId) ?
              <i class="fas fa-ellipsis-h edit-delete-menu"
                onMouseEnter={() => {setShowEditDeleteMenu(true); setEdMenuId(productId);}}
                onMouseLeave={() => setShowEditDeleteMenu(false)}>
                {(showEditDeleteMenu && (edMenuId === productId)) ? (
                  <div className='edit-delete-div'
                    onMouseEnter={() => {setShowEditDeleteMenu(true); setEdMenuId(productId);}}
                    onMouseLeave={() => setShowEditDeleteMenu(false)}>
                    <Link value={productId} to={`/products/${productId}/edit`}>Edit</Link>
                    <button value={productId} onClick={handleDelete}>Delete</button>
                  </div>
                ) : null}
              </i>
            : null }
          {(createdAt === updatedAt) ?
            <p>Posted {new Date(createdAt).toLocaleString()}</p> :
            <p>Last Edit {new Date(updatedAt).toLocaleString()}</p>
          }
        </div>
      </div>
      <div id='product-profile-details'>
        <h3>Description</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProductProfile;
