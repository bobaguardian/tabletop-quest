import { useEffect } from "react";
import { useHistory, Redirect, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, removeProduct } from "../../store/products";
import './ProductList.css';
import ProductForm from "../ProductForm";

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  // subscribes ProductList to state.products.entries
  const productsObj = useSelector((state) => {return state.products.entries});
  const products = Object.values(productsObj).reverse();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = (e) => {
    const productId = e.target.value;
    dispatch(removeProduct(productId))
  };

  return (
    <div className='product-list-div'>
      <h2>Product List</h2>
      <ul>
        {products.map(({id, userId, title, imageSrc, description, updatedAt}) => (
          <div key={id} className='product-div'>
            <img src={imageSrc} alt={title} />
            <div className='product-detail-div'>
              <h3>{title}</h3>
              {(sessionUser && sessionUser.id === userId) ? (
                <div className='edit-delete-div'>
                  <a value={id} href={`/products/${id}/edit`}>Edit</a>
                  <button value={id} onClick={handleDelete}>Delete</button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
