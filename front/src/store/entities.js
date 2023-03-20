import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import omit from "lodash/fp/omit";

const entitiesApi = createApi({
  reducerPath: "entitiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/entities" }),
  endpoints: (builder) => ({
    list: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "entities", id })),
            { type: "entities", id: "list" },
          ];
        }
        return [{ type: "entities", id: "list" }];
      },
    }),
    create: builder.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
      providesTags: (result) => {
        if (result) {
          const { id } = result;
          return [{ type: "entities", id }];
        }
      },
      invalidatesTags: [{ type: "entities", id: "list" }],
    }),
    read: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result) => {
        if (result) {
          const { id } = result;
          return [{ type: "entities", id }];
        }
        return [];
      },
      invalidatesTags: (result, error, { id }) => [{ type: "entities", id }],
    }),
    update: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: omit(["id", "created_at", "updated_at"], data),
      }),
      providesTags: (result) => {
        if (result) {
          const { id } = result;
          return [{ type: "entities", id }];
        }
        return [];
      },
      invalidatesTags: (result, error, { id }) => [{ type: "entities", id }],
    }),

    delete: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "entities", id: "list" },
      ],
    }),
  }),
});

export default entitiesApi;
