import React, { useContext } from "react";
import ButtonContext from "./ButtonContext";

const Button = ({ onClick, buttonType, children }) => {
	const context = useContext(ButtonContext);

	return (
		<button onClick={onClick} className={`button ${buttonType}`}>
			{children}
		</button>
	);
};

export default Button;
