import React, { Component } from 'react';
import BarcodeComponent from './BarcodeComponent';

class BarcodePrint extends Component {
  render() {
    const { barcodes } = this.props;


    return (
       <div style={{display: "flex", flexDirection: "column", alignItems: "center",}}>
        {barcodes.map((data, index) => (
          <BarcodeComponent
            key={index}
            data={data}
          />
        ))}
      </div>
    );
  }
}

export default BarcodePrint;




// import React, { Component } from 'react';
// import BarcodeComponent from './BarcodeComponent';

// class BarcodePrint extends Component {
//   render() {
//     const { barcodes } = this.props;

//     const printableStyle = {
//       width: "100%", // Make sure it occupies the full width of the printing area
//       minHeight: '20mm', // Set minimum height to 20mm
//       maxHeight: '82mm', // Set maximum height to 82mm
//       overflow: 'hidden', // Hide overflow if the barcode exceeds the defined height
//     };

//     return (
//        <div style={{display: "flex",flexWrap: "wrap",gap: 20}}>
//         {barcodes.map((data, index) => (
//           <BarcodeComponent style={printableStyle} key={index} data={data} />
//         ))}
//       </div>
//     );
//   }
// }

// export default BarcodePrint;
