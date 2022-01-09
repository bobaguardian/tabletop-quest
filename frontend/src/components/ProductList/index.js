import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();

  // subscribes ProductList to state.products.entries
  const products = useSelector((state) => state.products.entries);
  // const products = Object.values(productsObj);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className='product-list-div'>
      <h1>ProductList</h1>
      <ul>
        {products.map(({id, title, imageSrc, description, updatedAt}) => (
          <div key={id} className='product-div'>
            <img src={imageSrc} alt={title} />
            {/* TO DO: take out description and updatedAt when
            // adding product profile page */}
            <div className='product-detail-div'>
              <h2>{title}</h2>
              <p>{description}</p>
              <p>{updatedAt.toLocaleString()}</p>

            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
