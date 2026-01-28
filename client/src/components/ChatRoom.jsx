import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

export default function ChatRoom({ username, room }) {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [typingMsg, setTypingMsg] = useState("");

	const messageEndRef = useRef(null);

	console.log(username, room);

	const sendMessage = () => {
		if (message.trim()) {
			const messageData = {
				room,
				author: username,
				message,
				time: new Date().toLocaleTimeString(),
				id: crypto.randomUUID(),
			};
			socket.emit("send_message", messageData);
			setMessages((prev) => [...prev, messageData]);
			setMessage("");
		}
	};

	const handleTyping = () => {
		socket.emit("typing", { room, username });
	};

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		socket.emit("join_room", room);
		socket.on("receive_message", (data) => {
			setMessages((prev) => [...prev, data]);
		});

		socket.on("user_typing", (username) => {
			setTypingMsg(`${username} is typing...`);
			setTimeout(() => {
				setTypingMsg("");
			}, 2000);
		});

		return () => {
			socket.off("receive_message");
			socket.off("user_typing");
		};
	}, [room]);

	return (
		<div className="w-full max-w-2xl bg-white p-4 rounded shadow">
			<h2 className="text-xl font-bold mb-2">
				Room: {room}({username})
			</h2>
			<div className="h-64 overflow-y-auto border p-2 mb-2 bg-gray-50 rounded">
				{messages.map((msg) => (
					<div key={msg.id} className={`mb-1 ${msg.author === username ? "text-right" : "text-left}"}`}>
						<span className="font-semibold">{msg.author}: </span> {msg.message}
						<div className="text-xs text-gray-400">{msg.time}</div>
					</div>
				))}
				<div ref={messageEndRef} />
			</div>

			<p className="text-sm italic text-gray-500 mb-2">{typingMsg}</p>

			<div className="flex space-x-2">
				<input
					type="text"
					value={message}
					placeholder="Type a message..."
					onChange={(e) => {
						setMessage(e.target.value);
						handleTyping();
					}}
					onKeyDown={(e) => e.key === "Enter" && sendMessage()}
					className="flex-1 p-2 border rounded"
				/>
				<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={sendMessage}>
					Send
				</button>
			</div>
		</div>
	);
}

ChatRoom.propTypes = {
	username: PropTypes.string.isRequired,
	room: PropTypes.string.isRequired,
};
