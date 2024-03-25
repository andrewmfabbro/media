/*
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://json-server-vercel-pi-jet.vercel.app/",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (results, error, album) => {
          const tags = results.map((photo) => {
            return {type: 'Photo', id: photo.id };
          });
          tags.push({ type: 'AlbumPhoto', id: album.id });
          return tags;
        } ,
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (results, error, album) => {
          return [{ type: 'AlbumPhoto', id: album.id }];
        },
        query: (album) => {
          return {
            method: "POST",
            url: "/photos",
            body: {
              albumId: album.id,
              url: faker.image.url(150, 150, true),
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
        query: (photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation,
} = photosApi;
export { photosApi };
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { kv } from '@vercel/kv'; // Import Vercel KV
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://media-five-psi.vercel.app/' }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (results, error, album) => {
          const tags = results?.map((photoId) => ({ type: 'Photo', id: photoId })) || [];
          tags.push({ type: 'AlbumPhoto', id: album.id });
          return tags;
        },
        queryFn: async (album) => {
          try {
            const photoIds = await kv.get(`album-photos:${album.id}`);
            const photos = await Promise.all(
              photoIds.map(async (id) => await kv.get(`photo:${id}`))
            );
            return { data: photos };
          } catch (error) {
            return { error: error };
          }
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (results, error, album) => {
          return [{ type: 'AlbumPhoto', id: album.id }];
        },
        queryFn: async (album) => {
          try {
            const newPhoto = {
              albumId: album.id,
              url: faker.image.imageUrl(150, 150, true),
            };
            const photoId = faker.datatype.uuid();
            await kv.set(`photo:${photoId}`, newPhoto);
            return { data: { id: photoId, ...newPhoto } };
          } catch (error) {
            return { error: error };
          }
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
        queryFn: async (photo) => {
          try {
            await kv.del(`photo:${photo.id}`);
            return { data: photo };
          } catch (error) {
            return { error: error };
          }
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
