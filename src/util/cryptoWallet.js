import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import sessionData from '../sessionData';
import { METAMASK_PROVIDER, NETWORK_CONFIG, NETWORK_VERSION_HEX, TEST_NET, WALLETCONNECT_PROVIDER } from './constants';
import { linkToHome } from './link';
import { BrowserHistory } from 'history';

export const MATA_CONTRACT_ADDRESS = TEST_NET
	? '0x6A01F32F15d4C245F14A35d67A83A2bDf7528E07'
	: '0x175fAcDD947C995ad547F6AD952D26826758A4dA';
export const NINO_CONTRACT_ADDRESS = TEST_NET
	? '0x00738A3b92AcD2962202eE3370E91a068bcABC50'
	: '0x6cad12b3618a3c7ef1feb6c91fdc3251f58c2a90';

let web3 = null;
let provider = null;
let providerType = null;

export const updateWeb3Provider = (p) => {
	console.log('update Provider:', p);
	if (p === METAMASK_PROVIDER) {
		providerType = METAMASK_PROVIDER;
		provider = window.ethereum;
		web3 = new Web3(provider);
	}
	if (p === WALLETCONNECT_PROVIDER) {
		providerType = WALLETCONNECT_PROVIDER;
		provider = new WalletConnectProvider({
			//infuraId: '5f74127583e24c7d83c33a14811b2dfb',
			// chainId:97,
			rpc: {
				// 97: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
				56: 'https://bsc-dataseed.binance.org/',
			},
			chainId: 56,
		});
		web3 = new Web3(provider);
	}

	//console.log(web3)
};

export const initWallet = async () => {
	sessionData.provider && updateWeb3Provider(sessionData.provider);

	if (provider && providerType === WALLETCONNECT_PROVIDER) {
		console.log(provider.wc.connected);
		if (!provider.wc.connected) {
			sessionData.logOut();
		} else {
			if (!sessionData.isLoggedIn()) {
				await provider.disconnect();
			} else {
				await provider.enable();
			}
		}
	}

	if (provider && providerType === METAMASK_PROVIDER) {
		await provider.enable();
	}
};

export const getWeb3 = () => {
	return web3;
};

export const getprovider = () => {
	return provider;
};

export const getProviderType = () => {
	return providerType;
};

export const getWalletAddressAsync = async () => {
	try {
		// const accounts = await web3.currentProvider.request({ method: 'eth_accounts' })
		if (web3) {
			const accounts = await web3.eth.getAccounts();
			const myAddress = accounts[0];
			if (myAddress) {
				//đã connect
				console.log('Wallet connected, address: ' + myAddress);
				sessionData.updateAddress(myAddress);
				sessionData.updateProvider(providerType);
				return myAddress;
			} else {
				console.log('Wallet is not connected');
			}
		}
	} catch (error) {
		console.error(error);
	}

	return null;
};

/**
 * Cứ đọc address từ cookie trước, trong khi đó hàm getWalletAddressAsync sẽ chạy và update lại giá trị
 * address cho đúng
 * @returns
 */

export const getWalletAddress = () => {
	//chua lay duoc address, cố gọi thử để lần sau gọi vào sẽ lấy được, lần đầu chấp nhận lỗi
	if (!sessionData.myAddress) {
		//console.log("Try to get MetaMask address");
		return getWalletAddressAsync();
	}
	// console.log("Wallet address was found:",sessionData.myAddress);
	return sessionData.myAddress;
};

export const getWalletBalance = async (address = null) => {
	if (address === null) address = sessionData.myAddress;
	if (address === null) return;
	return web3 && (await web3.eth.getBalance(address).then((result) => web3.utils.fromWei(result, 'ether')));
};

export const switchToBSCNetwork = async (myHistoty = null) => {
	try {
		console.log('---');
		await web3.currentProvider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: NETWORK_VERSION_HEX }],
		});
		console.log('---done');
		//nếu truyền history vào thì refresh, chỉ làm 1 lần tránh lặp vô tận
		if (myHistoty) {
			myHistoty.push(linkToHome);
			myHistoty.back();
		}
	} catch (switchError) {
		console.log(switchError.code);
		// This error code indicates that the chain has not been added to MetaMask.
		// if (switchError.code === 4902) {
		console.log('Chain was not added to Metamask');
		try {
			await web3.currentProvider.request({
				method: 'wallet_addEthereumChain',
				params: NETWORK_CONFIG,
			});
		} catch (addError) {
			// handle "add" error
			console.log('Error adding Chain to Metamask');
			console.log(addError);
		}
		// }
		// handle other "switch" errors
	}
};

export const getNetworkVersion = async () => {
	if (!web3 || !web3.currentProvider) return -1000000;
	return providerType === METAMASK_PROVIDER
		? await web3.currentProvider.request({ method: 'net_version' })
		: web3.currentProvider.chainId;
};

export const getJWT = async (dataForApi) => {
	return await requestConnectWallet(dataForApi);
};

const getWalletAccounts = async (dataForApi) => {
	const myAddress = await getWalletAddressAsync();

	if (myAddress) {
		//đã connect
		console.log('Đã kết nối, địa chỉ: ' + myAddress);
		// requestSignAndRegister(myAddress)
		sessionData.setSessionData(null, null, myAddress, providerType);
		dataForApi.addr = myAddress;
		// await sendAdRefWhenConnectWallet(dataForApi)
		// window.location = linkToHome
		return myAddress;
	} else {
		console.log('Chưa kết nối');
	}
};

export const requestConnectWallet = async (dataForApi) => {
	try {
		await web3.currentProvider.enable();
		return getWalletAccounts(dataForApi);
	} catch (error) {
		console.error(error);
	}
};

export const addTokenErc20 = async (tokenAddress, tokenSymbol) => {
	const tokenDecimals = 18;

	try {
		// 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
		const wasAdded = await window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address: tokenAddress, // The address of the token.
					symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
					decimals: tokenDecimals, // The number of decimals in the token.
					image: 'https://gtachibi.com/images/logo/logo1.png', // A string URL of the token logo.
				},
			},
		});

		if (wasAdded) {
			console.log('Thanks for your interest!');
		} else {
			console.log('Your loss!');
		}
	} catch (error) {
		console.log(error);
	}
};
