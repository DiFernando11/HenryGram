import React from 'react';
import logoMatch from '../../../assets/coheteHenry.png';
import DropDownSelect from '../../DropDownSelect';
import SendMessage from '../../PageChats/SendMessage';

function Post({ isMatch, seguir, description, user, imagePost, postDetail }) {
	const image = imagePost?.filter((e) => e.url);
	console.log(image)
	return (
		<section
			className={`w-11/12  h-auto mt-6 m-auto relative pt-8 p-6 ${
				!postDetail && 'border border-amber-300'
			}  containerBackrougndImagePost `}
		>
			{isMatch && (
				<div className="absolute ml-6 top-0 left-0 mt-2 flex items-center gap-1">
					<span className=" text-xs ml-2">Match</span>
					<img src={logoMatch} alt="match" className="w-4 h-4" />
				</div>
			)}

			<div className="text-yellow-300 absolute top-1 right-0 mr-8  text-yellow">
				<DropDownSelect
					icon={'bi-three-dots'}
					select={[{ text: 'Delete Post', icon: 'bi-trash3-fill' }]}
				/>
			</div>
			<div className="border-t border-neutral-600 pt-4 flex gap-2.5 relative">
				<img
					className="w-10 h-10 rounded-full object-cover"
					src={user.avatar}
					alt={user.firstName}
				/>
				<span className="leading-10">{user.firstName}</span>
				{!seguir && (
					<span className="absolute top-0 right-0 mt-7 mr-11 text-sm cursor-pointer">
						+ Seguir
					</span>
				)}
			</div>
			<p className="my-5 text-white text-sm">{description}</p>
			{image?.length > 0 && (
				<img
					className="w-full h-[300px] object-cover"
					src={imagePost[0].url}
					alt="post user"
				/>
			)}
			{!postDetail && (
				<>
					<div className="flex gap-8 mt-5 mb-5 items-center border-y border-neutral-700 py-4">
						<i className="bi bi-hand-thumbs-up text-3xl text-yellow"></i>
						<i className="bi bi-chat-square-dots text-3xl text-yellow"></i>
						{isMatch === 'Match' && (
							<img src={logoMatch} alt="match" className="w-8 h-8" />
						)}
					</div>
					<SendMessage />
				</>
			)}
		</section>
	);
}

export default Post;
