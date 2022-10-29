import { useGetPostsForFeedQuery } from "./postsApiSlice";
import PostsExcerpt from "./PostsExcerpt";

const Feed = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsForFeedQuery('getPostsForFeed')

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>
    } else if (isSuccess) {
        content = posts.ids.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }

    return (
        <div className="feed-section">
            {content}
        </div >
    )

}

export default Feed