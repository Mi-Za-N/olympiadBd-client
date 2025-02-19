import { useState, useEffect,useContext } from "react";
import Link from "next/link";
import { Context } from "../../context";

const SubscriberNav = () => {
  const [current, setCurrent] = useState("");
      const { state, dispatch } = useContext(Context);
      const { user } = state;
      // console.log("user",user);


  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/subscriber/SalePOS/home">
        <a className={`nav-link ${current === "/subscriber/SalePOS/home" && "active"}`}>
          Sale POS
        </a>
      </Link>
      {user && user.isProducts ===true ? (
        <Link href="/subscriber">
          <a className={`nav-link ${current === "/subscriber" && "active"}`}>
            Your Products
          </a>
        </Link>
      ) : (
          <></>
        )}
      
      {user && user.isAdd ===true ? (
      <Link href="/subscriber/product/create">
        <a
          className={`nav-link ${
            current === "/subscriber/product/create" && "active"
          }`}
        >
          Add Product
        </a>
      </Link>
      ) : (
          <></>
        )}

      <Link href="/subscriber/track">
        <a
          className={`nav-link ${
            current === "/subscriber/track" && "active"
          }`}
        >
          Business status
        </a>
      </Link>
      {user && user.isPurchase ===true ? (
      <Link href="/subscriber/PurchasePOS/home">
        <a
          className={`nav-link ${
            current === "/subscriber/PurchasePOS/home" && "active"
          }`}
        >
          Purchase POS
        </a>
      </Link>
      ) : (
          <></>
        )}

        <Link href="/subscriber/marketplace">
        <a
          className={`nav-link ${
            current === "/subscriber/marketplace" && "active"
          }`}
        >
          Join Marketplace
        </a>
      </Link>
       <Link href="/subscriber/SubscriberCategory">
        <a
          className={`nav-link ${
            current === "/subscriber/SubscriberCategory" && "active"
          }`}
        >
          Category
        </a>
      </Link>
             <Link href="/subscriber/subscribersubcate">
        <a
          className={`nav-link ${
            current === "/subscriber/subscribersubcate" && "active"
          }`}
        >
         Create Sub Category
        </a>
      </Link>
    </div>
  );
};

export default SubscriberNav;
