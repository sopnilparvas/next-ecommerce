import connectDB from "../../../utils/db";
import Product from "../../../models/productModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ err: "Product not found!" });

    res.json({ data: product });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
