import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  await axios.delete(`https://json-server-vercel-pi-jet.vercel.app/users/${user.id}`);

  
  return user;
});

export { removeUser };
