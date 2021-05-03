import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.date.localCompare(b.date),
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter,
  reducers: {
    postUpdated(state, action) {},
    postsCleared: postsAdapter.removeAll,
  },
});

export default postsSlice.reducer