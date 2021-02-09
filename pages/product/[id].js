import Head from "next/head";
import { useState } from "react";
import { getData } from "../../utils/fetchData";

const DetailProduct = props => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);

  const isActive = index => {
    if (tab === index) return " active";
    return "";
  };

  return (
    <div className='row detail_page'>
      <Head>
        <title>Product Details</title>
      </Head>

      <div className='col-md-6'>
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          className='d-block img-thumbnail rounded mt-4 w-100'
        />
        <div className='row mx-0' style={{ cursor: "pointer" }}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className={`img-thumbnail rounded ${isActive(index)}`}
              style={{ width: "20%", height: "80px" }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className='col-md-6 mt-4'>
        <h3>{product.title}</h3>
        <h5 className='text-success'>${product.price}</h5>

        <div className='d-flex justify-content-between'>
          {product.inStock > 0 ? (
            <h6 className='text-success'>In Stock: {product.inStock}</h6>
          ) : (
            <h6 className='text-danger'>Out of stock</h6>
          )}

          <h6 className='text-danger'>Sold: {product.sold}</h6>
        </div>

        <div className='my-2'>{product.description}</div>
        <div className='my-2'>{product.content}</div>

        <button type='button' className='btn btn-dark btn-sm my-4'>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  return {
    props: {
      product: res.data,
    },
  };
}

export default DetailProduct;
