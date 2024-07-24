import React from "react";
import ChatCard from "./ChatCard";
import InputMessage from "./InputMessage";

// eslint-disable-next-line no-undef
let socket = new WebSocket(import.meta.env.VITE_SOCKET_ENDPOINT);

console.log(import.meta.env.VITE_SOCKET_ENDPOINT);

function ChatScreen() {
	const [chatHistory, setChatHistory] = React.useState([]);
	const [userData, setUserData] = React.useState({
		username: "",
		message: "",
	});

	React.useEffect(() => {
		let usernameLs = localStorage.getItem("gochat-username");
		if (usernameLs) setUserData({ ...userData, username: usernameLs });
		connect((msg) => {
			let msgJson = JSON.parse(msg.data);

			setChatHistory((prev) => [...prev, { ...msgJson }]);
		});
	}, []);

	const connect = (sock) => {
		console.log("Attempting Connection...");
		socket.onopen = () => {
			console.log("Successfully Connected");
		};
		socket.onmessage = (msg) => {
			// console.log(msg);
			sock(msg);
		};
		socket.onclose = () => {
			// console.log("Socket Closed Connection: ", event);
			alert("Connection is closed");
		};
		socket.onerror = (error) => {
			console.log("Socket Error: ", error);
			alert("Failed to connect to the chat server");
		};
	};

	const handleSaveUsername = (e) => {
		e.preventDefault();
		console.log("save");
		localStorage.setItem("gochat-username", userData.username);
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!userData.username) {
			alert("Username is not provided");
			return;
		}

		let reqBody = {
			username: userData.username,
			message: userData.message,
			timestamp: new Date().getTime(),
		};

		socket.send(JSON.stringify(reqBody));
	};

	return (
		<React.Fragment>
			<div className="position-relative" style={{ maxHeight: "100lvh" }}>
				<header className="d-flex flex-wrap gap-2 justify-content-center py-3 mb-4 border-bottom">
					<input
						className="form-control fs-4 mb-3 mb-md-0 me-md-auto text-decoration-none bg-none"
						onChange={(e) =>
							setUserData((prev) => ({
								...prev,
								["username"]: e.target.value,
							}))
						}
						placeholder="Enter a username"
						value={userData.username}
					/>
					<button
						onClick={handleSaveUsername}
						className="btn btn-outline-secondary"
						id="button-addon2"
						style={{ width: "6rem" }}
					>
						<i className="bi bi-save margin-4"> Save</i>
					</button>
				</header>

				{/* show conversation */}
				<div
					className="d-flex flex-column gap-4 overflow-scroll"
					style={{ height: "70lvh", scrollbarWidth: "none" }}
				>
					{chatHistory.length > 0 ? (
						chatHistory.map((msg, index) => {
							let isCurrentUser = false;
							if (msg.type == 0) return;

							let msgBody = JSON.parse(msg.body);
							if (msgBody.username === userData.username)
								isCurrentUser = true;
							return (
								<ChatCard
									key={index}
									msg={msgBody}
									isCurrentUser={isCurrentUser}
								/>
							);
						})
					) : (
						<p>Chat is empty</p>
					)}
				</div>

				<hr />

				<form onSubmit={handleSendMessage} style={{ marginBlock: 30 }}>
					<InputMessage
						userData={userData}
						setUserData={setUserData}
					/>
				</form>
			</div>
		</React.Fragment>
	);
}

export default ChatScreen;
