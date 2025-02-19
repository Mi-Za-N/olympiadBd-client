import React, { useEffect, useState,useContext } from "react";
import { Button } from 'antd';
import UserRoute from "../../../components/routes/UserRoute";
import AdminSliderCard from "../../../components/admin/AdminSliderCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";



const SliderIndex = () => {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    const getAllSliders = async () => {
        try {
          const {data} = await axios.get(`/api/all-sliders/1`);
           setSliders(data);
          
        } catch(error) {
          console.log(error);
        }
      };
      getAllSliders();
  }, []);



    const handleDeleteSlider = async (slug) => {
             try {
              if (window.confirm("Delete?")) {
              const { data } = await axios.delete(`/api/slider/delete/${slug}`);
               toast.success("slider deleted!");
              }
            } catch (err) {
               toast.error("Error when Deleted");
            }
      }

      const router =useRouter();

    const handleSlideCreate = () => {
        router.push("/admin/slider/createSlider");
    }

  return (
    <UserRoute>
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={handleSlideCreate}
        > Create Slide</Button>
        <div className="row">
            { sliders.map((slider) => (
              <div key={slider._id} className="col-md-10">
                <AdminSliderCard
                  slider={slider}
                  handleRemove={handleDeleteSlider}
                />
              </div>
            ))}
          </div>
       </UserRoute>
  );
};

export default SliderIndex;