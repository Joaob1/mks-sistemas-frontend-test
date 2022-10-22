import { ReactElement } from "react";
import styles from "../../styles/Footer.module.css";
export default function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <span>MKS sistemas © Todos os direitos reservados</span>
    </footer>
  );
}
