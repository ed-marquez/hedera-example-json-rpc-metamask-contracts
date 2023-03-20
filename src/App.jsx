import React, { useState } from "react";
import MyText from "./components/MyText.jsx";
import MyButton from "./components/MyButton.jsx";
import MyGroup from "./components/MyGroup.jsx";
import SetterGroup from "./components/SetterGroup.jsx";
import GetterGroup from "./components/GetterGroup.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import contractDeployFcn from "./components/hedera/contractDeploy.js";
import contractExecuteFcn from "./components/hedera/contractExecute.js";
import "./styles/App.css";

function App() {
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [, setContractAddress] = useState();

	const [connectTextSt, setConnectTextSt] = useState("🔌 Connect here...");
	const [deployTextSt, setDeployTextSt] = useState("");
	const [textboxTextSt, setTextboxTextSt] = useState("Enter a token address to associate");
	const [tokenAddressIn, setTokenAddress] = useState("");
	const [executeTextSt, setExecuteTextSt] = useState("");

	const [connectLinkSt, setConnectLinkSt] = useState("");
	const [deployLinkSt, setDeployLinkSt] = useState("");
	const [executeLinkSt, setExecuteLinkSt] = useState("");

	async function connectWallet() {
		if (account !== undefined) {
			setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			if (newAccount !== undefined) {
				setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLinkSt(`https://hashscan.io/${wData[2]}/account/${newAccount}`);
				setAccount(newAccount);
				setWalletData(wData);
			}
		}
	}

	async function contractDeploy() {
		const newContractAddress = await contractDeployFcn(walletData);
		setContractAddress(newContractAddress);
	}

	function handleInputChange(event) {
		let textIn = event.target.value;
		setTextboxTextSt("Enter a token address to associate");
		if (textIn === "") {
			setTokenAddress();
			setExecuteTextSt();
			setExecuteLinkSt();
		} else {
			setTokenAddress(textIn);
			setExecuteTextSt("Click to confirm 👇");
			setExecuteLinkSt();
		}
	}

	async function tokenAssociate() {
		if (account === undefined || tokenAddressIn === undefined) {
			setExecuteTextSt("🛑Connect a wallet AND enter a valid token address!🛑");
		} else if (!tokenAddressIn.startsWith("0x")) {
			setExecuteTextSt("🛑Enter a valid token address (0x...)🛑");
		} else {
			setExecuteTextSt(`Associating to Token: ${tokenAddressIn}`);

			const newContractAddress = await contractDeployFcn(walletData, tokenAddressIn);
			setContractAddress(newContractAddress);
			const [txBlockHash, outText] = await contractExecuteFcn(walletData, newContractAddress, tokenAddressIn);

			if (txBlockHash !== undefined && outText !== undefined) {
				setTextboxTextSt(outText);
				setExecuteTextSt(`Transaction included in block ${txBlockHash} ✅`);
				setExecuteLinkSt(`https://hashscan.io/${walletData[2]}/block/${txBlockHash}`);
			} else {
				setTextboxTextSt("Enter a token address to associate");
				setExecuteTextSt(`Association failed - try again 🔴`);
				setExecuteLinkSt("");
			}
		}
	}

	//=====================

	return (
		<div className="App">
			<h1 className="header">Write and read on-chain data on Hedera!</h1>

			<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectTextSt} link={connectLinkSt} />

			<MyGroup fcn={contractDeploy} buttonLabel={"Deploy Contract"} text={deployTextSt} link={deployLinkSt} />

			<SetterGroup
				text={textboxTextSt}
				fcnI1={console.log(`${1}`)}
				phText1={"Part name"}
				fcnI2={console.log(`${2}`)}
				phText2={"Amount"}
				fcnB1={console.log(`Pressed button`)}
				buttonLabel={"Store Info"}
			/>

			<GetterGroup
				text={textboxTextSt}
				fcnI1={console.log(`${1}`)}
				phText1={"Part name"}
				fcnB1={console.log(`Pressed button`)}
				buttonLabel={"Get Info"}
			/>

			{/* <MyGroup fcn={tokenAssociate} buttonLabel={"Associate Token"} text={executeTextSt} link={executeLinkSt} /> */}

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
