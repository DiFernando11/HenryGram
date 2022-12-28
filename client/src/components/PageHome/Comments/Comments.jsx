import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postComment } from '../../../redux/actions';
function Comments({ postId }) {
    const dispatch = useDispatch()
	const userId = useSelector((state) => state.userInformation?._id);
	const [comment, setComment] = useState({
		postId: '',
		userId: '',
		description: '',
	});
    const handleChange = (e) => {
        setComment({
            postId: postId,
            userId: userId,
            description: e.target.value
        })
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(postComment(comment))
        setComment({
            ...comment,
            description: ''
        })
    }
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Comment..."
				className="w-full bg-black text-white font-sans border border-gray rounded-md py-2 pl-9 pr-3 shadow-sm transition-all duration:200 focus:outline-none focus:border-white focus:ring-white focus:ring-1 sm:text-sm"
                name="description"
                value={comment.description}
                onChange={handleChange}
			/>
		</form>
	);
}

export default Comments;
