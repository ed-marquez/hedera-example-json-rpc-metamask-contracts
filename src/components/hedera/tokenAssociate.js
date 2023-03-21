import abi from "../../contracts/abi.js";
import bytecode from "../../contracts/bytecode.js";
import { ContractFactory } from "ethers";

async function tokenAssociateFcn(walletData, tokenAddress) {
	console.log(`\n=======================================`);
	console.log(`- Associating token...🟠`);

	// ETHERS PROVIDER AND SIGNER
	const provider = walletData[1];
	const signer = provider.getSigner();

	// DEPLOY SMART CONTRACT
	let txHash;
	let outText;
	try {
		const gasLimit = 4000000;

		const myContract = new ContractFactory(abi, bytecode, signer);
		const contractDeployTx = await myContract.deploy(tokenAddress, { gasLimit: gasLimit });
		const contractDeployRx = await contractDeployTx.deployTransaction.wait();
		txHash = contractDeployRx.transactionHash;
		outText = "🔗Token association complete ✅";
		console.log(`- Done! Here's the transaction hash: \n${txHash} ✅`);
	} catch (deployError) {
		console.log(`- ${deployError.message.toString()}`);
	}
	return [txHash, outText];
}
export default tokenAssociateFcn;
