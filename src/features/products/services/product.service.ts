import axios from "axios";
import { ProductDocumentTypes } from "../models/Product";

const getProducts = async () => {
  const response = await axios.get<ProductDocumentTypes[]>(`${import.meta.env.VITE_API_HOST}/product`);
  return response;
};

const productService = {
  getProducts,
};

export default productService;
