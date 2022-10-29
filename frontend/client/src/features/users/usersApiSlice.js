import { apiSlice } from "app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 5,
            validateStatus: (response, result) => response.status === 200 && !result.isError
        })
    })
})

export const { useGetUsersQuery } = usersApiSlice