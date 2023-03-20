import React from "react";

function MyInputBox(props) {
	return (
		<div>
			<input type="text" onChange={props.fcn} placeholder={props.phText} className="text-input" />
		</div>
	);
}

export default MyInputBox;
