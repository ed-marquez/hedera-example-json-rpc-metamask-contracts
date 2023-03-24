import React from "react";
import "./styles/App.css";

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	const stopPropagation = (e) => e.stopPropagation();

	return (
		<div className="modal" onClick={onClose}>
			<div className="modal-content" onClick={stopPropagation}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
