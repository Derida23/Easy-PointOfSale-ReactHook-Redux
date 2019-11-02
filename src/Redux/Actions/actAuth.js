import axios from 'axios';

export const postRegister = (saveSign) => {
  return {
    type: 'POST_REGISTER',
    payload: axios.post ('http://localhost:3030/user/register', saveSign),
  };
};

export const postLogin = (saveLogin) => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post ('http://localhost:3030/user/login', saveLogin),
  };
};
