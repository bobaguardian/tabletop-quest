import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { getAllProducts } from "../../store/products";
import { readProductsSearch } from "../../store/products";
import "./ProductSearchBar.css";

const ProductSearchBar = () => {
  const dispatch = useDispatch();
  // const productsObj = useSelector((state) => {return state.products.entries});
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   dispatch(getAllProducts());
  // }, [dispatch])

  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleProductSearch = (e) => {
    console.log("Search query:", searchQuery);
    dispatch(readProductsSearch(searchQuery));
    e.preventDefault();
    e.stopPropagation();
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
        <button className='form-ele search-submit' type='submit'>Search</button>
      </form>
    </div>
  );
}

export default ProductSearchBar;
