import { ethers } from 'ethers';
import sessionData from '../sessionData';
import { TEST_NET } from '../util/constants';
import { getWalletBalance, getWeb3, getprovider } from '../util/cryptoWallet';
import { LANG_TRANSACTION_COMPLETED, LANG_TRANSACTION_IS_PROCESSED } from '../util/lang';

const BuyCHWTokenAddress = TEST_NET
	? '0x0F5BA7c08F269259ca78ce7EBdB4fc390BA022aa'
	: '0x2B923Ce9750BcEaA233C6bD66A9bA9a4e7157596';
const BuyCHWTokenAbi = TEST_NET
	? [
			{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
			{
				anonymous: false,
				inputs: [
					{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
					{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
				],
				name: 'OwnershipTransferred',
				type: 'event',
			},
			{
				anonymous: false,
				inputs: [
					{ indexed: true, internalType: 'address', name: 'token', type: 'address' },
					{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
				],
				name: 'TokenRecovery',
				type: 'event',
			},
			{
				inputs: [],
				name: 'admin',
				outputs: [{ internalType: 'address', name: '', type: 'address' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: 'ref', type: 'address' }],
				name: 'buy',
				outputs: [],
				stateMutability: 'payable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'buyer',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'chibi',
				outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
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
				name: 'rate',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{ inputs: [], name: 'recoverBnb', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
				name: 'recoverToken',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'refer',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [{ internalType: 'address', name: 'add', type: 'address' }],
				name: 'setAdmin',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
				name: 'setChibiToken',
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
	  ]
	: [
			{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
			{
				anonymous: false,
				inputs: [
					{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
					{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
				],
				name: 'OwnershipTransferred',
				type: 'event',
			},
			{
				anonymous: false,
				inputs: [
					{ indexed: true, internalType: 'address', name: 'token', type: 'address' },
					{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
				],
				name: 'TokenRecovery',
				type: 'event',
			},
			{
				inputs: [],
				name: 'admin',
				outputs: [{ internalType: 'address', name: '', type: 'address' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: 'ref', type: 'address' }],
				name: 'buy',
				outputs: [],
				stateMutability: 'payable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'buyer',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: 'add', type: 'address' }],
				name: 'change',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [],
				name: 'chibi',
				outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
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
				name: 'rate',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{ inputs: [], name: 'recoverBnb', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
				name: 'recoverToken',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'refer',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [{ internalType: 'address', name: 'add', type: 'address' }],
				name: 'setAdmin',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
				name: 'setChibiToken',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: 'newRate', type: 'uint256' }],
				name: 'setRate',
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
			{ stateMutability: 'payable', type: 'receive' },
	  ];

export const buyToken = async (amount, addressRef, snackbar, onComplete, onReceipt) => {
	const web3 = getWeb3();
	//const web3 = new Web3(window.ethereum);
	const provider = new ethers.providers.Web3Provider(getprovider());
	const buyPrice = web3.utils.toHex(web3.utils.toWei(amount, 'ether'));
	const from = sessionData.myAddress;
	const signer = provider.getSigner();
	const contract = new ethers.Contract(BuyCHWTokenAddress, BuyCHWTokenAbi, signer);
	const balance = await getWalletBalance(from);
	if (balance < amount) {
		snackbar('Insufficient balance', { variant: 'error', autoHideDuration: 10000 });
		return;
	}
	if (25 < amount) {
		snackbar('You can buy max 25 BNB', { variant: 'error', autoHideDuration: 10000 });
		return;
	}
	//
	const tx = await contract.buy(addressRef, { from: from, value: buyPrice });
	snackbar(LANG_TRANSACTION_IS_PROCESSED, { variant: 'info', autoHideDuration: 10000 });
	const trans = tx.wait();
	trans.then(async (r) => {
		//console.log(r)
		console.log(r.transactionHash);

		await onReceipt(r.transactionHash);
		onComplete();

		snackbar(LANG_TRANSACTION_COMPLETED, { variant: 'success', autoHideDuration: 10000 });
	});
	//console.log(trans)

	//console.log(tx);
	//contract.methods.buy(addressRef).send({from: from,value: 10000})
	//handleResult(contract.methods.buy(addressRef), snackbar, onComplete, onError,buyPrice,null,onReceipt);
};
