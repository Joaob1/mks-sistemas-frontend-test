import Image from "next/image";
import { ReactElement } from "react";
import Product from "../../schemas/Product";
import styles from "../../styles/CardProducts.module.css";
import shoppingBagIcon from "../../assets/shopping_bag.svg";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/cartSlice";
export default function CardProducts({
  product,
}: {
  product: Product;
}): ReactElement {
  const dispatch = useDispatch();
  const stringPrice: string = `R$${Number(product.price).toFixed(0)}`;
  return (
    <div className={styles.cardProduct}>
      <Image
        src={product.photo}
        alt={product.name}
        className={styles.image}
        width={111}
        height={138}
        objectFit={"none"}
      />
      <div>
        <h1 className={styles.name}>{product.name}</h1>
        <strong className={styles.price}>{stringPrice}</strong>
      </div>
      <h4 className={styles.description}>{product.description}</h4>
      <button
        className={styles.comprar}
        onClick={() => dispatch(addProduct(product))}
      >
        <Image src={shoppingBagIcon} alt="Comprar" />
        <span>COMPRAR</span>
      </button>
    </div>
  );
}
