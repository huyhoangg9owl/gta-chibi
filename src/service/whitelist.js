import Web3 from 'web3';
import { handleResult, handleResultOpenRubyBox, handleResultOpenCottonBox } from '../util/utils';
import { NETWORK_RPC_URL, TEST_NET } from '../util/constants';
import { getWalletAddress, getWeb3 } from '../util/cryptoWallet';
import NinnekoBoxABI from '../data/NinnekoBoxABI.json';
import NinnekoWhitelistABI from '../data/NinnekoWhitelistABI.json';
import TokenABI from '../data/TokenABI.json';
import WhitelistShopABI from '../data/WhitelistShopABI.json';
import NinnekoBoxHandleABI from '../data/NinnekoBoxHandleABI.json';

const NinnekoWhitelistAddress = TEST_NET
	? '0xD0042E3d3fD3dEE577b2757ccCD6eC4353b5d624'
	: '0x3184b756d98f898036697b7ecaa6f412ddf29194';

const NinnekoBoxAddress = TEST_NET
	? '0x4EA28d35AeAacD6A0eB62f539ec10cD1361a92c6'
	: '0x5df4d874284DEcFc029a5426B147546D89d4Ef76';

const NinnekoAddress = TEST_NET
	? '0x00738A3b92AcD2962202eE3370E91a068bcABC50'
	: '0x6cad12b3618a3c7ef1feb6c91fdc3251f58c2a90';

const WhitelistShopAddress = TEST_NET
	? '0x014296f21e86683980f66d94340b8814f14F7f61'
	: '0xd6Ac081926352a993b095469E8A2CDDf74AfD844';

const NinnekoBoxHanldeAddress = TEST_NET
	? '0x0a278805eBbF7C699Fe3D22869a4EE42EDC8b081'
	: '0x2d68b3a99f281938d7774a5e77b52c0bd103df28';

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
	// console.log("dsafsdafsdafdsafdsfdsafasd");

	let web3 = getWeb3();
	if (!web3) web3 = new Web3(NETWORK_RPC_URL);
	// const web3 = new Web3(NETWORK_RPC_URL);
	const ninnekoWhitelist = web3 && new web3.eth.Contract(NinnekoWhitelistABI, NinnekoWhitelistAddress);

	// console.log("sdafsdafsadfsdaf------------------------");
	//handleResult(ninnekoWhitelist.methods.add("0x6CAD12b3618a3C7ef1FEb6C91FdC3251f58c2a90", 12863309,13699441), null, () => {console.log("Done")}, () => {console.log("Failed")});
	ninnekoWhitelist.methods.add(NinnekoAddress, 12863309, 13699441).send({
		from: getWalletAddress(),
	});
	// console.log("sdafsdafsadfsdaf------------------");
};

export const fetchPoolInfo = async () => {
	let web3 = getWeb3();
	if (!web3) web3 = new Web3(NETWORK_RPC_URL);
	// const web3 = new Web3(NETWORK_RPC_URL);
	const ninnekoWhitelist = web3 && new web3.eth.Contract(NinnekoWhitelistABI, NinnekoWhitelistAddress);

	var pools = [];
	for (let i = 0; i < POOL.length; i++) {
		let pool = POOL[i];
		//console.log("call poolInfo");
		if (web3 !== null) {
			const ninneko = new web3.eth.Contract(TokenABI, NinnekoAddress);
			var totalWhitelist = await ninneko.methods
				.balanceOf(NinnekoWhitelistAddress)
				.call({ from: null })
				.then((totalWhitelist) => {
					return totalWhitelist / DECIMAL;
				});

			var poolInfo = await ninnekoWhitelist.methods
				.poolInfo(pool.poolId)
				.call({ from: null })
				.then((poolInfo) => {
					const rewardPerBlock = 0.01;
					return {
						name: pool.name,
						poolId: pool.poolId,
						totalWhitelist: totalWhitelist,
						tokenContract: poolInfo.lpToken,
						rewardPerBlock,
						approved: false,
					};
				})
				.then(async (poolInfo) => {
					const address = await getWalletAddress();

					if (address !== null) {
						await ninnekoWhitelist.methods
							.getPoint(pool.poolId, address)
							.call({ from: address })
							.then((point) => {
								poolInfo.myEntries = (point / 2880000 / DECIMAL).toFixed(2);
							});
						await ninnekoWhitelist.methods
							.userInfo(pool.poolId, address)
							.call({ from: address })
							.then((userInfo) => {
								// console.log("data.amount/DECIMAL="+userInfo.amount/DECIMAL);
								// console.log("poolInfo.getPoint/DECIMAL="+poolInfo.myEntries/DECIMAL);
								poolInfo.myWhitelist = Math.round(userInfo.amount / DECIMAL);
							});
						var tokenContract = poolInfo.tokenContract;
						const tokenLP = new web3.eth.Contract(TokenABI, tokenContract);
						await tokenLP.methods
							.allowance(address, NinnekoWhitelistAddress)
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

export const fetchRanking = async () => {
	let pool = POOL[0];
	let web3 = getWeb3();
	if (!web3) web3 = new Web3(NETWORK_RPC_URL);
	// if (!web3) web3 = new Web3(NETWORK_RPC_URL);
	// const address = await getWalletAddress();

	if (web3 !== null) {
		const ninnekoWhitelist = new web3.eth.Contract(NinnekoWhitelistABI, NinnekoWhitelistAddress);
		// console.log("-------1--------")
		return await ninnekoWhitelist.methods
			.getAllStaker(pool.poolId)
			.call({ from: null })
			.then((data) => {
				// console.log("-------2--------")
				let arrPoint = data[0];
				let limited = arrPoint.length > 500 ? 500 : arrPoint.length;
				let arrAddress = data[1];
				let sortedData = [];
				let limitedData = [];

				// console.log("limited: " +limited)

				for (let i = 0; i < arrAddress.length; i++) {
					let cutAddress =
						arrAddress[i].substring(0, 6) +
						'...' +
						arrAddress[i].substring(arrAddress[i].length - 6, arrAddress[i].length);
					sortedData.push({
						top: 0,
						address: cutAddress,
						point: (arrPoint[i] / 2880000 / DECIMAL).toFixed(6),
					});
				}

				sortedData.sort(function (a, b) {
					return b.point - a.point;
				});

				for (let i = 0; i < limited; i++) {
					sortedData[i].top = i + 1;
					limitedData.push(sortedData[i]);
					// console.log("top: " + sortedData[i].top)
					// console.log("address: " + sortedData[i].address)
					// console.log("ranking: " + sortedData[i].ranking)
				}
				return limitedData;
			});
	}
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

export const approveContract = (tokenContract, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninneko = new web3.eth.Contract(TokenABI, tokenContract);
	handleResult(ninneko.methods.approve(NinnekoWhitelistAddress, MAX_APPROVE), snackbar, onComplete, onError);
};

export const deposit = (pool, amount, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoWhitelist = new web3.eth.Contract(NinnekoWhitelistABI, NinnekoWhitelistAddress);
	handleResult(ninnekoWhitelist.methods.deposit(pool, web3.utils.toWei(amount)), snackbar, onComplete, onError);
};

export const checkAllowanceBuyNFT = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();
	if (web3 !== null && address != null) {
		const ninneko = new web3.eth.Contract(TokenABI, NinnekoAddress);
		return await ninneko.methods
			.allowance(address, WhitelistShopAddress)
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
			.then((data) => {
				var boxId = data[0];
				var boxType = data[1];
				for (let i = 0; i < boxId.length; i++) {
					result.push({ boxId: boxId[i], boxType: boxType[i].typeBox });
				}
			});
	}
	return result;
};

export const approveBuyNFT = (snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninneko = new web3.eth.Contract(TokenABI, NinnekoAddress);
	handleResult(ninneko.methods.approve(WhitelistShopAddress, MAX_APPROVE), snackbar, onComplete, onError);
};

export const buyNFTBox = (amount, snackbar, onComplete, onError, priceValue) => {
	const web3 = getWeb3();
	const whitelistShop = new web3.eth.Contract(WhitelistShopABI, WhitelistShopAddress);
	let buyPrice = priceValue * DECIMAL;
	handleResult(whitelistShop.methods.buyNFTBox(amount), snackbar, onComplete, onError, buyPrice);
};

export const withdrawAll = (pool, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const address = getWalletAddress();
	const ninnekoWhitelist = new web3.eth.Contract(NinnekoWhitelistABI, NinnekoWhitelistAddress);
	ninnekoWhitelist.methods
		.userInfo(pool, address)
		.call({ from: address })
		.then((data) => {
			return handleResult(
				ninnekoWhitelist.methods.withdraw(pool, data.amount + ''),
				snackbar,
				onComplete,
				onError
			);
		});
};

export const approveBoxHandler = (snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoBoxHandle = new web3.eth.Contract(NinnekoBoxABI, NinnekoBoxAddress);

	handleResult(
		ninnekoBoxHandle.methods.setApprovalForAll(NinnekoBoxHanldeAddress, true),
		snackbar,
		onComplete,
		onError
	);
};

export const checkApproveBoxHandler = async () => {
	const web3 = getWeb3();
	const address = await getWalletAddress();

	if (web3 !== null && address != null) {
		const ninnekoBox = new web3.eth.Contract(NinnekoBoxABI, NinnekoBoxAddress);
		return await ninnekoBox.methods
			.isApprovedForAll(address, NinnekoBoxHanldeAddress)
			.call({ from: address })
			.then((data) => {
				return data;
			});
	}

	return false;
};

export const openNFTRubyBox = (boxId, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoBoxHandle = new web3.eth.Contract(NinnekoBoxHandleABI, NinnekoBoxHanldeAddress);

	handleResultOpenRubyBox(ninnekoBoxHandle.methods.OpenBox(boxId), snackbar, onComplete, onError);
};

export const openNFTCottonBox = (boxId, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoBoxHandle = new web3.eth.Contract(NinnekoBoxHandleABI, NinnekoBoxHanldeAddress);

	handleResultOpenCottonBox(ninnekoBoxHandle.methods.OpenBox(boxId), snackbar, onComplete, onError);
};

export const openMATABox = (boxId, snackbar, onComplete, onError) => {
	const web3 = getWeb3();
	const ninnekoBoxHandle = new web3.eth.Contract(NinnekoBoxHandleABI, NinnekoBoxHanldeAddress);

	handleResult(ninnekoBoxHandle.methods.OpenBox(boxId), snackbar, onComplete, onError);
};
