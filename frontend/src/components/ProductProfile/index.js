import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { removeProduct } from '../../store/products';
import { getDiscussionsForProduct } from '../../store/discussions';
import DiscussionForm from '../DiscussionForm';
import DiscussionList from '../DiscussionList';
import './ProductProfile.css';
import '../DiscussionForm/DiscussionForm.css';

const ProductProfile = ({ productId, productsObj, sessionUser, onClose }) => {
  const discussionsObj = useSelector((state) => state.discussions.entries);
  const [showEditDeleteMenu, setShowEditDeleteMenu] = useState(false);
  const [edMenuId, setEdMenuId] = useState();
  const [seeDiscussions, setSeeDiscussions] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDiscussionsForProduct(productId));
    console.log('products obj',productsObj);
  }, [dispatch]);


  const {userId, title, imageSrc, description, updatedAt, createdAt, User} = productsObj[productId];

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
          <div className='flex'>
            <h2>{title}</h2>
            {(sessionUser && sessionUser.id === userId) ?
              <i className="fas fa-ellipsis-h edit-delete-menu-profile"
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
          </div>
          <p>By {User.username}</p>
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
      <div className='discussion-section'>
        <button id='see-discussions-btn' onClick={(e) => {setSeeDiscussions(true); e.target.style.display = 'none';}}>See Discussions</button>
        {(seeDiscussions && sessionUser) ? <DiscussionForm type='create' discussionsObj={discussionsObj} productId={productId} userId={sessionUser.id}/> : null}
        { seeDiscussions ? (<DiscussionList discussionsObj={discussionsObj} productId={productId}/>) : null}
      </div>
    </div>
  );
}

export default ProductProfile;
