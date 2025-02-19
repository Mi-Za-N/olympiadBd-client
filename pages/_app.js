import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import { AppProvider } from '../context/app/app.provider';
import { CartProvider } from '../context/cart/use-cart';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <AppProvider>
         <CartProvider>
          <ToastContainer position="top-center" />
          <TopNav />
          <Component {...pageProps} />
         </CartProvider>
      </AppProvider>
    </Provider>
  );
}

export default MyApp;
