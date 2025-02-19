export const initialState = {
  allProductInfo: [],
  allBills:[],
  platformBills:[],
  showProductInfo: [],
  orderInfo: [],
};


export function appReducer(state, action) {
  // console.log(action.payload);
  switch (action.type) {

    case 'SAVE_PRODUCT_INFO':
      return {
        ...state,
        allProductInfo: action.payload,
        showProductInfo: action.payload,
        // showProductInfo: action.payload.filter(sp => sp.isFeatured === true),
      };

    case 'SAME_TYPE_PRODUCTS_INFO':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(p => p.category === action.payload),
      };
    case 'SUBTYPE_PRODUCTS_INFO':
      return {
        
        ...state,
        showProductInfo: state.allProductInfo.filter(p =>p.subCategory === action.payload),
      };
    case 'SAVE_BILL_INFO':
      return {
        ...state,
        allBills: action.payload,
      };
     
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(pP => pP.name.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case 'SET_BARCODE_TERM':
      return {
        ...state,
        showProductInfo: state.allProductInfo.filter(pP => pP.barcode.includes(action.payload.toLowerCase())),
      };
      case 'TOGGLE_SEARCH':
      return {
        ...state,
        isClickOnSearch: !state.isClickOnSearch,
      };
    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
