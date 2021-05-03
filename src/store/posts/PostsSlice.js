import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { client } from "../../api/client";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = client.get("fakeApi/posts");
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "/fakeApi/posts",
  async (initialPost) => {
    const response = await client.post("/fakeApi/posts", {
      post: initialPost,
    });
    return response.post;
  }
);

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.date.localCompare(b.date),
});

export const {
  selectAll: selectAllPosts,
  selectIds: selectPostIds,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state) => state.posts);

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {
    postUpdated(state, action) {
      const { id, content, title } = action.payload;
      postsAdapter.updateOne(state, { id, changes: { title, content } });
    },
    postsCleared: postsAdapter.removeAll,
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) existingPost.reactions[reaction]++;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      (state.status = "loading"), (state.error = null);
    },
    [fetchPosts.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        postsAdapter.upsertMany(state, action);
        state.status = "succeeded";
      }
    },
    [fetchPosts.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
    [addNewPost.fulfilled]: postsAdapter.addOne,
  },
});

export default postsSlice.reducer;

export const {
  postsLoaded,
  postUpdated,
  reactionAdded,
  postsCleared,
} = postsSlice.actions;

export const reloadAllPosts = () => async (dispatch) => {
  dispatch(postsCleared());
  dispatch(fetchPosts());
};
