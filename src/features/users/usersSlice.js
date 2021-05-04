import { client } from "../../api/client";
const { createEntityAdapter, createSlice } = require("@reduxjs/toolkit");

const usersAdapter = createEntityAdapter();
const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    usersLoaded: usersAdapter.setAll,
  },
});
const usersSelectors = usersAdapter.getSelectors((state) => state.users);

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectById: selectUserById,
} = usersSelectors;

export const { usersLoaded } = usersSlice.actions

export const fetchUsers = () => async (dispatch) => {
  const response = await client.get("/fakeApi/users");
  dispatch(usersLoaded(response.users));
};

export default usersSlice.reducer;
