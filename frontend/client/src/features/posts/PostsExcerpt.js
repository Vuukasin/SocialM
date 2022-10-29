import { useGetPostsForFeedQuery } from "./postsApiSlice";
import { FaRegComment } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsSuitHeartFill } from 'react-icons/bs' 
import { FaHeart } from 'react-icons/fa'
import LikeButton from "components/LikeButton";



const PostsExcerpt = ({ postId }) => {
    const { post } = useGetPostsForFeedQuery('getPostsForFeed', {
        selectFromResult: ({ data }) => ({
            post: data?.entities[postId]
        })
    })

    return (
        <div className={`post-card card-size-${post.image_size}`}>
            <div className="post-subcard">
                <div className="post-image-container">
                    <img src={post.content} className="post-image" alt="asdasd" />
                </div>
                <div className="post-info">
                    <div className="post-owner">
                        <div className="post-profile-photo-container">
                            <img src={post.user.avatar} className="post-profile-photo" alt="" />
                        </div>
                        <span>{post.user.username}</span>
                    </div>
                    <div className="like-comment">
                        <LikeButton post={post} />
                        <div className="comment">
                            <FaRegComment />
                            <span>{post.comment_count}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostsExcerpt