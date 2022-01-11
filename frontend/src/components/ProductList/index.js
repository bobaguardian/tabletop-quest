import { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, removeProduct } from "../../store/products";
import './ProductList.css';
import ProductForm from "../ProductForm";
import { Modal } from '../../context/Modal';
import ProductProfile from "../ProductProfileModal";

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  // subscribes ProductList to state.products.entries
  const productsObj = useSelector((state) => {return state.products.entries});
  // sort products based on most recently updated
  const products = Object.values(productsObj).sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  const [showModal, setShowModal] = useState(false);
  const [showEditDeleteMenu, setShowEditDeleteMenu] = useState(false);
  const [edMenuId, setEdMenuId] = useState();
  const [profileModalId, setProfileModalId] = useState();


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // stop background from scrolling when modal is shown
  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
 }, [showModal])

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const productId = e.target.value;
    dispatch(removeProduct(productId))
  };

  return (
    <div className='product-list-div'>
      <h2>Product List</h2>
      <ul>
        {products.map(({id, userId, title, imageSrc, description, updatedAt, createdAt}) => (
          <>
            <div key={`product-${id}`}  className='product-div' onClick={() => {setShowModal(true); setProfileModalId(id)}}>
              <img src={imageSrc} alt={title} />
              <div className='product-detail-div'>
                <h3>{title}</h3>
                {(sessionUser && sessionUser.id === userId) ?
                  <div>
                    <i class="fas fa-ellipsis-h edit-delete-menu"
                      onMouseEnter={() => {setShowEditDeleteMenu(true); setEdMenuId(id);}}
                      onMouseLeave={() => setShowEditDeleteMenu(false)}>
                      {(showEditDeleteMenu && (edMenuId === id)) ? (
                        <div className='edit-delete-div'
                          onMouseEnter={() => {setShowEditDeleteMenu(true); setEdMenuId(id);}}
                          onMouseLeave={() => setShowEditDeleteMenu(false)}>
                          <Link value={id} to={`/products/${id}/edit`}>Edit</Link>
                          <button value={id} onClick={handleDelete}>Delete</button>
                        </div>
                      ) : null}
                    </i>
                  </div>
                : null }
              </div>
            </div>
          </>

        ))}
      </ul>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ProductProfile productsObj={productsObj} productId={profileModalId}/>
          </Modal>
          )}
    </div>
  );
}

export default ProductList;
