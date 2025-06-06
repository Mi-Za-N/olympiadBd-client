import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import SubscriberNav from "../nav/SubscriberNav";

const SubscriberRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchSubscriber();
  }, []);

  const fetchSubscriber = async () => {
    try {
      const { data } = await axios.get("/api/current-subscriber");
      console.log("Subscriber ROUTE => ", data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <SubscriberNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriberRoute;
