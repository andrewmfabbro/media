/*
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("https://json-server-vercel-pi-jet.vercel.app/users", {
    name: faker.name.fullName(),
  });

  return response.data;
});

export { addUser };
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { kv } from '@vercel/kv'; // Import Vercel KV
import { faker } from "@faker-js/faker";

// Use async thunk to add a user
const addUser = createAsyncThunk("users/add", async () => {
  try {
    // Create a new user object with a unique ID
    const newUser = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
    };
    // Store the user data in the KV database
    await kv.set(`user:${newUser.id}`, newUser);
    return newUser;
  } catch (error) {
    throw error;
  }
});

export { addUser };
