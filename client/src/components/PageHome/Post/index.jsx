import React from 'react';
import logoMatch from '../../../assets/coheteHenry.png';
import DropDownSelect from '../../DropDownSelect';
import SendMessage from '../../PageChats/SendMessage';
import MyMenu from './MyMenu';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

function Post({
	isMatch,
	seguir,
	description,
	user,
	imagePost,
	postId,
	postDetail,
	userIdLogged,
}) {
	// const image = imagePost?.filter((e) => e.url);
	const location = useLocation();

	// console.log(window.matchMedia('(prefers-color-scheme: dark)'))

	return (
		<section
			className={`w-11/12  h-auto mt-6 m-auto relative pt-8 p-6 
			${ !postDetail && 'border border-amber-300' } containerBackrougndImagePost rounded shadow-md shadow-black` }
		>
			{isMatch && (
				<div className="absolute ml-6 top-0 left-0 mt-2 flex items-center gap-1">
					<span className=" text-xs ml-2">Match</span>
					<img src={logoMatch} alt="match" className="w-4 h-4" />
				</div>
			)}

			<div className="text-yellow-300 absolute top-1 right-0 mr-8  text-yellow">
				{userIdLogged?._id === user._id || location.pathname === '/profile' ? (
					<MyMenu postId={postId} />
				) : null}
			</div>
			<div className="border-t border-neutral-600 pt-4 flex gap-2.5 relative">
				<img
					className="w-10 h-10 rounded-full object-cover"
					src={user.avatar}
					alt={user.firstName}
				/>
				<Link to={`/profile/${user._id}`}>
					<span className="leading-10">{user.firstName}</span>
				</Link>
				{!seguir && (
					<span className="absolute top-0 right-0 mt-7  text-sm cursor-pointer">
						+ Seguir
					</span>
				)}
			</div>
			<p className="my-5 text-white text-sm">{description}</p>
			<div className="grid grid-flow-col auto-cols-[minmax(0,_2fr)] gap-2 items-center bg-transparent">
				{imagePost &&
					imagePost.map((image) => {
						if (!image.hasOwnProperty('url')) return;
						return (
							<img
								key={image.url}
								className="w-full h-[150px] sm:h-[300px] object-cover"
								src={image.url}
								alt="post user"
							/>
						);
					})}
			</div>

			{!postDetail && (
				<>
					<div className="flex gap-8 mt-5 mb-5 items-center border-y border-neutral-700 py-4">
						<i className="bi bi-hand-thumbs-up text-2xl sm:text-3xl text-yellow"></i>
						<i className="bi bi-chat-square-dots text-2xl sm:text-3xl text-yellow"></i>
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
