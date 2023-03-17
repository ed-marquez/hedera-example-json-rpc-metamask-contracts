import { ethers } from "ethers";
const network = "previewnet";

async function walletConnectFcn() {
	console.log(`\n=======================================`);

	// ETHERS PROVIDER
	const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

	// SWITCH TO HEDERA TEST NETWORK
	console.log(`- Switching network to the Hedera ${network}...🟠`);
	await window.ethereum.request({
		method: "wallet_addEthereumChain",
		params: [
			{
				chainName: `Hedera ${network}`,
				chainId: "0x129",
				nativeCurrency: { name: "HBAR", symbol: "ℏℏ", decimals: 18 },
				rpcUrls: [`https://${network}.hashio.io/api`],
				blockExplorerUrls: [`https://hashscan.io/${network}/`],
			},
		],
	});
	console.log("- Switched ✅");

	// // CONNECT TO ACCOUNT
	console.log("- Connecting wallet...🟠");
	let selectedAccount;
	await provider
		.send("eth_requestAccounts", [])
		.then((accounts) => {
			selectedAccount = accounts[0];
			console.log(`- Selected account: ${selectedAccount} ✅`);
		})
		.catch((connectError) => {
			console.log(`- ${connectError.message.toString()}`);
			return;
		});

	return [selectedAccount, provider, network];
}

export default walletConnectFcn;
