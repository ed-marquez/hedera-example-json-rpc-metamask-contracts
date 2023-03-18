const abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "",
				type: "bool",
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "",
				type: "bytes",
			},
		],
		name: "CallResponseEvent",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_tokenAddress",
				type: "address",
			},
		],
		name: "associateTokenFcn",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "delegateTransferFrom",
		outputs: [
			{
				internalType: "int64",
				name: "responseCode",
				type: "int64",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "serialNumber",
				type: "uint256",
			},
		],
		name: "delegateTransferFromNFT",
		outputs: [
			{
				internalType: "int64",
				name: "responseCode",
				type: "int64",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				internalType: "bytes",
				name: "encodedFunctionSelector",
				type: "bytes",
			},
		],
		name: "redirectForToken",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "int64",
				name: "responseCode",
				type: "int64",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address",
			},
			{
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "serialNumber",
				type: "uint256",
			},
		],
		name: "transferFromNFT",
		outputs: [
			{
				internalType: "int64",
				name: "responseCode",
				type: "int64",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
];
export default abi;
