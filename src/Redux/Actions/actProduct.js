import axios from 'axios';

export const getProduct = (content, page) => {
  const token = localStorage.getItem("jwt")
  return {
    type: 'GET_PRODUCT',
    payload: axios.get('https://pixos-api.herokuapp.com/product/',{
      headers: {
        "x-access-token":token
      },
        params: {
          content,
          page
        }
      })
  };
};

export const postProduct = (saveProduct) => {
  const token = localStorage.getItem("jwt")
  return {
    type: 'POST_PRODUCT',
    payload: axios.post('https://pixos-api.herokuapp.com/product/', saveProduct, {
      headers: {
        "x-access-token":token
      },
    }),
  };
};
