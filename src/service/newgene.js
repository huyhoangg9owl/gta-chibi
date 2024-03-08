import sessionData from '../sessionData';
import { TEST_NET } from '../util/constants';
import { MIN_CONTRACT_ABI } from '../util/contract';
import { MATA_CONTRACT_ADDRESS, NINO_CONTRACT_ADDRESS, getWalletAddress, getWeb3 } from '../util/cryptoWallet';
import { handleResult, handleResultOpenNewGeneBox } from '../util/utils';

const NinnekoBoxAddress = TEST_NET
	? '0x4EA28d35AeAacD6A0eB62f539ec10cD1361a92c6'
	: '0x5df4d874284DEcFc029a5426B147546D89d4Ef76';
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
			{ indexed: true, internalType: 'address', name: 'buyer', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'boxType', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'quantity', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'nino', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'mata', type: 'uint256' },
		],
		name: 'BuyBoxes',
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
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'boxId', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'boxType', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'petId', type: 'uint256' },
		],
		name: 'OpenBox',
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
		inputs: [{ internalType: 'address', name: '_operator', type: 'address' }],
		name: 'addOperator',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: '_boxType', type: 'uint256' },
			{ internalType: 'uint256[]', name: '_petIds', type: 'uint256[]' },
		],
		name: 'addPets',
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
		inputs: [
			{ internalType: 'uint256', name: '_boxType', type: 'uint256' },
			{ internalType: 'uint256', name: '_quantity', type: 'uint256' },
		],
		name: 'buyBoxes',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_boxType', type: 'uint256' }],
		name: 'countPetsInContract',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
		inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
		name: 'isBlacklisted',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'pure',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'mataPrices',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'mataReceiver',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'mataToken',
		outputs: [{ internalType: 'contract IERC20Upgradeable', name: '', type: 'address' }],
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
		name: 'ninnekoNFT',
		outputs: [{ internalType: 'contract IERC721Upgradeable', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'ninoPrices',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'ninoReceiver',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'ninoToken',
		outputs: [{ internalType: 'contract IERC20Upgradeable', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '', type: 'address' },
			{ internalType: 'address', name: '', type: 'address' },
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'bytes', name: '', type: 'bytes' },
		],
		name: 'onERC721Received',
		outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_boxId', type: 'uint256' }],
		name: 'openBox',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'operators',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
		inputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'uint256', name: '', type: 'uint256' },
		],
		name: 'pets',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
			{ internalType: 'uint256[]', name: '_tokenIds', type: 'uint256[]' },
		],
		name: 'recoverNFT',
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
	{
		inputs: [{ internalType: 'address', name: '_operator', type: 'address' }],
		name: 'removeOperator',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [{ internalType: 'uint256', name: '_boxType', type: 'uint256' }],
		name: 'resetPets',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
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
	{
		inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
		name: 'setNinnekoNFT',
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
		inputs: [
			{ internalType: 'uint256', name: '_boxType', type: 'uint256' },
			{ internalType: 'uint256', name: '_nino', type: 'uint256' },
			{ internalType: 'uint256', name: '_mata', type: 'uint256' },
		],
		name: 'setPrices',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_ninoReceiver', type: 'address' },
			{ internalType: 'address', name: '_mataReceiver', type: 'address' },
		],
		name: 'setReceivers',
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
		inputs: [
			{ internalType: 'address', name: '_ninoToken', type: 'address' },
			{ internalType: 'address', name: '_mataToken', type: 'address' },
		],
		name: 'setTokens',
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

const NinnekoAddress = TEST_NET
	? '0x00738A3b92AcD2962202eE3370E91a068bcABC50'
	: '0x6cad12b3618a3c7ef1feb6c91fdc3251f58c2a90';
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

const SapphireStakingAddress = TEST_NET
	? '0x94233Dbeb49ef26D23291A1e8bf32C55f099baC0'
	: '0x87ab02FD181144E8C8e3f146c850681F7200ef0A';
const SapphireStakingABI = TEST_NET
	? [
			{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
			{
				anonymous: false,
				inputs: [
					{ indexed: false, internalType: 'address', name: 'buyer', type: 'address' },
					{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
				],
				name: 'BuyBox',
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
					{ indexed: false, internalType: 'address', name: 'staker', type: 'address' },
					{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
				],
				name: 'Stake',
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
					{ indexed: false, internalType: 'address', name: 'staker', type: 'address' },
					{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
				],
				name: 'UnStake',
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
				name: 'NINOToken',
				outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
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
				name: 'TIME_LINEAR',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'addressBoughtBoxNino',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'addressNinoReceiver',
				outputs: [{ internalType: 'address', name: '', type: 'address' }],
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
				inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
				name: 'buyNFTBox',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_newOwner', type: 'address' }],
				name: 'changeNinnekoBoxFactoryOwner',
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
				name: 'enableWhiteList',
				outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
				inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
				name: 'getBalanceRemainingUnstake',
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
				inputs: [],
				name: 'getTimeUnstakeNext',
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
				inputs: [],
				name: 'ninnekoBoxFactory',
				outputs: [{ internalType: 'contract NinnekoBoxFactory', name: '', type: 'address' }],
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
				inputs: [],
				name: 'priceNinoPerBox',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'address', name: '_token', type: 'address' },
					{ internalType: 'uint256[]', name: '_tokenIds', type: 'uint256[]' },
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
				inputs: [{ internalType: 'address', name: '_addNINO', type: 'address' }],
				name: 'setAddressNino',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'bool', name: '_enableWhiteList', type: 'bool' }],
				name: 'setEnableWhiteList',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
				name: 'setMaxBoxSell',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'setNinnekoBoxFactoryAddress',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'setNinoReceiver',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{ inputs: [], name: 'setPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [{ internalType: 'uint256', name: '_price', type: 'uint256' }],
				name: 'setPriceNinoPerBox',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_timeEndSale', type: 'uint256' }],
				name: 'setTimeEndSale',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_timeStartStake', type: 'uint256' }],
				name: 'setTimeStartStake',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'address[]', name: '_addressWhiteList', type: 'address[]' },
					{ internalType: 'uint256[]', name: '_amounts', type: 'uint256[]' },
				],
				name: 'setWhiteList',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
				name: 'stake',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'startTime',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'timeEndSale',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'timeStartStake',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'totalBoxSold',
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
			{
				inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				name: 'typeBoxs',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{ inputs: [], name: 'unStake', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{ inputs: [], name: 'unsetPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'whiteList',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
	  ]
	: [
			{
				anonymous: false,
				inputs: [
					{ indexed: false, internalType: 'address', name: 'buyer', type: 'address' },
					{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
				],
				name: 'BuyBox',
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
					{ indexed: false, internalType: 'address', name: 'staker', type: 'address' },
					{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
				],
				name: 'Stake',
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
					{ indexed: false, internalType: 'address', name: 'staker', type: 'address' },
					{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
				],
				name: 'UnStake',
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
				name: 'NINOToken',
				outputs: [{ internalType: 'contract IERC20Upgradeable', name: '', type: 'address' }],
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
				name: 'addressBoughtBoxNino',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'addressNinoReceiver',
				outputs: [{ internalType: 'address', name: '', type: 'address' }],
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
				inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
				name: 'buyNFTBox',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_newOwner', type: 'address' }],
				name: 'changeNinnekoBoxFactoryOwner',
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
				inputs: [{ internalType: 'address', name: '_addr', type: 'address' }],
				name: 'getBalanceRemainingUnstake',
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
				inputs: [],
				name: 'getTimeUnstakeNext',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{ inputs: [], name: 'initialize', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [],
				name: 'maxBoxSale',
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
				inputs: [],
				name: 'ninnekoBoxFactory',
				outputs: [{ internalType: 'contract NinnekoBoxFactory', name: '', type: 'address' }],
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
				inputs: [],
				name: 'pausedStake',
				outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'priceNinoPerBox',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'address', name: '_token', type: 'address' },
					{ internalType: 'uint256[]', name: '_tokenIds', type: 'uint256[]' },
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
				inputs: [{ internalType: 'address', name: '_addNINO', type: 'address' }],
				name: 'setAddressNino',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'bool', name: '_enableWhiteList', type: 'bool' }],
				name: 'setEnableWhiteList',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
				name: 'setMaxBoxSell',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'setNinnekoBoxFactoryAddress',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '_add', type: 'address' }],
				name: 'setNinoReceiver',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{ inputs: [], name: 'setPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [{ internalType: 'bool', name: '_pausedStake', type: 'bool' }],
				name: 'setPauseStake',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_price', type: 'uint256' }],
				name: 'setPriceNinoPerBox',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_timeEndSale', type: 'uint256' }],
				name: 'setTimeEndSale',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_timeEndStake', type: 'uint256' }],
				name: 'setTimeEndStake',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_timeStartStake', type: 'uint256' }],
				name: 'setTimeStartStake',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_timeUnlockStake', type: 'uint256' }],
				name: 'setTimeUnlockStake',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [
					{ internalType: 'address[]', name: '_addressWhiteList', type: 'address[]' },
					{ internalType: 'uint256[]', name: '_amounts', type: 'uint256[]' },
				],
				name: 'setWhiteList',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
				name: 'stake',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'startTime',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'timeEndSale',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'timeEndStake',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'timeStartStake',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'timeUnlockStake',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'totalBoxSold',
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
			{
				inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				name: 'typeBoxs',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
			{ inputs: [], name: 'unStake', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{ inputs: [], name: 'unsetPause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
			{
				inputs: [{ internalType: 'address', name: '', type: 'address' }],
				name: 'whiteList',
				outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
				stateMutability: 'view',
				type: 'function',
			},
	  ];

const MAX_APPROVE = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const DECIMAL = 1e18;

export const getNumberOfNINO = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
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

export const checkApproveStakingContract = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const ninneko = new web3.eth.Contract(TokenABI, NinnekoAddress);
		return await ninneko.methods
			.allowance(address, SapphireStakingAddress)
			.call({ from: address })
			.then((data) => {
				return data > 0;
			});
	}

	return false;
};

export const approveSapphireStaking = (snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninneko = new web3.eth.Contract(TokenABI, NinnekoAddress);
	handleResult(ninneko.methods.approve(SapphireStakingAddress, MAX_APPROVE), snackbar, onComplete, onError);
};

export const stake = (stakeValue, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const shapphireStaking = new web3.eth.Contract(SapphireStakingABI, SapphireStakingAddress);
	handleResult(shapphireStaking.methods.stake(web3.utils.toWei(stakeValue)), snackbar, onComplete, onError);
};

export const buyNewGeneBox = (amount, snackbar, onComplete, onError, priceValue) => {
	const web3 = getWeb3();
	const contractBuyBox = new web3.eth.Contract(NinnekoBoxABI, NinnekoBoxAddress);
	let buyPrice = priceValue * DECIMAL;
	handleResult(contractBuyBox.methods.buyBoxes(5, amount), snackbar, onComplete, onError, buyPrice);
};

export const unstake = (snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const shapphireStaking = new web3.eth.Contract(SapphireStakingABI, SapphireStakingAddress);
	handleResult(shapphireStaking.methods.unStake(), snackbar, onComplete, onError);
};

export const getNINOStaked = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address !== null) {
		const shapphireStaking = new web3.eth.Contract(SapphireStakingABI, SapphireStakingAddress);
		return await shapphireStaking.methods
			.getBalanceRemainingUnstake(address)
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
		const ninnekoVesting = new web3.eth.Contract(SapphireStakingABI, SapphireStakingAddress);
		return await ninnekoVesting.methods
			.getBalanceAvailable(address)
			.call({ from: address })
			.then((data) => {
				return Math.floor(data / DECIMAL) + '';
			});
	}
	return 0;
};

export const checkApproveNINO = (setBoolApproveNINO) => {
	return checkApprove(NINO_CONTRACT_ADDRESS, setBoolApproveNINO);
};

export const checkApproveMATA = (setBoolApproveMATA) => {
	return checkApprove(MATA_CONTRACT_ADDRESS, setBoolApproveMATA);
};

export const checkApprove = async (contractAddress, setBoolApprove) => {
	const myAddress = sessionData.myAddress;
	const web3 = getWeb3();
	if (!myAddress) {
		console.log('chua co adderss ' + contractAddress);
		return false;
	}
	let contract = new web3.eth.Contract(MIN_CONTRACT_ABI, contractAddress);

	await contract.methods
		.allowance(myAddress, NinnekoBoxAddress)
		.call()
		.then((amount) => {
			if (amount < 1) {
				//chưa approve
				setBoolApprove(false);
			} else {
				setBoolApprove(true);
			}
		});
};

export const approveNINO = (enqueueSnackbar, onComplete, onError) => {
	//await getWalletAddressAsync()
	allowance(NINO_CONTRACT_ADDRESS, enqueueSnackbar, onComplete, onError);

	// loadingApproveNINO = false
	// setBoolApproveNINO(true);
};

export const approveMATA = (enqueueSnackbar, onComplete, onError) => {
	allowance(MATA_CONTRACT_ADDRESS, enqueueSnackbar, onComplete, onError);
	// setBoolApproveMATA(true);
};

export const allowance = (contractAddress, enqueueSnackbar, onComplete, onError) => {
	const myAddress = sessionData.myAddress;
	const web3 = getWeb3();
	if (!myAddress) {
		console.log('chua co adderss ' + contractAddress);
		return;
	}
	let contract = new web3.eth.Contract(MIN_CONTRACT_ABI, contractAddress);

	contract.methods
		.allowance(myAddress, NinnekoBoxAddress)
		.call()
		.then((amount) => {
			console.log('check xem chua allow thi amount bang may  mmmmmmmmmmmmmmmmmmmm = ' + amount);
			if (amount < 1) {
				//chưa approve
				approve(contractAddress, enqueueSnackbar, onComplete, onError);
			}
		});
};

export const approve = (contractAddress, enqueueSnackbar, onComplete, onError) => {
	const web3 = getWeb3();
	let contract = new web3.eth.Contract(MIN_CONTRACT_ABI, contractAddress);
	const amount = '' + web3.utils.toHex(MAX_APPROVE);

	handleResult(contract.methods.approve(NinnekoBoxAddress, amount), enqueueSnackbar, onComplete, onError);
};

export const approveNewGeneBoxHandler = (snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoBox = new web3.eth.Contract(NinnekoBoxABI, NinnekoBoxAddress);

	handleResult(ninnekoBox.methods.setApprovalForAll(NinnekoBoxAddress, true), snackbar, onComplete, onError);
};

export const checkApproveNewGeneBoxHandler = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address != null) {
		const ninnekoBox = new web3.eth.Contract(NinnekoBoxABI, NinnekoBoxAddress);
		return await ninnekoBox.methods
			.isApprovedForAll(address, NinnekoBoxAddress)
			.call({ from: address })
			.then((data) => {
				//console.log(data)
				return data;
			});
	}

	return false;
};

export const openNFTNewGeneBox = (boxId, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const boxHandle = new web3.eth.Contract(NinnekoBoxABI, NinnekoBoxAddress);

	handleResultOpenNewGeneBox(boxHandle.methods.openBox(boxId), snackbar, onComplete, onError);
};
