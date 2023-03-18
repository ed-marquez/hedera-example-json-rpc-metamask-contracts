import React, { useState } from "react";
import MyGroup from "./components/MyGroup.jsx";
import MyButton from "./components/MyButton.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import contractDeployFcn from "./components/hedera/contractDeploy.js";
import contractExecuteFcn from "./components/hedera/contractExecute.js";
import tokenAssociateFcn from "./components/hedera/tokenAssociate.js";
import "./styles/App.css";

function App() {
	const [walletData, setWalletData] = useState();
	const [accountId, setAccountId] = useState();
	const [contractAddress, setContractAddress] = useState();

	const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
	const [contractTextSt, setContractTextSt] = useState();
	const [executeTextSt, setExecuteTextSt] = useState();

	const [connectLinkSt, setConnectLinkSt] = useState("");
	const [contractLinkSt, setContractLinkSt] = useState();
	const [executeLinkSt, setExecuteLinkSt] = useState();

	async function connectWallet() {
		if (accountId !== undefined) {
			setConnectTextSt(`🔌 Account ${accountId} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let id = wData[0];
			if (id !== undefined) {
				setConnectTextSt(`🔌 Account ${id} connected ⚡ ✅`);
				setConnectLinkSt(`https://hashscan.io/${wData[2]}/account/${id}`);

				setAccountId(id);
				setWalletData(wData);
				setContractTextSt();
			}
		}
	}

	// async function contractDeploy() {
	// 	if (accountId === undefined) {
	// 		setContractTextSt("🛑 Connect a wallet first! 🛑");
	// 	} else {
	// 		const cAddress = await contractDeployFcn(walletData);

	// 		if (cAddress === undefined) {
	// 		} else {
	// 			setContractAddress(cAddress);
	// 			setContractTextSt(`Contract ${cAddress} deployed ✅`);
	// 			setExecuteTextSt(``);
	// 			setContractLinkSt(`https://hashscan.io/${walletData[2]}/account/${cAddress}`);
	// 		}
	// 	}
	// }

	// async function contractExecute() {
	// 	if (contractAddress === undefined) {
	// 		setExecuteTextSt("🛑 Deploy a contract first! 🛑");
	// 	} else {
	// 		const [txBlockHash, finalCount] = await contractExecuteFcn(walletData, contractAddress);

	// 		if (txBlockHash === undefined || finalCount === undefined) {
	// 		} else {
	// 			setExecuteTextSt(`Count is: ${finalCount} | Transaction included in block ${txBlockHash} ✅`);
	// 			setExecuteLinkSt(`https://hashscan.io/${walletData[2]}/block/${txBlockHash}`);
	// 		}
	// 	}
	// }
	//=====================
	const [inputValue, setInputValue] = useState("");
	const [displayText, setDisplayText] = useState("");

	async function tokenAssociate() {
		const txt = `You entered: ${inputValue}`;
		setDisplayText(txt);
		console.log(txt);

		const txBlockHash2 = await tokenAssociateFcn(walletData, inputValue);
	}

	function handleInputChange(event) {
		let inText = event.target.value;

		// setDisplayText();

		setInputValue(inText);
		setDisplayText("Click Associate Button to Confirm");
	}
	//=====================

	return (
		<div className="App">
			<h1 className="header">Let's buidl a counter dapp with MetaMask and Hedera!</h1>
			<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectTextSt} link={connectLinkSt} />

			{/* <MyGroup fcn={contractDeploy} buttonLabel={"Deploy Contract"} text={contractTextSt} link={contractLinkSt} /> */}

			{/* <MyGroup fcn={contractExecute} buttonLabel={"Execute Contract (+1)"} text={executeTextSt} link={executeLinkSt} /> */}

			<div>
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Enter token address..."
					onFocus={handleInputChange}
					onBlur={() => {
						setDisplayText();
					}}
				/>
				<p className="footer-text"> {displayText} </p>
			</div>

			<MyButton fcn={tokenAssociate} buttonLabel={"Associate Token"} />

			<div className="logo">
				<div className="symbol">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
						<path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0" className="circle"></path>
						<path d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z" className="h"></path>
					</svg>
				</div>
				<span>Hedera</span>
			</div>
		</div>
	);
}
export default App;
