import { apiSlice } from "app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";


const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPostsForFeed: builder.query({
            query: () => '/feed',
            keepUnusedDataFor: 5,
            validateStatus: (response, result) => response.status === 200 && !result.isError,
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    return post
                })
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, args) => [
                { type: 'Post', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: { ...initialPost }
            }),
            invalidatesTags: [
                { type: 'Post', id: 'LIST' }
            ]
        }),
        postLike: builder.mutation({
            query: ({ postId, action }) => ({
                url: '/post-like',
                method: 'POST',
                body: { postId, action }
            }),
            async onQueryStarted({ postId, like_count, liked_by_req_user }, { dispatch, queryFulfilled }) {
                const postResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPostsForFeed', 'getPostsForFeed', draft => {
                        const post = draft.entities[postId]
                        if (post) {
                            post.like_count = like_count;
                            post.liked_by_req_user = liked_by_req_user
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    postResult.undo()
                }
            }
        })
        

    })
})

export const { 
    useGetPostsForFeedQuery,
    usePostLikeMutation,
    useAddNewPostMutation } = extendedApiSlice