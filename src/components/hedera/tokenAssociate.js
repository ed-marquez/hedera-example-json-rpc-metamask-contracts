import abi from "../../contracts/abi.js";
import bytecode from "../../contracts/bytecode.js";
import { ethers, ContractFactory } from "ethers";

async function tokenAssociateFcn(walletData, tokenAddress) {
	console.log(`\n=======================================`);
	console.log(`- Executing contract function...🟠`);

	// ETHERS PROVIDER AND SIGNER
	const provider = walletData[1];
	const signer = provider.getSigner();

	// DEPLOY SMART CONTRACT
	let contractAddress;
	let txBlockHash;
	try {
		const gasLimit = 4000000;

		// DEPLOY CONTRACT
		const myContract = new ContractFactory(abi, bytecode, signer);
		const contractDeployTx = await myContract.deploy({ gasLimit: gasLimit });
		const contractDeployRx = await contractDeployTx.deployTransaction.wait();
		contractAddress = contractDeployRx.contractAddress;
		console.log(`- Contract deployed to address: \n${contractAddress} ✅`);

		// EXECUTE CONTRACT FUNCTION
		const myContractTx = await new ethers.Contract(contractAddress, abi, signer);
		const associateTx = await myContractTx.associateTokenFcn(tokenAddress, { gasLimit: gasLimit });
		const associateRx = await associateTx.wait();
		txBlockHash = associateRx.blockHash;
		console.log(`- Contract executed. Here's the block hash: \n${txBlockHash} ✅`);
	} catch (associateError) {
		console.log(`- ${associateError.message.toString()}`);
	}
	return txBlockHash;
}
export default tokenAssociateFcn;
