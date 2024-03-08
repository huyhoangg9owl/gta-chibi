import { ApolloProvider } from '@apollo/client';
import { Button } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { createRef, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MySnackMessage } from './component/Misc/MySnackMessage';
import { PATH } from './config/routes';
import { TwoRowLayout } from './layout/TwoRowLayout';
import { BuyToken } from './page/BuyToken';
import { Chapters } from './page/Chapters';
import { Home } from './page/Home';
import { MarketPlace } from './page/MarketPlace';
import { Play } from './page/Play';
import { Roadmap } from './page/Roadmap';
import { Vision } from './page/Vision';
import sessionData from './sessionData';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { client } from './util/apollo';
import { NETWORK_VERSION, WALLETCONNECT_PROVIDER } from './util/constants';
import { getNetworkVersion, getProviderType, getWeb3, initWallet, switchToBSCNetwork } from './util/cryptoWallet';
import history from './util/myHistory';

sessionData.getSessionData();

// add action to all snackbars
const notistackRef = createRef();
const onClickDismiss = (key) => () => {
	if (notistackRef.current) notistackRef.current.closeSnackbar(key);
};

//setPool()

function App() {
	const [isIntroFinished, setIsIntroFinished] = useState(false);
	const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

	useEffect(() => {
		initWallet();
		if (sessionData.userId) {
			getNetworkVersion().then((networkVersion) => {
				if (networkVersion !== NETWORK_VERSION) {
					switchToBSCNetwork(history);
				}
			});
		}
	}, []);

	useEffect(() => {
		window.addEventListener('load', () => {
			const _web3 = getWeb3();

			if (!_web3) return;

			_web3.currentProvider.on('accountsChanged', async () => {
				sessionData.logOut();
				if (getProviderType() === WALLETCONNECT_PROVIDER) {
					await _web3.currentProvider.disconnect();
				}
			});

			_web3.currentProvider.on('networkChanged', async (networkId) => {
				if (networkId !== NETWORK_VERSION) {
					sessionData.logOut();
					if (getProviderType() === WALLETCONNECT_PROVIDER) {
						await _web3.currentProvider.disconnect();
					}
				}
			});

			_web3.currentProvider.on('disconnect', async () => {
				sessionData.logOut();
				if (getProviderType() === WALLETCONNECT_PROVIDER) {
					await _web3.currentProvider.disconnect();
				}
			});
		});
	}, []);

	return (
		<ThemeConfig>
			<GlobalStyles />
			<ApolloProvider client={client}>
				<SnackbarProvider
					ref={notistackRef}
					action={(key) => (
						<Button onClick={onClickDismiss(key)} size="small" color="inherit" variant="outlined">
							Dismiss
						</Button>
					)}
					content={(key, message) => {
						if (typeof message === 'string' || message instanceof String) return undefined;
						return <MySnackMessage id={key} message={message} />;
					}}
					maxSnack={3}
					preventDuplicate
				>
					<Routes>
						<Route
							path={PATH.HOME.path}
							element={
								<TwoRowLayout openDrawerMenu={openDrawerMenu} setOpenDrawerMenu={setOpenDrawerMenu} />
							}
						>
							<Route
								index
								element={
									<Home
										isIntroFinished={isIntroFinished}
										setIsIntroFinished={setIsIntroFinished}
										openDrawerMenu={openDrawerMenu}
									/>
								}
							/>
							<Route path={PATH.VISION.path} element={<Vision />} />
							<Route path={PATH.CHAPTERS.path} element={<Chapters />} />
							<Route path={PATH.BUYTOKEN.path} element={<BuyToken />} />
							<Route path={PATH.ROADMAP.path} element={<Roadmap />} />
							<Route path={PATH.MARKETPLACE.path} element={<MarketPlace />} />
							<Route path={PATH.PLAY.path} element={<Play />} />
						</Route>
					</Routes>
				</SnackbarProvider>
			</ApolloProvider>
		</ThemeConfig>
	);
}

export default App;
