import { apiSlice } from "app/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        authUser: builder.query({
            query: () => '/users/me',
            validateStatus: (response, result) => response.status === 200 && !result.isError,
        })
    })
})

export const { useLoginMutation, useAuthUserQuery } = authApiSlice