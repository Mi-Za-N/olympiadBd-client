import React, { useRef, useState } from 'react';
import { Input, Button, Divider } from 'antd';
import { useReactToPrint } from 'react-to-print';
import BarcodePrint from './BarcodePrint';
import { toast } from "react-toastify";


const pageStyle=`
  @page {
    size:30mm 20mm
  };
  @media a11 {
   .pageBreak { 
     display: none
    }
  };
  @media print {
     .pageBreak {
      page-break-before:always;
     }
  }
   
`

const BarcodePrintButton = () => {
  const [barcodes, setBarcodes] = useState([]);
  const [newBarcode, setNewBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    
  });

  const addBarcode = () => {
    if (newBarcode && productName && productPrice) {
      setBarcodes([...barcodes, { barcode: newBarcode, title: productName, price: productPrice }]);
      setNewBarcode('');
      setProductName('');
      setProductPrice('');
    } else {
      if (!newBarcode) toast.error('Please enter a barcode');
      if (!productName) toast.error('Please enter a product name');
      if (!productPrice) toast.error('Please enter a product price');

    }
  };

  return (
    <>
     
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: 10 }}>
        <Input
          type="text"
          placeholder="Enter Barcode"
          value={newBarcode}
          onChange={(e) => setNewBarcode(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Product Title"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <Button type="primary" onClick={addBarcode}>Add Barcode</Button>
        <Button type="primary" onClick={handlePrint}>Print Barcodes</Button>
      </div>
      <Divider style={{ borderColor: '#0b0a40', margin: '8px 20px' }} />
      <BarcodePrint ref={componentRef} barcodes={barcodes} />
    </>
  );
};

export default BarcodePrintButton;












// import React, { useRef, useState } from 'react';
// import { Input, Button,Divider } from 'antd';
// import { useReactToPrint } from 'react-to-print';
// import BarcodePrint from './BarcodePrint';




// const BarcodePrintButton = () => {
//   const [barcodes, setBarcodes] = useState([]);
//   const [newBarcode, setNewBarcode] = useState('');
//    const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   const addBarcode = () => {
//     if (newBarcode,productName,productPrice) {
//       setBarcodes([...barcodes, { barcode: newBarcode, title: productName, price: productPrice }]);
//       setNewBarcode("");
//       setProductName("");
//       setProductPrice("");
//     } 
//   };

//   return (
//     < >
//     <div style={{display:"flex",justifyContent:"space-around",padding:10}}>
//       <input
//         type="text"
//         placeholder="Enter Barcode"
//         value={newBarcode}
//         onChange={(e) => setNewBarcode(e.target.value)}
//       />
//       <input
//           type="text"
//           placeholder="Product Title"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Product Price"
//           value={productPrice}
//           onChange={(e) => setProductPrice(e.target.value)}
//         />
//       <Button type="primary" onClick={addBarcode}>Add Barcode</Button>
//       <Button type="primary" onClick={handlePrint}>Print Barcodes</Button>
//       </div>
//       <Divider style={{ borderColor: "#0b0a40",margin: '8px 20px' }} />
//       <BarcodePrint ref={componentRef} barcodes={barcodes} />
//     </>
//   );
// };

// export default BarcodePrintButton;
