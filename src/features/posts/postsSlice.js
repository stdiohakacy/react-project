const { createEntityAdapter, createSlice } = require("@reduxjs/toolkit");

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {
    postUpdated(state, action) {},
    postsCleared: postsAdapter.removeAll,
    reactionAdded(state, action) {},
  },
});

export default postsSlice.reducer;
