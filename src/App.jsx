import React, { useState, useEffect, useContext, useCallback } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { ButtonProvider } from "./ButtonContext";
import "./styles/App.css";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isWalletConnected, setIsWalletConnected] = useState(false);

	const connectWallet = useCallback(() => {
		setIsWalletConnected(true);
	}, []);

	const disconnectWallet = useCallback(() => {
		setIsWalletConnected(false);
	}, []);

	function onConnectWallet() {
		setIsModalOpen(true);
		console.log("Connecting wallet...");
	}

	function hideModal() {
		setIsModalOpen(false);
	}

	function onButtonClick() {
		connectWallet();
		hideModal();
		console.log("Connected");
	}

	function executeMyFunction() {
		console.log("My Function executed");
		console.log(`- Value: ${isWalletConnected}`);
	}

	function onDisconnectWallet() {
		disconnectWallet();
	}

	// Restore wallet connection state from local storage on component mount
	useEffect(() => {
		const storedWalletState = localStorage.getItem("isWalletConnected");
		if (storedWalletState === "true") {
			connectWallet();
		}
	}, [connectWallet]);

	// Store wallet connection state in local storage whenever it changes
	useEffect(() => {
		localStorage.setItem("isWalletConnected", isWalletConnected.toString());
	}, [isWalletConnected]);

	return (
		<ButtonProvider value={useContext}>
			<div>
				{!isWalletConnected && (
					<Button onClick={onConnectWallet} buttonType="initial">
						Connect Wallet
					</Button>
				)}

				{isWalletConnected && (
					<>
						<Button onClick={onDisconnectWallet} buttonType="topRight">
							Disconnect Wallet
						</Button>

						<Button onClick={executeMyFunction} buttonType="middle">
							My Function
						</Button>
					</>
				)}

				<Modal isOpen={isModalOpen} onClose={hideModal}>
					<h2>Modal Title</h2>
					<Button onClick={onButtonClick}>Button 1</Button>
					<Button onClick={onButtonClick}>Button 2</Button>
					<Button onClick={onButtonClick}>Button 3</Button>
				</Modal>
			</div>
		</ButtonProvider>
	);
}

export default App;
