import abi from "../../contracts/abi.js";
import { ethers } from "ethers";

async function contractExecuteFcn(walletData, contractAddress, tokenAddress) {
	console.log(`\n=======================================`);
	console.log(`- Executing contract function (associateTokenFcn)...🟠`);

	// ETHERS PROVIDER AND SIGNER
	const provider = walletData[1];
	const signer = provider.getSigner();

	// EXECUTE THE SMART CONTRACT
	let txBlockHash;
	let outText;
	try {
		// EXECUTE CONTRACT FUNCTION
		const gasLimit = 4000000;
		const myContract = new ethers.Contract(contractAddress, abi, signer);
		const executeTx = await myContract.associateTokenFcn(tokenAddress, { gasLimit: gasLimit });
		const executeRx = await executeTx.wait();
		txBlockHash = executeRx.blockHash;
		outText = "🔗Token association complete ✅";
		console.log(`- Contract executed. Here's the block hash: \n${txBlockHash} ✅`);
	} catch (executeError) {
		console.log(`- ${executeError.message.toString()}`);
	}

	return [txBlockHash, outText];
}

export default contractExecuteFcn;
