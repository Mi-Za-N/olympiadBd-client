import { useState,useEffect,useContext } from "react";
import axios from "axios";
import UserRoute from "../../../components/routes/UserRoute";
import SliderCreateForm from "../../../components/admin/SliderCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const SliderCreate = () => {
  // state 
  const [values, setValues] = useState({
    name: "",
    
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    // router
  const router = useRouter();


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // resize
    Resizer.imageFileResizer(file, 1500, 1500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post(`/api/slider/upload-image`, {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post(`/api/slider/upload-image`, { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.post(`/api/slider`, {
        ...values,
        image,
      });
      toast.success("Slider Added");
      router.push("/admin/slider");
    } catch (err) {
      console.log("err",err);
      toast(err.response.data);
    }
  };

  return (
    <>
    <br />
    <br />
    <UserRoute>
      <h4 style={{height:5}} className="jumbotron text-center square">Create Slider</h4>
      <div className="pt-3 pb-3">
        <SliderCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}

        />
      </div>
    </UserRoute>
    </>
  );
};

export default SliderCreate;