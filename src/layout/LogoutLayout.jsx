//import { disconnectWallet } from "../service/cryptoWallet";
import sessionData from '../sessionData';
import { WALLETCONNECT_PROVIDER } from '../util/constants';
import { getProviderType, getWeb3 } from '../util/cryptoWallet';

const logOut = async () => {
	if (getProviderType() === WALLETCONNECT_PROVIDER) {
		const web3 = getWeb3();
		const provider = web3.currentProvider;
		await provider.disconnect();
	}
	sessionData.logOut();
};

export function LogOutLayout() {
	logOut();

	return <div />;
}
