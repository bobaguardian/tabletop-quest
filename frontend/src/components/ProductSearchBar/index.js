import { useEffect, useState } from "react";
import { useHistory, useLocation, } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { readProductsSearch, getAllProducts } from "../../store/products";
import "./ProductSearchBar.css";

const ProductSearchBar = ({query}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const productsObj = useSelector((state) => {return state.products.entries});
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])


  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleProductSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchQuery === "") {
      dispatch(getAllProducts())
      history.push('/products');
    } else {
      dispatch(readProductsSearch(searchQuery));
      history.push(`/products/search/${searchQuery}`);

    }
  }

  return (
    <div>
      <form className="product-search-form" onSubmit={handleProductSearch}>
        <input
          onChange={updateSearchQuery}
          value={searchQuery}
          className="search-bar"
          placeholder="Search a game by title"
        />
        <button className='form-ele search-submit' type='submit'>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
}

export default ProductSearchBar;
