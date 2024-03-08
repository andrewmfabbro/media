import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  await axios.delete(`https://my-json-server.typicode.com/andrewmfabbro/dummyJSON/users/${user.id}`);

  
  return user;
});

export { removeUser };
