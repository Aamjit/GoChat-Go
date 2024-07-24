import React from "react";

function ChatCard(props) {
	return (
		<React.Fragment>
			<div
				className={`card p-2 ${
					props.isCurrentUser
						? "text-end bg-primary text-white"
						: "text-start"
				}`}
			>
				<div className="card-header mt-0">{props.msg.username}</div>
				<div className="card-body">
					<blockquote className="blockquote mb-0">
						<p>{props.msg.message}</p>
						<footer
							className={`blockquote-footer ${
								props.isCurrentUser ? "text-light" : ""
							}`}
							style={{ fontSize: 12 }}
						>
							{/* sent at{" "} */}
							<cite title="Source Title">
								{new Date(+props.msg.timestamp).toUTCString()}
							</cite>
						</footer>
					</blockquote>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ChatCard;
