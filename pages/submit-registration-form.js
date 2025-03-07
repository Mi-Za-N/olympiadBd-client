import React, { useState } from "react";
import { Card, Input, Button, Checkbox, Typography, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const DigitalWalletForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", trxnId: "", description: "" });
  const [checkedFields, setCheckedFields] = useState({ name: false, email: false, mobile: false, trxnId: false });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Validation logic
    let isValid = true;
    switch (field) {
      case "name":
        isValid = value.trim().length >= 3;
        break;
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
        break;
      case "mobile":
        isValid = /^\d{11}$/.test(value.trim());
        break;
      case "trxnId":
        isValid = value.trim().length > 4;
        break;
      default:
        break;
    }

    setCheckedFields({ ...checkedFields, [field]: isValid });
    setFormErrors({ ...formErrors, [field]: isValid ? "" : `Invalid ${field}` });
  };

  const wallets = [
    { name: "Bkash", logo: "✅", number: "0788-595619" },
    { name: "Bkash", logo: "✅", number: "01306-296138" },
    { name: "Nagad", logo: "✅", number: "01788-595619" },
  ];

  const handleSubmit = async () => {
    const isFormValid = Object.values(checkedFields).every((field) => field);
    if (isFormValid) {
      try {
        const { data } = await axios.post(`/api/submit-form`, { ...formData });
        message.success("Form submitted successfully!");

        // Clear form fields after successful submission
        setFormData({ name: "", email: "", mobile: "", trxnId: "", description: "" });
        setCheckedFields({ name: false, email: false, mobile: false, trxnId: false });
        setFormErrors({});
      } catch (err) {
        console.log("err", err);
        message.error("Failed to submit form. Please try again.");
      }
    } else {
      message.error("Please fill out all fields correctly.");
    }
  };

  const isSubmitDisabled = !Object.values(checkedFields).every((field) => field);

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: "16px" }}>
      {/* Digital Wallet Card */}
      <Card title="Send Money" style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {wallets.map((wallet) => (
            <div key={wallet.number} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Text style={{ fontSize: "16px" }}>{wallet.logo}</Text>
              <Text strong>{wallet.name}</Text>
              <Text>{wallet.number}</Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Input Fields Card */}
      <Card title="Registration Process" bordered>
        <Title level={5}><Checkbox checked={checkedFields.name}> Name (Min 3 characters)</Checkbox></Title>
        <Input
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          status={formErrors.name ? "error" : ""}
        />
        {formErrors.name && <Text type="danger">{formErrors.name}</Text>}

        <Title level={5} style={{ marginTop: "5px" }}><Checkbox checked={checkedFields.email}> Enter valid Email</Checkbox></Title>
        <Input
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          status={formErrors.email ? "error" : ""}
        />
        {formErrors.email && <Text type="danger">{formErrors.email}</Text>}

        <Title level={5} style={{ marginTop: "5px" }}><Checkbox checked={checkedFields.mobile}>Mobile No </Checkbox></Title>
        <Input
          placeholder="Enter your mobile number"
          value={formData.mobile}
          onChange={(e) => handleInputChange("mobile", e.target.value)}
          status={formErrors.mobile ? "error" : ""}
        />
        {formErrors.mobile && <Text type="danger">{formErrors.mobile}</Text>}

        <Title level={5} style={{ marginTop: "5px" }}><Checkbox checked={checkedFields.trxnId}>Transaction ID(copy & paste here)</Checkbox></Title>
        <Input
          placeholder="Enter Bkash Or Nagad TrxnID"
          value={formData.trxnId}
          onChange={(e) => handleInputChange("trxnId", e.target.value)}
          status={formErrors.trxnId ? "error" : ""}
        />
        {formErrors.trxnId && <Text type="danger">{formErrors.trxnId}</Text>}

        <Title level={5} style={{ marginTop: "5px" }}>Your School Name (optional)</Title>
        <Input.TextArea
          rows={3}
          placeholder="Enter Your School Name"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </Card>

      {/* Submit Button */}
      <Button type="primary" block style={{ marginTop: "16px" }} onClick={handleSubmit} disabled={isSubmitDisabled}>
        Submit
      </Button>
    </div>
  );
};

export default DigitalWalletForm;





// import React, { useState } from "react";
// import { Card, Input, Button, Checkbox, Typography, message } from "antd";
// import axios from "axios";


// const { Title, Text } = Typography;

// const DigitalWalletForm = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", mobile: "", trxnId: "", description: "" });
//   const [checkedFields, setCheckedFields] = useState({ name: false, email: false, mobile: false, trxnId: false });
//   const [formErrors, setFormErrors] = useState({});

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });

//     // Validation logic
//     let isValid = true;
//     switch (field) {
//       case "name":
//         isValid = value.trim().length >= 3;
//         break;
//       case "email":
//         isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
//         break;
//       case "mobile":
//         isValid = /^\d{11}$/.test(value.trim());
//         break;
//       case "trxnId":
//         isValid = value.trim().length > 4;
//         break;
//       default:
//         break;
//     }

//     setCheckedFields({ ...checkedFields, [field]: isValid });
//     setFormErrors({ ...formErrors, [field]: isValid ? "" : `Invalid ${field}` });
//   };

//   const wallets = [
//     { name: "Bkash", logo: "✅", number: "0788-595619" },
//     { name: "Bkash", logo: "✅", number: "01306-296138" },
//     { name: "Nagad", logo: "✅", number: "01788-595619" },
//   ];

//   const handleSubmit = async() => {
//     // console.log("formData",formData);
//     const isFormValid = Object.values(checkedFields).every((field) => field);
//     if (isFormValid) {
//     try {
//       const { data } = await axios.post(`/api/submit-form`, {...formData});
//       message.success("Form submitted successfully!");
//     } catch (err) {
//       console.log("err",err);
//     }
      
//     } else {
//       message.error("Please fill out all fields correctly.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "auto", padding: "16px" }}>
//       {/* Digital Wallet Card */}
//       <Card title="Send Money" style={{ marginBottom: "16px" }}>
//         <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//           {wallets.map((wallet) => (
//             <div key={wallet.number} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <Text style={{ fontSize: "16px" }}>{wallet.logo}</Text>
//               <Text strong>{wallet.name}</Text>
//               <Text>{wallet.number}</Text>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Input Fields Card */}
//       <Card title="Registration Process" bordered>
//         <Title level={5}>Name</Title>
//         <Input
//           placeholder="Enter your name"
//           value={formData.name}
//           onChange={(e) => handleInputChange("name", e.target.value)}
//           status={formErrors.name ? "error" : ""}
//         />
//         {formErrors.name && <Text type="danger">{formErrors.name}</Text>}

//         <Title level={5} style={{ marginTop: "12px" }}>Email</Title>
//         <Input
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={(e) => handleInputChange("email", e.target.value)}
//           status={formErrors.email ? "error" : ""}
//         />
//         {formErrors.email && <Text type="danger">{formErrors.email}</Text>}

//         <Title level={5} style={{ marginTop: "12px" }}>Mobile No</Title>
//         <Input
//           placeholder="Enter your mobile number"
//           value={formData.mobile}
//           onChange={(e) => handleInputChange("mobile", e.target.value)}
//           status={formErrors.mobile ? "error" : ""}
//         />
//         {formErrors.mobile && <Text type="danger">{formErrors.mobile}</Text>}

//         <Title level={5} style={{ marginTop: "12px" }}>Transaction ID (Copy & Paste Here)</Title>
//         <Input
//           placeholder="Enter Bkash Or Nagad TrxnID"
//           value={formData.trxnId}
//           onChange={(e) => handleInputChange("trxnId", e.target.value)}
//           status={formErrors.trxnId ? "error" : ""}
//         />
//         {formErrors.trxnId && <Text type="danger">{formErrors.trxnId}</Text>}

//         <Title level={5} style={{ marginTop: "12px" }}>School Name</Title>
//         <Input.TextArea
//           rows={3}
//           placeholder="Enter Your School Name"
//           value={formData.description}
//           onChange={(e) => handleInputChange("description", e.target.value)}
//         />

//         {/* Instructions Card */}
//         <Card style={{ marginTop: "16px" }} bordered>
//           <Checkbox checked={checkedFields.name}> Name (Min 3 characters)</Checkbox>
//           <Checkbox checked={checkedFields.email}> Enter valid Email</Checkbox>
//           <Checkbox checked={checkedFields.mobile}>Mobile No (11 digits)</Checkbox>
//           <Checkbox checked={checkedFields.trxnId}>Transaction ID</Checkbox>
//         </Card>
//       </Card>

//       {/* Submit Button */}
//       <Button type="primary" block style={{ marginTop: "16px" }} onClick={handleSubmit}>
//         Submit
//       </Button>
//     </div>
//   );
// };

// export default DigitalWalletForm;