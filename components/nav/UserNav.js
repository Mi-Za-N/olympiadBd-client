import { useState, useEffect,useContext } from "react";
import Link from "next/link";
import { Context } from "../../context";

const UserNav = () => {
  const [current, setCurrent] = useState("");
      const { state, dispatch } = useContext(Context);
      const { user } = state;

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">

    {user && user.role && user.role.includes("admin") ? (
        <>
      <Link href="/admin/slider">
        <a
          className={`nav-link ${
            current === "/admin/slider" && "active"
          }`}
        >
          Slider
        </a>
      </Link>
      <Link href="/admin/quiz">
        <a
          className={`nav-link ${
            current === "/admin/quiz" && "active"
          }`}
        >
          Quiz
        </a>
      </Link>

      
      </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserNav;