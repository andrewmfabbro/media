import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// use async thunk to fetch users
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("https://json-server-vercel-pi-jet.vercel.app/users"); //"http://localhost:3005/users"

  //await pause(500); //DEV ONLY for loading spinner slows down loading intentionally
  return response.data;
});

//DEVELOPMENT ONLY!!!
/* const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}; */

export { fetchUsers };
