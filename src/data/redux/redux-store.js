import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from "./counter/counter";
import { postsSlice } from './postSlice/postSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    posts: postsSlice.reducer
  },
})
