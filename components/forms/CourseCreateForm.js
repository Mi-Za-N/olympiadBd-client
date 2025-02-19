import { Select, Button, Avatar, Badge } from "antd";

const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove = (f) => f,
  editPage = false,
  cats,

  handleCatagoryChange,
  handleGroupChange,
  subOptions,
  showSub,
  groups
}) => {
// const {categories,subCategory } = values;
//  if (!cats || !subOptions) {
//    return 
//  } 



  return (
    <>
      {values && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{content:" *",color: "red",}}>Product Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={values.name }
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label style={{content:" *",color: "red",}}>Purchase Price</label>
            <input
              type="text"
              name="purchasePrice"
              className="form-control"
              placeholder="Purchase Price"
              value={values.purchasePrice}
              onChange={handleChange}
            />
          </div>
          
           <div className="form-group">
            <label style={{content:" *",color: "red",}}>Sale Price</label>
            <input
              type="text"
              name="salePrice"
              className="form-control"
              placeholder="Sale Price"
              value={values.salePrice}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label style={{content:" *",color: "red",}}>MRP Price</label>
            <input
              type="text"
              name="mrpPrice"
              className="form-control"
              placeholder="MRP Price"
              value={values.mrpPrice}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Barcode</label>
            <input
              type="text"
              name="barcode"
              className="form-control"
              placeholder="Barcode"
              value={values.barcode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label style={{content:" *",color: "red",}}>Unit/Amount/size</label>
            <input
              type="text"
              name="unit"
              className="form-control"
              placeholder="product specify"
              value={values.unit}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label style={{content:" *",color: "red",}}>count In Stock </label>
            <input
              type="text"
              name="quantity"
              className="form-control"
              placeholder="count In Stock"
              value={values.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <label>Featured</label>
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  value={values.isFeatured}
                  onChange={(v) => setValues({ ...values, isFeatured: v, })}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </div>
            </div>
          </div>
           <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Brand"
              value={values.brand}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              name="color"
              className="form-control"
              placeholder="color"
              value={values.color}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label style={{content:" *",color: "red",}}>Description</label>
            <textarea
              name="description"
              cols="7"
              rows="4"
              placeholder="Description"
              value={values.description}
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* <div className="form-group">
            <label style={{content:" *",color: "red",}}>Pick a Group</label>
            <select
                name="category"
                className="form-control"
                onChange={handleGroupChange}
              >
                <option>Please select</option>
                {groups &&
                  groups.map((g) => (
                    <option key={g._id} value={g._id}>
                      {g.name}
                    </option>
                  ))}
              </select>
          </div> */}

          <div className="form-group">
            <label style={{content:" *",color: "red",}}>Category</label>
           {editPage === true  ? (
             <select
              name="category"
              className="form-control"
              onChange={handleCatagoryChange}
            >
              <option>Please select</option>
              {cats &&
                cats.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
           ) : (
             <select
              name="category"
              className="form-control"
              onChange={handleCatagoryChange}
            >
              <option>Please select</option>
              {values.categories &&
                values.categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
           )}
          </div>

       {showSub && (
          <div>
            <label>Sub Categories only one</label>
            <Select
              mode="single"
              style={{ width: "100%" }}
              placeholder="Please select only one sub category"
              // value={subCategory}
              onChange={(value) => setValues({ ...values, subCategory: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}



          <div className="form-row">
            <div className="col">
              <div className="form-group">
                 <label style={{content:" *",color: "red",}}>Upload Image</label>
                <label className="btn btn-outline-secondary btn-block text-left">
                  {uploadButtonText}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>

            {preview && (
              <Badge count="X" onClick={handleImageRemove} className="pointer">
                <Avatar width={200} src={preview} />
              </Badge>
            )}

            {editPage && values.image && (
              <Avatar width={200} src={values.image.Location} />
            )}
          </div>

          <div className="row">
            <div className="col">
              <Button
                // disabled={!cats}
                onClick={handleSubmit}
                // disabled={values.loading || values.uploading}
                className="btn btn-primary"
                loading={values.loading}
                type="primary"
                size="large"
                shape="round"
              >
                {values.loading ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CourseCreateForm;


// import { Select, Button, Avatar, Badge } from "antd";

// const { Option } = Select;

// const CourseCreateForm = ({
//   handleSubmit,
//   handleImage,
//   handleChange,
//   values,
//   setValues,
//   preview,
//   uploadButtonText,
//   handleImageRemove = (f) => f,
//   editPage = false,
// }) => {
//   const children = [];
//   for (let i = 9.99; i <= 100.99; i++) {
//     children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
//   }
//   return (
//     <>
//       {values && (
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               placeholder="Name"
//               value={values.name}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <textarea
//               name="description"
//               cols="7"
//               rows="7"
//               value={values.description}
//               className="form-control"
//               onChange={handleChange}
//             ></textarea>
//           </div>

//           <div className="form-row">
//             <div className="col">
//               <div className="form-group">
//                 <Select
//                   style={{ width: "100%" }}
//                   size="large"
//                   value={values.paid}
//                   onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
//                 >
//                   <Option value={true}>Paid</Option>
//                   <Option value={false}>Free</Option>
//                 </Select>
//               </div>
//             </div>

//             {values.paid && (
//               <div className="form-group">
//                 <Select
//                   defaultValue="$9.99"
//                   style={{ widht: "100%" }}
//                   onChange={(v) => setValues({ ...values, price: v })}
//                   tokenSeparators={[,]}
//                   size="large"
//                 >
//                   {children}
//                 </Select>
//               </div>
//             )}
//           </div>

//           <div className="form-group">
//             <input
//               type="text"
//               name="category"
//               className="form-control"
//               placeholder="Category"
//               value={values.category}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-row">
//             <div className="col">
//               <div className="form-group">
//                 <label className="btn btn-outline-secondary btn-block text-left">
//                   {uploadButtonText}
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={handleImage}
//                     accept="image/*"
//                     hidden
//                   />
//                 </label>
//               </div>
//             </div>

//             {preview && (
//               <Badge count="X" onClick={handleImageRemove} className="pointer">
//                 <Avatar width={200} src={preview} />
//               </Badge>
//             )}

//             {editPage && values.image && (
//               <Avatar width={200} src={values.image.Location} />
//             )}
//           </div>

//           <div className="row">
//             <div className="col">
//               <Button
//                 onClick={handleSubmit}
//                 disabled={values.loading || values.uploading}
//                 className="btn btn-primary"
//                 loading={values.loading}
//                 type="primary"
//                 size="large"
//                 shape="round"
//               >
//                 {values.loading ? "Saving..." : "Save & Continue"}
//               </Button>
//             </div>
//           </div>
//         </form>
//       )}
//     </>
//   );
// };

// export default CourseCreateForm;
