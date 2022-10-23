import styles from "../../styles/SidebarItems.module.css";
import Image from "next/image";
import { ReactElement } from "react";
import Product from "../../schemas/Product";
import { useDispatch } from "react-redux";
import CountItemsById from "../../utils/countItemsById";
import {
  addProduct,
  clearProduct,
  removeProduct,
} from "../../features/cartSlice";

export default function SidebarItems({
  product,
}: {
  product: Product;
}): ReactElement {
  const dispatch = useDispatch();
  const itemsAmount: number = CountItemsById(product.id);
  const stringPrice: string = `R$${(
    Number(product.price) * itemsAmount
  ).toFixed(0)}`;
  return (
    <div className={styles.product} data-testid="sidebarItem">
      <Image
        src={product.photo}
        alt={product.name}
        className={styles.product_image}
        width={46}
        height={57}
        objectFit={"none"}
      />
      <span className={styles.product_name}>{product.name}</span>
      <div className={styles.qtd}>
        <span>Qtd</span>
        <div className={styles.amount_and_buttons}>
          <button
            onClick={() => dispatch(removeProduct(product))}
            data-testid="Decrease Button"
          >
            -
          </button>
          <span data-testid="amount">{itemsAmount}</span>
          <button
            onClick={() => dispatch(addProduct(product))}
            data-testid="Increase Button"
          >
            +
          </button>
        </div>
      </div>
      <span className={styles.price} data-testid="sidebarItemPrice">
        {stringPrice}
      </span>
      <span
        onClick={() => dispatch(clearProduct(product))}
        data-testid="Clear Product"
      >
        X
      </span>
    </div>
  );
}
