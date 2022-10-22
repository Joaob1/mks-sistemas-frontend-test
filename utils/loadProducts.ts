import Product from "../schemas/Product";
import api from "../services/api"
const LoadProducts = async () => {
    const { data }: {data: {products: Product[]}} = await api.get(
            "/products?page=1&rows=8&sortBy=id&orderBy=ASC"
          );
          return data.products;
}
export default LoadProducts;