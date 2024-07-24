import React from "react";
import PropTypes from "prop-types";

function InputMessage(props) {
	return (
		<React.Fragment>
			<div className="input-group">
				<textarea
					type="text"
					className="form-control"
					placeholder="Enter a message"
					aria-label="Recipient's username"
					aria-describedby="button-addon2"
					wrap="soft"
					onChange={(e) =>
						props.setUserData((prev) => ({
							...prev,
							["message"]: e.target.value,
						}))
					}
					style={{
						paddingInline: "1rem",
						height: "4rem",
						scrollbarWidth: "none",
						resize: "none",
					}}
				/>
				<button
					type="submit"
					className="btn btn-outline-secondary"
					id="button-addon2"
					style={{ width: "6rem" }}
				>
					<i className="bi bi-send margin-4">Send</i>
				</button>
			</div>
		</React.Fragment>
	);
}

InputMessage.prototypes = {
	// add proptype "setMessages" of type function
	setMessages: PropTypes.func,
};

export default InputMessage;
