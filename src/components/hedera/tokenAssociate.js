// import abi from "../../contracts/abi.js";
import bytecode from "../../contracts/bytecode.js";
import { ethers } from "ethers";

async function tokenAssociateFcn(walletData, tokenAddress) {
	console.log(`\n=======================================`);
	console.log(`- Associating token...🟠`);

	// ETHERS PROVIDER AND SIGNER
	const provider = walletData[1];
	const signer = provider.getSigner();

	const abi = [`function associate()`];

	// DEPLOY SMART CONTRACT
	let txHash;
	let outText;
	try {
		const gasLimit = 4000000;

		// create contract instance for the contract id (token id)
		const myContract = new ethers.Contract(tokenAddress, abi, signer);
		const associateTx = await myContract.associate();
		const associateRx = await associateTx.wait();
		txHash = associateRx.transactionHash;
		outText = "🔗Token association complete ✅";
		console.log(`- Done! Here's the transaction hash: \n${txHash} ✅`);
	} catch (deployError) {
		console.log(`- ${deployError.message.toString()}`);
	}
	return [txHash, outText];
}
export default tokenAssociateFcn;
