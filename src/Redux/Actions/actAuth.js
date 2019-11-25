import axios from 'axios';

export const postRegister = (saveSign) => {
  return {
    type: 'POST_REGISTER',
    payload: axios.post('https://pixos-api.herokuapp.com/register', saveSign),
  };
};

export const postLogin = (saveLogin) => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post('https://pixos-api.herokuapp.com//login', saveLogin),
  };
};
