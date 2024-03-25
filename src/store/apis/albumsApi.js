/*
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://json-server-vercel-pi-jet.vercel.app/",
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) =>{
          console.log(album);
          return [{type: "Album", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
      addAlbum: builder.mutation({
        //tag system
        invalidatesTags: (result, error, user) => {
          return [{ type: "UsersAlbums", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        //tag system
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: 'Album', id: album.id };
          });
          tags.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { kv } from '@vercel/kv'; // Import Vercel KV
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://media-five-psi.vercel.app/' }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          console.log(album);
          return [{ type: "Album", id: album.id }];
        },
        queryFn: async (album) => {
          try {
            await kv.del(`album:${album.id}`);
            return { data: album };
          } catch (error) {
            return { error: error };
          }
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "UsersAlbums", id: user.id }];
        },
        queryFn: async (user) => {
          const newAlbum = {
            userId: user.id,
            title: faker.commerce.productName(),
          };
          try {
            const albumId = faker.datatype.uuid(); // Generate a unique ID for the album
            await kv.set(`album:${albumId}`, newAlbum);
            return { data: { id: albumId, ...newAlbum } };
          } catch (error) {
            return { error: error };
          }
        },
      }),
      // ... other endpoints ...
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          // Assuming result is an array of album IDs
          const tags = result?.map((albumId) => ({ type: 'Album', id: albumId })) || [];
          tags.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        },
        queryFn: async (user) => {
          try {
            // Retrieve the list of album IDs for the user
            const albumIds = await kv.get(`user-albums:${user.id}`);
            // Fetch each album using its ID
            const albums = await Promise.all(
              albumIds.map(async (id) => await kv.get(`album:${id}`))
            );
            return { data: albums };
          } catch (error) {
            return { error: error };
          }
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
