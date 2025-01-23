import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  token: Cookies.get('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set('token', action.payload.token, { expires: 0.0208 });
    },
    logout: (state) => {
      state.user = null;
      state.token = '';
      Cookies.remove('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
