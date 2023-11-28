import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// use async thunk to fetch users
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  await pause(1000); //DEV ONLY for loading spinner

  return response.data;
});

//DEVELOPMENT ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
