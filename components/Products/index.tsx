import { ReactElement, useEffect } from "react";
import styles from "../../styles/Products.module.css";
import CardProducts from "../CardProduct";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProducts } from "../../features/productsSlice";
import { Skeleton } from "@mui/material";

export default function Products(): ReactElement {
  const products = useSelector(
    (state: RootState) => state.products.allProducts
  );
  const isLoading = useSelector((state: RootState) => state.products.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className={styles.products_container}>
      {!isLoading
        ? products?.map((product) => (
            <CardProducts product={product} key={product.id} />
          ))
        : [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item}>
              <Skeleton variant="rounded" width={217} height={285} />
            </div>
          ))}
    </div>
  );
}
