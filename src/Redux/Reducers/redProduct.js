const initialState = {
    viewProduct: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  };
  const redProduct = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PRODUCT_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'GET_PRODUCT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_PRODUCT_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          viewProduct: action.payload.data.data.data,
        };


  {/* -----------------------------------------------------*/}

    case 'POST_PRODUCT_FULFILLED':
    console.log(action);
      const viewProduct = state.viewProduct
      viewProduct.push(action.payload.data.data[0])
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        viewProduct
      };

    default:
      return state;
  }
};

export default redProduct;
