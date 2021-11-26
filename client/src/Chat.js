import React, { useState, useEffect } from 'react';

const Chat = ({ socket, username, room }) => {
	const [currentMessage, setCurrentMessage] = useState('');
	const [messegeList, setMessageList] = useState([]);

	const sendMessage = async () => {
		if (currentMessage !== '') {
			const messageData = {
				room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			};

			await socket.emit('send_message', messageData);
			setMessageList(prev => [...prev, messageData]);
			setCurrentMessage('');
		}
	};

	useEffect(() => {
		socket.on('recieve_message', data => {
			setMessageList(prev => [...prev, data]);
		});
	}, [socket]);

	return (
		<div className='chat-window'>
			<div className='chat-header'>
				<p>Live Chat</p>{' '}
			</div>
			<div className='chat-body'>
				<div className="inner-body">
					{messegeList.map((message, index) => {
						return (
							<div
								key={index}
								className='message'
								id={username === message.author ? 'you' : 'other'}
							>
								<div>
									<div className='message-content'>
										<p>{message.message}</p>
									</div>
									<div className='message-meta'>
										<p id="time">{message.time}</p>
										<p id="author">{username === message.author ? 'you' : message.author}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='chat-footer'>
				<input
					type='text'
					placeholder='Hey..'
					value={currentMessage}
					onChange={e => setCurrentMessage(e.target.value)}
					onKeyPress={e => {e.key === 'Enter' && sendMessage()}}
				/>
				<button className='btn' onClick={sendMessage}>
					⌲
				</button>
			</div>
		</div>
	);
};

export default Chat;
