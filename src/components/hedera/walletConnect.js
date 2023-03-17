import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

async function walletConnectFcn() {
	console.log(`\n=======================================`);
	console.log("- Connecting wallet...");

	let selectedAccount;
	const provider = await detectEthereumProvider();

	provider
		.request({ method: "eth_requestAccounts" })
		.then((accounts) => {
			selectedAccount = accounts[0];
			console.log(`Selected account is ${selectedAccount}`);
		})
		.catch((err) => {
			console.log(err);
			return;
		});

	try {
		await provider.request({
			method: "wallet_addEthereumChain",
			params: [
				{
					chainName: "Hedera Testnet",
					chainId: "0x128",
					nativeCurrency: { name: "HBAR", symbol: "ℏ", decimals: 18 },
					rpcUrls: ["https://testnet.hashio.io/api"],
				},
			],
		});
		console.log("You have switched to the right network");
	} catch (switchError) {
		// The network has not been added to MetaMask
		console.log("Cannot switch to the network");
	}

	return selectedAccount;
}

export default walletConnectFcn;
