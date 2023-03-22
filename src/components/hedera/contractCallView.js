import abi from "../../contracts/abi.js";
import { ethers } from "ethers";

async function contractExecuteFcn(walletData, contractAddress, partName) {
	console.log(`\n=======================================`);
	console.log(`- Calling contract function (Getting info)...🟠`);

	// ETHERS PROVIDER AND SIGNER
	const provider = walletData[1];
	const signer = provider.getSigner();

	// EXECUTE THE SMART CONTRACT
	let txHash;
	let outText;
	try {
		// EXECUTE CONTRACT FUNCTION
		const gasLimit = 4000000;
		const myContract = new ethers.Contract(contractAddress, abi, signer);
		const callTx = await myContract.getAmount(partName, { gasLimit: gasLimit });
		const callRx = await callTx.wait();
		txHash = callRx.transactionHash;
		outText = "🔍Transaction complete ✅";
		console.log(`- Contract executed. Here's the transaction hash: \n${txHash} ✅`);

		// myContract.on("gotAmountOf", (amountOf) => {
		// 	console.log(`${amountOf}`);
		// 	// console.log(parseInt(amountOf.hex, 16));
		// });
	} catch (executeError) {
		console.log(`- ${executeError.message.toString()}`);
	}

	return [txHash, outText];
}

export default contractExecuteFcn;
