import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/globals.css";
export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
