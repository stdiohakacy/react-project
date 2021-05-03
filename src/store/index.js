import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/PostsSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
