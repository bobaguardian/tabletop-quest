
import './ProductProfile.css';

const ProductProfile = ({ productId, productsObj }) => {
  const {title, imageSrc, description, updatedAt, createdAt} = productsObj[productId];
  return (
    <div id='product-profile-div'>
      <div id='product-profile-header'>
        <img src={imageSrc} alt={title} />
        <div id='product-profile-title-dates'>
          <h2>{title}</h2>
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
