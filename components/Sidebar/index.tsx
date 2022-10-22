import { ReactElement } from "react";
import styles from "../../styles/Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../features/sidebarSlice";
import { RootState } from "../../redux/store";
import SidebarItems from "../SidebarItems";
import Product from "../../schemas/Product";
export default function Sidebar(): ReactElement {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const hasItem = (product: Product) => {
    const productFind = totalItems.find((item) => {
      return item.id === product.id;
    });
    if (!productFind) return false;
    return true;
  };

  return (
    <div className={styles.sidebar} data-testid="sidebar">
      <div className={styles.sidebar_header}>
        <h1 className={styles.h1}>
          Carrinho <br />
          de compras
        </h1>
        <span
          onClick={() => dispatch(hide())}
          className={styles.sidebar_close}
          data-testid="closeSidebar"
        >
          X
        </span>
      </div>
      <div className={styles.items}>
        {products.map((item: Product) =>
          hasItem(item) ? <SidebarItems product={item} key={item.id} /> : ""
        )}
      </div>
      <div className={styles.totalPrice}>
        <h1>Total:</h1>
        <span>{`R$${totalPrice}`}</span>
      </div>
      <button className={styles.finalizar}>Finalizar Compra</button>
    </div>
  );
}
