import Head from "next/head";
import { useState } from "react";
import { getData } from "../utils/fetchData";
import ProductItem from "../components/ProductItem";

const Home = props => {
  const [products, setProducts] = useState(props.products);

  console.log(products);

  return (
    <div className='products'>
      <Head>
        <title>Breeze | Your online store</title>
      </Head>

      {products.length === 0 ? (
        <h2>No Products Found.</h2>
      ) : (
        products.map(product => <ProductItem key={product._id} product={product} />)
      )}
    </div>
  );
};
export async function getServerSideProps() {
  const res = await getData("product");
  return {
    props: {
      products: res.data,
      result: res.result,
    },
  };
}

export default Home;
