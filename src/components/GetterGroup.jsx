import React from "react";
import MyInputBox from "./myInputBox";
import MyButton from "./MyButton";
import MyText from "./MyText";

function GetterGroup(props) {
	return (
		<div>
			<MyText text={props.text} link={props.link} />
			<div className="multi-col-group">
				<MyInputBox fcn={props.fcnI1} phText={props.phText1} />
				<MyButton fcn={props.fcnB1} buttonLabel={props.buttonLabel} />
			</div>
		</div>
	);
}

export default GetterGroup;
