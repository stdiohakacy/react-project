import { client } from "../../api/client";

const {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} = require("@reduxjs/toolkit");

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

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await client.post("fakeApi/posts", { post: initialPost });
    return response.post;
  }
);

export default postsSlice.reducer;
