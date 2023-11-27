import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// use async thunk to fetch users
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  return response.data;
});

export { fetchUsers };
