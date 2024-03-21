/*
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// use async thunk to fetch users
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("https://json-server-vercel-pi-jet.vercel.app/users");

  //await pause(500); //DEV ONLY for loading spinner slows down loading intentionally
  return response.data;
});

//DEVELOPMENT ONLY!!!
/* const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}; 

export { fetchUsers };
*/


import { createAsyncThunk } from "@reduxjs/toolkit";
import { kv } from '@vercel/kv'; // Import Vercel KV

// Use async thunk to fetch users
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  try {
    // Retrieve the list of user IDs from the KV store
    const userIds = await kv.get("user-ids");
    // Fetch each user using their ID
    const users = await Promise.all(
      userIds.map(async (id) => await kv.get(`user:${id}`))
    );
    return users;
  } catch (error) {
    throw error;
  }
});

export { fetchUsers };
