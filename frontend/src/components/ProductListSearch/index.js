import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, readProductsSearch } from "../../store/products";
// import './ProductList.css';
import { Modal } from '../../context/Modal';
import ProductSearchBar from "../ProductSearchBar";
import ProductProfile from "../ProductProfile";

const ProductListSearch = () => {
  const dispatch = useDispatch();
  const searchQuery = useParams().query;
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
    dispatch(readProductsSearch(searchQuery));
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
      <div className="header-search-bar">
        <h2>Search Results for "{searchQuery}"</h2>
        <ProductSearchBar></ProductSearchBar>
      </div>
        {products.length > 0 ?
          <ul>
            {products.map(({id, userId, title, imageSrc, description, updatedAt, createdAt}, index) => (
              <div key={`product-${id}`}  className='product-div' onClick={() => {setShowModal(true); setProfileModalId(id)}}>
                <img src={imageSrc} alt={title} />
                <div className='product-detail-div'>
                  <h3>{title}</h3>
                  {(sessionUser && sessionUser.id === userId) ?
                    <i className="fas fa-ellipsis-h edit-delete-menu"
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
                  : null }
                </div>
              </div>
            ))}
          </ul>
        :
          <h3>Nothing to see here!</h3>}
        {showModal && (
          <Modal key='product-modal' onClose={() => setShowModal(false)}>
            <ProductProfile productsObj={productsObj} productId={profileModalId} sessionUser={sessionUser} onClose={() => setShowModal(false)}/>
          </Modal>
          )}
    </div>
  );
}

export default ProductListSearch;
