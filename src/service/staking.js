import Web3 from 'web3';
import { handleResult } from '../util/utils';
import { NETWORK_RPC_URL } from '../util/constants';
import { getWalletAddress, getWeb3 } from '../util/cryptoWallet';


Number.prototype.format = function (n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const NinnekoStakingAddress = '0x6eaD6A05c439289096C58B328157C0A646261358';
const NinnekoStakingABI = [
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'owner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'spender', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Approval',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'Deposit',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'Harvest',
		type: 'event',
	},
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
		inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
		name: 'Paused',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'to', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Transfer',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
		name: 'Unpaused',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'endInvestAt', type: 'uint256' },
		],
		name: 'Vesting',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'Withdraw',
		type: 'event',
	},
	{
		inputs: [],
		name: 'BONUS_MULTIPLIER',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'MAX_MINT',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'addressCanTransferOrReceiveToken',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'allowTransfer',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{ internalType: 'address', name: 'owner', type: 'address' },
			{ internalType: 'address', name: 'spender', type: 'address' },
		],
		name: 'allowance',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'approve',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'bonus',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'decimals',
		outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
		],
		name: 'decreaseAllowance',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'addedValue', type: 'uint256' },
		],
		name: 'increaseAllowance',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'name',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'numberBlockInYear',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'paused',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'poolInfo',
		outputs: [
			{ internalType: 'contract IERC20Upgradeable', name: 'lpToken', type: 'address' },
			{ internalType: 'uint256', name: 'blockStart', type: 'uint256' },
			{ internalType: 'uint256', name: 'blockEnd', type: 'uint256' },
			{ internalType: 'uint256', name: 'total', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [],
		name: 'symbol',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{ internalType: 'address', name: 'recipient', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'transfer',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'sender', type: 'address' },
			{ internalType: 'address', name: 'recipient', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'transferFrom',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
	{
		inputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'address', name: '', type: 'address' },
		],
		name: 'userInfo',
		outputs: [
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ internalType: 'uint256', name: 'lastDeposit', type: 'uint256' },
			{ internalType: 'uint256', name: 'unclaimed', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{ inputs: [], name: 'initialize', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [{ internalType: 'uint256', name: '_multiplierNumber', type: 'uint256' }],
		name: 'updateMultiplier',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'poolLength',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [{ internalType: 'uint256', name: '_number', type: 'uint256' }],
		name: 'setNumberBlockInYear',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{ inputs: [], name: 'setPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{ inputs: [], name: 'unsetPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [
			{ internalType: 'contract IERC20Upgradeable', name: '_lpToken', type: 'address' },
			{ internalType: 'uint256', name: '_blockStart', type: 'uint256' },
			{ internalType: 'uint256', name: '_blockEnd', type: 'uint256' },
		],
		name: 'add',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_pId', type: 'uint256' },
			{ internalType: 'uint256', name: '_blockStart', type: 'uint256' },
			{ internalType: 'uint256', name: '_blockEnd', type: 'uint256' },
		],
		name: 'updateBlockEndPool',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_maxMint', type: 'uint256' }],
		name: 'setMaxMint',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_add', type: 'address' },
			{ internalType: 'bool', name: '_isTransfer', type: 'bool' },
		],
		name: 'setAddressTransferOrReceive',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_id', type: 'uint256' },
			{
				components: [
					{ internalType: 'uint256', name: 'amount', type: 'uint256' },
					{ internalType: 'uint256', name: 'lastDeposit', type: 'uint256' },
					{ internalType: 'uint256', name: 'unclaimed', type: 'uint256' },
				],
				internalType: 'struct NinnekoStaking.UserInfo',
				name: '_user',
				type: 'tuple',
			},
		],
		name: 'getReward',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'address', name: '_user', type: 'address' },
		],
		name: 'pendingPoint',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' },
		],
		name: 'deposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_pid', type: 'uint256' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' },
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: 'x', type: 'uint256' }],
		name: 'sqrt',
		outputs: [{ internalType: 'uint256', name: 'y', type: 'uint256' }],
		stateMutability: 'pure',
		type: 'function',
		constant: true,
	},
	{
		inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
		name: 'recoverToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'bool', name: '_allow', type: 'bool' }],
		name: 'setAllowTransfer',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];

const NinnekoStakeAddress = NinnekoStakingAddress;
const NinnekoStakeABI = NinnekoStakingABI;

const NinnekoBoxAddress = '0x5df4d874284DEcFc029a5426B147546D89d4Ef76';
const NinnekoBoxABI = [
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'owner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'approved', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
		],
		name: 'Approval',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'owner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'operator', type: 'address' },
			{ indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
		],
		name: 'ApprovalForAll',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'uint256', name: 'typeBuy', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'typeBox', type: 'uint256' },
		],
		name: 'MintBox',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'token', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
		],
		name: 'NonFungibleTokenRecovery',
		type: 'event',
	},
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
		inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
		name: 'Paused',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'addr', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: '_typeBox', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: '_amount', type: 'uint256' },
		],
		name: 'SwapPoint2Box',
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
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'to', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
		],
		name: 'Transfer',
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
		name: 'BUY_BY_POINT',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_typeBox', type: 'uint256' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' },
		],
		name: 'SwapPointToBox',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_to', type: 'address' },
			{ internalType: 'uint256', name: '_typeBuy', type: 'uint256' },
			{ internalType: 'uint256[]', name: '_listTypeBoxs', type: 'uint256[]' },
		],
		name: '_mintBatchToAddress',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'addressBoughtBoxCotonPoint',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'addressBoughtBoxMataPoint',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'addressCanTransferOrReceiveToken',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'allowTransfer',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
		],
		name: 'approve',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'baseURI',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
		name: 'getApproved',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
		name: 'getTokensInfoOfAddress',
		outputs: [
			{ internalType: 'uint256[]', name: '', type: 'uint256[]' },
			{
				components: [
					{ internalType: 'uint256', name: 'typeBuy', type: 'uint256' },
					{ internalType: 'uint256', name: 'typeBox', type: 'uint256' },
				],
				internalType: 'struct NinnekoBox.TypeBox[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
		name: 'getTypeBox',
		outputs: [
			{
				components: [
					{ internalType: 'uint256', name: 'typeBuy', type: 'uint256' },
					{ internalType: 'uint256', name: 'typeBox', type: 'uint256' },
				],
				internalType: 'struct NinnekoBox.TypeBox',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_to', type: 'address' },
			{ internalType: 'uint256', name: '_typeBox', type: 'uint256' },
			{ internalType: 'uint256', name: '_id', type: 'uint256' },
		],
		name: 'gift',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_addPoint', type: 'address' }],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'owner', type: 'address' },
			{ internalType: 'address', name: 'operator', type: 'address' },
		],
		name: 'isApprovedForAll',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'maxBoxBuyByPointPerUser',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'maxSupply',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'name',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
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
		inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
		name: 'ownerOf',
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
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'pricePointPerBox',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_token', type: 'address' },
			{ internalType: 'uint256', name: '_tokenId', type: 'uint256' },
		],
		name: 'recoverNonFungibleToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
		name: 'recoverToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [
			{ internalType: 'address', name: 'from', type: 'address' },
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'from', type: 'address' },
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
			{ internalType: 'bytes', name: '_data', type: 'bytes' },
		],
		name: 'safeTransferFrom',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_add', type: 'address' },
			{ internalType: 'bool', name: '_isTransfer', type: 'bool' },
		],
		name: 'setAddressTransferOrReceive',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'bool', name: '_allow', type: 'bool' }],
		name: 'setAllowTransfer',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'operator', type: 'address' },
			{ internalType: 'bool', name: 'approved', type: 'bool' },
		],
		name: 'setApprovalForAll',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'string', name: '_uri', type: 'string' }],
		name: 'setBaseURI',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256[]', name: '_maxBuy', type: 'uint256[]' }],
		name: 'setMaxBoxBuyByPointPerUser',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_maxSupply', type: 'uint256' }],
		name: 'setMaxSupply',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{ inputs: [], name: 'setPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [{ internalType: 'uint256[]', name: '_price', type: 'uint256[]' }],
		name: 'setPricePointBox',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
		name: 'setTokenPoint',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256[]', name: '_total', type: 'uint256[]' }],
		name: 'setTotalBoxSwapByPoint',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
		name: 'supportsInterface',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
		name: 'tokenByIndex',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'owner', type: 'address' },
			{ internalType: 'uint256', name: 'index', type: 'uint256' },
		],
		name: 'tokenOfOwnerByIndex',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'tokenPoint',
		outputs: [{ internalType: 'contract IERC20Upgradeable', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
		name: 'tokenURI',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'user', type: 'address' },
			{ internalType: 'uint256', name: 'cursor', type: 'uint256' },
			{ internalType: 'uint256', name: 'size', type: 'uint256' },
		],
		name: 'tokensOfOwnerBySize',
		outputs: [
			{ internalType: 'uint256[]', name: '', type: 'uint256[]' },
			{ internalType: 'uint256', name: '', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'totalBoxSwapPointToBox',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'from', type: 'address' },
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'tokenId', type: 'uint256' },
		],
		name: 'transferFrom',
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
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'typeBoxs',
		outputs: [
			{ internalType: 'uint256', name: 'typeBuy', type: 'uint256' },
			{ internalType: 'uint256', name: 'typeBox', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{ inputs: [], name: 'unsetPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
];

const NinnekoAddress = '0x6cad12b3618a3c7ef1feb6c91fdc3251f58c2a90';
const TokenABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'owner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'spender', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Approval',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'to', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Transfer',
		type: 'event',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'owner', type: 'address' },
			{ internalType: 'address', name: 'spender', type: 'address' },
		],
		name: 'allowance',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'approve',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'decimals',
		outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
		],
		name: 'decreaseAllowance',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'addedValue', type: 'uint256' },
		],
		name: 'increaseAllowance',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'name',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'recipient', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'transfer',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'sender', type: 'address' },
			{ internalType: 'address', name: 'recipient', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'transferFrom',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];
const MAX_APPROVE = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const DECIMAL = 1e18;

export const POOL = [
	{
		name: 'NINO',
		poolId: 0,
		approved: false,
	},
];

export const setPool = () => {
	console.log('dsafsdafsdafdsafdsfdsafasd');

	let web3 = getWeb3();
	if (!web3) web3 = new Web3(NETWORK_RPC_URL);
	// const web3 = new Web3(NETWORK_RPC_URL);
	const ninnekoStaking = web3 && new web3.eth.Contract(NinnekoStakingABI, NinnekoStakingAddress);

	console.log('sdafsdafsadfsdaf------------------------');
	//handleResult(ninnekoStaking.methods.add("0x6CAD12b3618a3C7ef1FEb6C91FdC3251f58c2a90", 12863309,13699441), null, () => {console.log("Done")}, () => {console.log("Failed")});
	ninnekoStaking.methods.add('0x6CAD12b3618a3C7ef1FEb6C91FdC3251f58c2a90', 12863309, 13699441).send({
		from: getWalletAddress(),
	});
	console.log('sdafsdafsadfsdaf------------------');
};

export const fetchPoolInfo = async () => {
	let web3 = getWeb3();
	if (!web3) web3 = new Web3(NETWORK_RPC_URL);
	// const web3 = new Web3(NETWORK_RPC_URL);
	const ninnekoStaking = web3 && new web3.eth.Contract(NinnekoStakingABI, NinnekoStakingAddress);

	var pools = [];
	for (let i = 0; i < POOL.length; i++) {
		let pool = POOL[i];
		//console.log("call poolInfo");
		if (web3 !== null) {
			var poolInfo = await ninnekoStaking.methods
				.poolInfo(pool.poolId)
				.call({ from: null })
				.then((data) => {
					var total = data.total / DECIMAL;
					var apy = 300;
					if (total > 600000) {
						apy = 274619 / Math.sqrt(total) - 75;
					}
					if (apy < 48) apy = 48;
					return {
						name: pool.name,
						poolId: pool.poolId,
						tokenContract: data.lpToken,
						staked: total.format(2),
						apy: apy.format(2),
						approved: false,
					};
				})
				.then(async (poolInfo) => {
					const address = await getWalletAddress();
					if (address !== null) {
						await ninnekoStaking.methods
							.pendingPoint(pool.poolId, address)
							.call({ from: address })
							.then((data) => {
								poolInfo.pendingPoint = data;
							});
						await ninnekoStaking.methods
							.userInfo(pool.poolId, address)
							.call({ from: address })
							.then((data) => {
								console.log('data.unclaimed/DECIMAL=' + data.unclaimed / DECIMAL);
								console.log('data.amount/DECIMAL=' + data.amount / DECIMAL);
								console.log('poolInfo.pendingPoint/DECIMAL=' + poolInfo.pendingPoint / DECIMAL);
								poolInfo.unclaim = (poolInfo.pendingPoint / DECIMAL + data.unclaimed / DECIMAL).format(
									2
								);
								poolInfo.myStake = (data.amount / DECIMAL).format(2);
							});
						var tokenContract = poolInfo.tokenContract;
						const tokenLP = new web3.eth.Contract(TokenABI, tokenContract);
						await tokenLP.methods
							.allowance(address, NinnekoStakingAddress)
							.call({ from: address })
							.then((data) => {
								poolInfo.approved = data > 0;
								return poolInfo;
							});
					}
					return poolInfo;
				});
			pools.push(poolInfo);
		}
	}
	return pools;
};

export const fetchPointInfo = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address != null) {
		const ninnekoStake = new web3.eth.Contract(NinnekoStakeABI, NinnekoStakeAddress);
		return await ninnekoStake.methods
			.balanceOf(address)
			.call({ from: address })
			.then((data) => {
				return (data / DECIMAL).format(2);
			});
	}
	return 0;
};

export const getNumberOfNINO = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address != null) {
		const ninneko = new web3.eth.Contract(TokenABI, NinnekoAddress);
		return await ninneko.methods
			.balanceOf(address)
			.call({ from: address })
			.then((data) => {
				return Math.floor(data / DECIMAL) + '';
			});
	}
	return 0;
};

export const checkAllowanceBuyNFT = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();
	if (web3 !== null && address != null) {
		const ninnekoStake = new web3.eth.Contract(NinnekoStakeABI, NinnekoStakeAddress);
		return await ninnekoStake.methods
			.allowance(address, NinnekoBoxAddress)
			.call({ from: address })
			.then((data) => {
				return data > 0;
			});
	}
	return false;
};

export const getNFTBox = async () => {
	const result[] = [];
	const web3 = getWeb3();
	const address = await getWalletAddress();
	if (address != null) {
		const ninnekoBox = new web3.eth.Contract(NinnekoBoxABI, NinnekoBoxAddress);
		await ninnekoBox.methods
			.getTokensInfoOfAddress(address)
			.call({ from: address })
			.then((data[]) => {
				var boxId = data[0];
				var boxType = data[1];
				for (let i = 0; i < boxId.length; i++) {
					result.push({ boxId: boxId[i], boxType: boxType[i].typeBox });
				}
			});
	}
	return result;
};

export const approveContract = (tokenContract, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const tokenLP = new web3.eth.Contract(TokenABI, tokenContract);
	handleResult(tokenLP.methods.approve(NinnekoStakingAddress, MAX_APPROVE), snackbar, onComplete, onError);
};

export const deposit = (pool, amount, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoStaking = new web3.eth.Contract(NinnekoStakingABI, NinnekoStakingAddress);
	handleResult(ninnekoStaking.methods.deposit(pool, web3.utils.toWei(amount)), snackbar, onComplete, onError);
};

export const harvestPool = (pool, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoStaking = new web3.eth.Contract(NinnekoStakingABI, NinnekoStakingAddress);
	handleResult(ninnekoStaking.methods.harvest(pool), snackbar, onComplete, onError);
};

export const withdrawAll = (pool, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const address = getWalletAddress();
	const ninnekoStaking = new web3.eth.Contract(NinnekoStakingABI, NinnekoStakingAddress);
	ninnekoStaking.methods
		.userInfo(pool, address)
		.call({ from: address })
		.then((data) => {
			return handleResult(ninnekoStaking.methods.withdraw(pool, data.amount + ''), snackbar, onComplete, onError);
		});
};

export const approveBuyNFT = (snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoStake = new web3.eth.Contract(NinnekoStakeABI, NinnekoStakeAddress);
	handleResult(ninnekoStake.methods.approve(NinnekoBoxAddress, MAX_APPROVE), snackbar, onComplete, onError);
};

export const buyNFTBox = (boxType, amount, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoBox = new web3.eth.Contract(NinnekoBoxABI, NinnekoBoxAddress);
	handleResult(ninnekoBox.methods.SwapPointToBox(boxType, amount), snackbar, onComplete, onError);
};
