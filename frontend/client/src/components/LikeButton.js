import React from 'react'
import { usePostLikeMutation } from 'features/posts/postsApiSlice'
import { FaHeart } from 'react-icons/fa'

const LikeButton = ({ post }) => {
  const [postLike] = usePostLikeMutation()
  const color = post.liked_by_req_user ? '#e2336b' : '#282a34'
  const action = post.liked_by_req_user ? 'unlike' : 'like'
  const newValue = action === 'like' ? post.like_count +1 : post.like_count -1; 
  return (
    <div className='like'>
      <button className='like-button' type='button' onClick={() => {
        postLike({ postId: post.id, action: action, like_count: newValue, liked_by_req_user: (!post.liked_by_req_user) })
      }}>
        <FaHeart color={color} />
      </button>
      <span>{post.like_count}</span>
    </div>
  )
}

export default LikeButton