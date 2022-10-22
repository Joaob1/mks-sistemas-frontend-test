import { ReactElement, useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import cartIcon from "../../assets/cart_icon.svg";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import classnames from "classnames";
import { show } from "../../features/sidebarSlice";
import { totalPrice } from "../../features/cartSlice";

export default function Header(): ReactElement {
  const dispatch = useDispatch();
  const countItems = useSelector((state: RootState) => state.cart.countItems);
  const [itemAdd, setItemAdd] = useState(false);
  useEffect(() => {
    dispatch(totalPrice());
    if (!countItems) return;
    setItemAdd(true);
    setTimeout(() => {
      setItemAdd(false);
    }, 400);
  }, [countItems]);
  return (
    <header className={styles.header}>
      <div className={styles.logo} data-testid="logo">
        <h1 className={styles.logo_mks}>MKS</h1>
        <span className={styles.logo_sistemas}>Sistemas</span>
      </div>
      <div
        onClick={() => dispatch(show())}
        className={classnames(styles.cart, `${itemAdd && styles.itemAdd}`)}
        data-testid="cartDiv"
      >
        <Image src={cartIcon} alt="Cart Icon" width={19} height={18} />
        <span data-testid="countItems">{countItems}</span>
      </div>
    </header>
  );
}
