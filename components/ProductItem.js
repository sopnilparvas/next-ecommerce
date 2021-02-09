import Link from "next/link";

function ProductItem({ product }) {
  return (
    <div className='card' style={{ width: "18rem" }}>
      <img src={product.images[0].url} className='card-img-top' alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>{product.title}</h5>
        <div className='d-flex justify-content-between'>
          <h6 className='text-primary'>${product.price}</h6>
          {product.inStock > 0 ? (
            <h6 className='text-success'>In Stock: {product.inStock}</h6>
          ) : (
            <h6 className='text-danger'>Out of stock</h6>
          )}
        </div>
        <p className='card-text'>{product.description}</p>

        <div className='d-flex justify-content-between'>
          <Link href={`product/${product._id}`}>
            <a className='btn btn-info flex-fill text-white me-1'>View</a>
          </Link>
          <button className='btn btn-success flex-fill ms-1'>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
