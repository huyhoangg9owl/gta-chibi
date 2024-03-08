import { TEST_NET } from '../util/constants';
import { getWalletAddress, getWeb3 } from '../util/cryptoWallet';
import { handleResult } from '../util/utils';
import NinnekoVestingABI1 from '../data/NinnekoVestingABI.json';
import NinnekoPlayerABI1 from '../data/NinnekoPlayerABI.json';
import NinnekoPartnerABI from '../data/NinnekoPartnerABI.json';

const NinnekoVestingAddress = TEST_NET
	? '0xf41C1ff409c332F67CAe06ef0e905C85d7DF9C9a'
	: '0x2e7787cBFd67A2334d8Ce2eA8d09d5D885D55273';

const NinnekoVestingABI = TEST_NET
	? NinnekoVestingABI1
	: [
			{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: 'address',
						name: 'previousOwner',
						type: 'address',
					},
					{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
				],
				name: 'OwnershipTransferred',
				type: 'event',
			},
			{
				anonymous: false,
				inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
				name: 'Paused',
				type: 'event',
			},
			{
				anonymous: false,
				inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
				name: 'Unpaused',
				type: 'event',
			},
			{
				inputs: [],
				name: 'NINO_TOKEN',
				outputs: [{ internalType: 'address', name: '', type: 'address' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'PERIOD',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'START_TIME',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'TIME_LINEAR',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'balanceOf',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'address', name: 'from', type: 'address' },
					{
						internalType: 'address',
						name: 'to',
						type: 'address',
					},
				],
				name: 'changeAddressWallet',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'countRelease',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'getBalance',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
				name: 'getBalanceAvailable',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'getBalanceOf',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
				name: 'getBalanceRemainingVesting',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'getCountRelease',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'getCurrentTime',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'getNextRelease',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'getNumberOfToken',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'getTimeReleaseNext',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'getTokenOldClaim',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'nextRelease',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'numberOfToken',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'owner',
				outputs: [{ internalType: 'address', name: '', type: 'address' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'paused',
				outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
				name: 'recoverToken',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [],
				name: 'release',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [],
				name: 'renounceOwnership',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'address[]', name: '_addr', type: 'address[]' },
					{
						internalType: 'uint256[]',
						name: '_amount',
						type: 'uint256[]',
					},
					{ internalType: 'uint256[]', name: '_amountOldClaim', type: 'uint256[]' },
				],
				name: 'setAddressVesting',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [],
				name: 'setPause',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
				name: 'setTokenAddress',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'tokenOldClaim',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
				name: 'transferOwnership',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{ inputs: [], name: 'unsetPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	  ];
const NinnekoPartnerAddress = TEST_NET ? '0x015014E618Cbab5725583ECd3000c15D569cc157' : '';

const NinnekoPlayerAddress = TEST_NET
	? '0x3ff3aFB623D10ffb85986057e7cA2021Cff587Af'
	: '0x173a043FA4161C75Aa2415a7AC059Cc8Eb66A88F';
const NinnekoPlayerABI = TEST_NET
	? NinnekoPlayerABI1
	: [
			{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
			{
				anonymous: false,
				inputs: [
					{
						indexed: true,
						internalType: 'address',
						name: 'previousOwner',
						type: 'address',
					},
					{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
				],
				name: 'OwnershipTransferred',
				type: 'event',
			},
			{
				anonymous: false,
				inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
				name: 'Paused',
				type: 'event',
			},
			{
				anonymous: false,
				inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
				name: 'Unpaused',
				type: 'event',
			},
			{
				inputs: [],
				name: 'NINO_TOKEN',
				outputs: [{ internalType: 'address', name: '', type: 'address' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'PERIOD',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				name: 'START_TIME',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				name: 'TIME_LINEAR',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'uint256', name: '', type: 'uint256' },
					{
						internalType: 'address',
						name: '',
						type: 'address',
					},
				],
				name: 'balanceOf',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'uint256', name: '_idVesting', type: 'uint256' },
					{
						internalType: 'address',
						name: 'from',
						type: 'address',
					},
					{ internalType: 'address', name: 'to', type: 'address' },
				],
				name: 'changeAddressWallet',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'uint256', name: '', type: 'uint256' },
					{
						internalType: 'address',
						name: '',
						type: 'address',
					},
				],
				name: 'countRelease',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'getBalance',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'uint256', name: '_idVesting', type: 'uint256' },
					{
						internalType: 'address',
						name: '_addr',
						type: 'address',
					},
				],
				name: 'getBalanceAvailable',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'uint256', name: '_idVesting', type: 'uint256' },
					{
						internalType: 'address',
						name: '_addr',
						type: 'address',
					},
				],
				name: 'getBalanceRemainingVesting',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'getCurrentTime',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_idVesting', type: 'uint256' }],
				name: 'getTimeReleaseNext',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'uint256', name: '', type: 'uint256' },
					{
						internalType: 'address',
						name: '',
						type: 'address',
					},
				],
				name: 'nextRelease',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'uint256', name: '', type: 'uint256' },
					{
						internalType: 'address',
						name: '',
						type: 'address',
					},
				],
				name: 'numberOfToken',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'owner',
				outputs: [{ internalType: 'address', name: '', type: 'address' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'paused',
				outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
				name: 'recoverToken',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_idVesting', type: 'uint256' }],
				name: 'release',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [],
				name: 'renounceOwnership',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'uint256', name: '_idVesting', type: 'uint256' },
					{
						internalType: 'address[]',
						name: '_addr',
						type: 'address[]',
					},
					{ internalType: 'uint256[]', name: '_amount', type: 'uint256[]' },
					{
						internalType: 'uint256',
						name: '_startTime',
						type: 'uint256',
					},
					{ internalType: 'uint256', name: '_timeRelease', type: 'uint256' },
				],
				name: 'setAddressVesting',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [],
				name: 'setPause',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
				name: 'setTokenAddress',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
				name: 'transferOwnership',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{ inputs: [], name: 'unsetPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	  ];

const DECIMAL = 1e18;

export const getTotalTokenVesting = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninnekoVesting = new web3.eth.Contract(NinnekoVestingABI, NinnekoVestingAddress);
		return await ninnekoVesting.methods
			.getBalanceRemainingVesting(address)
			.call({ from: address })
			.then((data) => {
				return Math.floor(data / DECIMAL) + '';
			});
	}
	return 0;
};

export const getTokenAvailable = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninnekoVesting = new web3.eth.Contract(NinnekoVestingABI, NinnekoVestingAddress);

		if (TEST_NET) {
			return await ninnekoVesting.methods
				.getBalanceAviable(address)
				.call({ from: address })
				.then((data) => {
					return Math.floor(data / DECIMAL) + '';
				});
		} else {
			/**/
			console.log('get Available pool :');
			return await ninnekoVesting.methods
				.getBalanceAvailable(address)
				.call({ from: address })
				.then((data) => {
					return Math.floor(data / DECIMAL) + '';
				});
		}
	}
	return 0;
};
//Advisor
export const getTotalToken = async (ABI, Address, poolId = 0) => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const contract = new web3.eth.Contract(ABI, Address);
		if (poolId === 2) {
			return await contract.methods
				.balanceOfV2(address)
				.call({ from: address })
				.then((data) => {
					console.log('poolID : ' + poolId);
					console.log('data total : ' + data / DECIMAL);
					return Math.floor(data / DECIMAL) + '';
				});
		} else {
			return await contract.methods
				.balanceOf(address)
				.call({ from: address })
				.then((data) => {
					return Math.floor(data / DECIMAL) + '';
				});
		}
	}
	return 0;
};
export const getTokenAvailableS = async (ABI, Address, poolId = 0) => {
	const web3 = getWeb3();
	var address = await getWalletAddress();
	/*    address = "0x01baaf076eece9ad12b1e7577a5276ebe1247780"*/
	console.log('Get Token Avalable ------- >>>>' + web3 + '--' + address);
	if (web3 !== null && address !== null) {
		const contract = new web3.eth.Contract(ABI, Address);

		if (TEST_NET) {
			return await contract.methods
				.getBalanceAvailable(address)
				.call({ from: address })
				.then((data) => {
					return Math.floor(data / DECIMAL) + '';
				});
		} else {
			if (poolId === 1) {
				return await contract.methods
					.getBalanceAvailable(poolId, address)
					.call({ from: address })
					.then((data) => {
						console.log('poolID : ' + poolId);
						console.log('data available: ' + data / DECIMAL);
						return Math.floor(data / DECIMAL) + '';
					});
			} else if (poolId === 2) {
				await contract.methods
					.balanceOfV2(address)
					.call({ from: address })
					.then((data) => {
						console.log('poolID : ' + poolId);
						console.log('data available: ' + data / DECIMAL);
						return Math.floor(data / DECIMAL) + '';
					});
			} else {
				console.log('Vesting');
				return await contract.methods
					.getBalanceAvailable(address)
					.call({ from: address })
					.then((data) => {
						return Math.floor(data / DECIMAL) + '';
					});
			}
		}
	}
	return 0;
};
//

export const claimTokenVesting = (snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoVesting = new web3.eth.Contract(NinnekoVestingABI, NinnekoVestingAddress);
	handleResult(ninnekoVesting.methods.release(), snackbar, onComplete, onError);
};

export const getTotalTokenPartner = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninnekoPartner = new web3.eth.Contract(NinnekoPartnerABI, NinnekoPartnerAddress);
		return await ninnekoPartner.methods
			.getBalanceRemainingVesting(address)
			.call({ from: address })
			.then((data) => {
				return Math.floor(data / DECIMAL) + '';
			});
	}
	return 0;
};

export const getTokenPartnerAvailable = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninnekoPartner = new web3.eth.Contract(NinnekoPartnerABI, NinnekoPartnerAddress);
		return await ninnekoPartner.methods
			.getBalanceAvailable(address)
			.call({ from: address })
			.then((data) => {
				return Math.floor(data / DECIMAL) + '';
			});
	}
	return 0;
};

export const claimTokenPartner = (snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoPartner = new web3.eth.Contract(NinnekoPartnerABI, NinnekoPartnerAddress);
	handleResult(ninnekoPartner.methods.release(), snackbar, onComplete, onError);
};

export const addPartner = (address, amount, timeRelease, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoPartner = new web3.eth.Contract(NinnekoPartnerABI, NinnekoPartnerAddress);
	handleResult(ninnekoPartner.methods.setAddressVesting(address, amount, timeRelease), snackbar, onComplete, onError);
};

export const getNinnekoPartnerContractOwner = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninnekoPartner = new web3.eth.Contract(NinnekoPartnerABI, NinnekoPartnerAddress);
		return await ninnekoPartner.methods
			.owner()
			.call({ from: address })
			.then((data) => {
				return data;
			});
	}
	return 0;
};

//------------------------PLAYER---------------------
export const getTotalTokenPlayer = async (season) => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninnekoPlayer = new web3.eth.Contract(NinnekoPlayerABI, NinnekoPlayerAddress);
		return await ninnekoPlayer.methods
			.getBalanceRemainingVesting(season, address)
			.call({ from: address })
			.then((data) => {
				return Math.floor(data / DECIMAL) + '';
			});
	}
	return 0;
};

export const getTokenPlayerAvailable = async (season) => {
	const web3 = getWeb3();
	const address = await getWalletAddress();
	// const address = 0x89CA3418Ac4fe8d0f119B6Fc3bb41993aC3635cF //await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninnekoPlayer = new web3.eth.Contract(NinnekoPlayerABI, NinnekoPlayerAddress);
		const total = await ninnekoPlayer.methods.balanceOf(season, address).call({ from: address });
		return await ninnekoPlayer.methods
			.getBalanceAvailable(season, address)
			.call({ from: address })
			.then((data) => {
				if (parseInt(data) > parseInt(total)) {
					data = total;
				}
				if (parseInt(total) === 0) {
					return 0;
				}
				return Math.floor(parseInt(data) / DECIMAL) + '';
			});
	}
	console.log('Chay vao day 5');
	return 0;
};

export const claimTokenPlayer = (season, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoPlayer = new web3.eth.Contract(NinnekoPlayerABI, NinnekoPlayerAddress);
	handleResult(ninnekoPlayer.methods.release(season), snackbar, onComplete, onError);
};

export const addPlayer = (address, amount, timeRelease, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoPlayer = new web3.eth.Contract(NinnekoPlayerABI, NinnekoPlayerAddress);
	handleResult(ninnekoPlayer.methods.setAddressVesting(address, amount, timeRelease), snackbar, onComplete, onError);
};

export const getNinnekoPlayerContractOwner = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninnekoPlayer = new web3.eth.Contract(NinnekoPlayerABI, NinnekoPlayerAddress);
		return await ninnekoPlayer.methods
			.owner()
			.call({ from: address })
			.then((data) => {
				return data;
			});
	}
	return 0;
};
