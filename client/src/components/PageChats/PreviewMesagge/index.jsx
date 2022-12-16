import React, { useState } from 'react';
import SearchBar from '../../SearchBar';
import CardPreviewMessage from '../CardPreviewMessage';
import logoMatch from '../../../assets/coheteHenry.png';
import styles from './index.module.css';

function PreviewMesagge({ title, messages, messagesGroup }) {
	const [isChat, setIsChat] = useState(true);
	return (
		<section className={styles.container_preview_message}>
			<SearchBar />
			<div
				className="flex rounded-md shadow-sm items-center justify-center my-5"
				role="group"
			>
				<button
					onClick={() => setIsChat(true)}
					type="button"
					className={`inline-flex items-center gap-3 py-2 px-4  ${
						isChat
							? 'text-black bg-amber-300 text-base font-semibold'
							: 'text-sm font-medium text-white bg-gray-900'
					}   rounded-l-lg border border-gray-900   dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
				>
					<i className="bi bi-chat-right-text-fill"></i>
					Chats
				</button>

				<button
					onClick={() => setIsChat(false)}
					type="button"
					className={`inline-flex items-center gap-3 py-2 px-4 ${
						!isChat
							? 'text-black bg-amber-300 text-base font-semibold'
							: 'text-sm font-medium text-white bg-gray-900'
					} rounded-r-md border border-gray-900 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`}
				>
					<img src={logoMatch} className={'w-6 h-6'} />
					Match
				</button>
			</div>
			<span className={styles.textMessagePreview}>{title}</span>
			<div className={styles.containerAllMessage}>
				{isChat
					? messages.length &&
					  messages.map((message, index) => (
							<CardPreviewMessage
								key={index}
								id={message.id}
								image={message.image}
								message={message.message}
								time={message.time}
								name={message.name}
							/>
					  ))
					: messagesGroup.length &&
					  messagesGroup.map((message, index) => (
							<CardPreviewMessage
								key={index}
								id={message.id}
								image={message.image}
								message={message.message}
								time={message.time}
								name={message.name}
							/>
					  ))}
			</div>
		</section>
	);
}

export default PreviewMesagge;
