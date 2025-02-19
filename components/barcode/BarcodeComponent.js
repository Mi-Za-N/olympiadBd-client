import React from 'react';
import Barcode from 'react-barcode';
import { Card } from 'antd';


const BarcodeComponent = ({ data }) => {
  return (
    <>
    <style>
        {`
            @page {
                size:38mm 25mm
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
        `}
      </style>
      <Card title={<span style={{fontSize: '22px',fontWeight:"bold", color:"Black",display: 'flex', justifyContent: 'center', }}>{data.title}</span>}>
      <div style={{fontSize:18,fontWeight:"400", color:"Black",display: 'flex', justifyContent: 'center',  }}>
        <p ><strong >MRP:</strong> {data.price}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center',height:65, color:"Black" }}>
        <Barcode value={data.barcode} width={1} height={40} />
      </div>
    </Card>
    </>
    
  );
};

export default BarcodeComponent;
