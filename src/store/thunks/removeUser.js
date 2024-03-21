/*
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  await axios.delete(`https://json-server-vercel-pi-jet.vercel.app/users/${user.id}`);

  
  return user;
});

export { removeUser };
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { kv } from '@vercel/kv'; // Import Vercel KV

// Use async thunk to remove a user
const removeUser = createAsyncThunk("users/remove", async (user) => {
  try {
    // Remove the user data associated with the user ID
    await kv.del(`user:${user.id}`);
    return user;
  } catch (error) {
    throw error;
  }
});

export { removeUser };
