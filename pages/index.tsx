import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Home() {
  const sideBar = useSelector((state: RootState) => state.sidebar);
  return (
    <>
      <Head>
        <title>MKS Sistemas</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Products />
        </main>
        {sideBar.view ? <Sidebar /> : ""}
      </div>
      <Footer />
    </>
  );
}
