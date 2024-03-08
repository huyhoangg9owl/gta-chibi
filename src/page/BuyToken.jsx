import MetaMaskOnboarding from '@metamask/onboarding';
import CheckIcon from '@mui/icons-material/Check';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	InputBase,
	Link,
	Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../component/Footer/Footer';
import { buyToken } from '../service/buyToken';
import sessionData from '../sessionData';
import {
	METAMASK_PROVIDER,
	NETWORK_CONFIG,
	NETWORK_VERSION,
	TOKEN_ADDRESS,
	WALLETCONNECT_PROVIDER,
} from '../util/constants';
import {
	addTokenErc20,
	getJWT,
	getNetworkVersion,
	getProviderType,
	getWalletBalance,
	getWeb3,
	switchToBSCNetwork,
	updateWeb3Provider,
} from '../util/cryptoWallet';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	fullPaper: {
		height: '100%',
		width: '100%',
		// position:'relative',
		color: 'rgb(255, 255, 255)',
		backgroundColor: 'black',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,.8)',
		zIndex: 2,
	},
	imgBg: {
		width: '100%',
		height: '100%',
		// width:'auto',
		position: 'absolute',
		objectFit: 'cover',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
	},
	page100vh: {
		// paddingTop:'70px',
		height: '100vh',
		width: '100%',
		position: 'relative',
		// zIndex:2,
		paddingTop: '70px',
		overflow: 'hidden',
	},
	paperHeader1: {
		fontFamily: 'Sequel65',
		textTransform: 'uppercase',
		fontSize: '24px',
		color: '#FFE566',
		// [theme.breakpoints.down('lg')]: {
		//     fontSize:'40px',
		// },
		[theme.breakpoints.down('md')]: {
			fontSize: '20px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '14px',
		},
	},
	paperHeader2: {
		fontFamily: 'Sequel65',
		textTransform: 'uppercase',
		fontSize: '72px',
		cursor: 'default',
		// [theme.breakpoints.down('lg')]: {
		//     fontSize:'90px',
		// },
		[theme.breakpoints.down('md')]: {
			fontSize: '36px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '30px',
		},
	},
	paperItem: {
		paddingTop: '30px',
	},
	timeNumber: {
		fontFamily: 'SykeMonoRegular',
		fontSize: '26px',
		// [theme.breakpoints.down('lg')]: {
		//     fontSize:'40px',
		// },
		[theme.breakpoints.down('md')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '14px',
		},
	},
	timeUnit: {
		fontFamily: 'SykeMonoThin',
		fontSize: '18px',
		cursor: 'default',
		// [theme.breakpoints.down('lg')]: {
		//     fontSize:'18px',
		// },
		[theme.breakpoints.down('md')]: {
			fontSize: '16px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '12px',
		},
	},
	timeDivider: {
		fontFamily: 'SykeMonoThin',
		fontSize: '22px',
		cursor: 'default',
		[theme.breakpoints.down('md')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '14px',
		},
	},
	timeItem: {
		// paddingLeft:'20px'
	},
	connectWalletButton: {
		border: '2px solid #CC66FF',
		padding: '16px 39px 16px 39px',
		borderRadius: '10px',
		// backgroundColor: '#CC66FF',
		boxShadow: 'none',
		cursor: 'pointer',
		[theme.breakpoints.down('md')]: {
			padding: '11px 28px 11px 28px',
			borderRadius: '8px',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '10px 24px 10px 24px',
			borderRadius: '8px',
		},
	},
	inputItem: {
		width: '40%',
		[theme.breakpoints.down('lg')]: {
			width: '50%',
		},
		[theme.breakpoints.down('md')]: {
			width: '60%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '80%',
		},
	},
	inputBuyToken: {
		border: '1px solid #CC66FF',
		padding: 'none',
		borderRadius: '10px',
		// backgroundColor: '#CC66FF',
		boxShadow: 'none',
	},
	inputBase: {
		color: 'white',
		fontSize: '20px',
		width: '100%',
		[theme.breakpoints.down('md')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '14px',
		},
	},
	buttonContent: {
		color: '#CC66FF',
		fontFamily: 'Sequel65',
		textTransform: 'uppercase',
		fontSize: '22px',
		[theme.breakpoints.down('md')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '14px',
		},
	},
	buttonIcon: {
		height: '42px',
		width: '34px',
		[theme.breakpoints.down('md')]: {
			height: '34px',
			width: '28px',
		},
		[theme.breakpoints.down('sm')]: {
			height: '28px',
			width: '22px',
		},
	},
	chooseWalletButton: {
		backgroundColor: '#191919',
		height: '100px',
		paddingLeft: '25px',
		borderRadius: '10px',
		lineHeight: 1,
		[theme.breakpoints.down('md')]: {
			height: '80px',
		},
		[theme.breakpoints.down('sm')]: {
			height: '70px',
		},
	},
	chooseWalletButtonContent: {
		fontFamily: 'Sequel65',
		fontSize: '22px',
		paddingLeft: '20px',
		lineHeight: 1,
		cursor: 'default',
		[theme.breakpoints.down('md')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '14px',
		},
	},
	chooseWalletButtonIcon: {
		width: '60px',
		[theme.breakpoints.down('sm')]: {
			width: '40px',
		},
	},
	buyButton: {
		borderRadius: '10px',
		height: '70px',
		width: '100px',
		backgroundColor: '#CC66FF',
		boxShadow: 'none',
		border: 'none',
		fontSize: '22px',
		textTransform: 'uppercase',
		[theme.breakpoints.down('lg')]: {
			fontSize: '24px',
			height: '60px',
			minHeight: '60px',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '18px',
			height: '55px',
			minHeight: '55px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '14px',
			height: '50px',
			minHeight: '50px',
		},
		'&:hover': {
			backgroundColor: '#CC66FF',
			boxShadow: 'none',
			border: 'none',
		},
	},
	walletShapeContainer: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		// paddingTop:'60px',
		// zIndex:2
	},
	walletShapeOutside: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 2,
	},
	walletShape: {
		position: 'absolute',
		zIndex: 3,
		height: '75%',
		width: '60%',
		[theme.breakpoints.down('xl')]: {
			// height:'65%',
			width: '75%',
		},
		[theme.breakpoints.down('lg')]: {
			height: '65%',
			width: '85%',
		},
		[theme.breakpoints.down('md')]: {
			height: '50%',
			width: '85%',
		},
		[theme.breakpoints.down('sm')]: {
			height: '43%',
			width: '90%',
		},
	},
	walletTitleItem: {
		// paddingTop: '30px',
		// paddingBottom: '15%',
		[theme.breakpoints.down('lg')]: {
			// paddingTop: '30px',
		},
	},
	walletTitle: {
		lineHeight: 1,
		fontFamily: 'Sequel65',
		fontSize: '28px',
		color: '#CC66FF',
		// top:'-20px',
		// left:'31%',
		// [theme.breakpoints.down('xl')]: {
		//     // height:'65%',
		//     width:'75%'
		// },
		[theme.breakpoints.down('lg')]: {
			position: 'absolute',
			top: '-58px',
			// left:'23%',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '22px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '16px',
			top: '-40px',
		},
	},
	walletItem: {
		width: '50%',
		cursor: 'pointer',
		[theme.breakpoints.down('lg')]: {
			width: '60%',
		},
		[theme.breakpoints.down('md')]: {
			width: '80%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '90%',
		},
	},
	relativeContainter: {
		width: '100%',
		height: '100%',
		position: 'relative',
	},
	absoluteContainter: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 3,
	},
	textTopInput: {
		border: '1px solid rgb(255 93 255)',
		padding: '10px 20px',
		borderRadius: '4px',
		width: 'fit-content',
		margin: '0 auto',
		marginBottom: '12px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '12px',
		},
	},
}));

function useMyQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function BuyToken() {
	const classes = useStyles();
	const [buttonHover, setButtonHover] = useState(false);
	const [buttonHover2, setButtonHover2] = useState(false);
	const [openConnectWalletBox, setOpenConnectWalletBox] = useState(false);

	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		leftTime: 0,
	});
	const [openMetaMaskDialog, setOpenMetaMaskDialog] = useState(false);
	const [openTransInfoPopUp, setOpenTransInfoPopUp] = useState(false);
	const [msgContent, setMsgContent] = useState('');
	const [walletBalance, setWalletBalance] = useState(0);

	const [numberBuy, setNumberBuy] = useState(null);
	const [numberTokenReceived, setNumberTokenReceived] = useState(0);
	const [loading, setLoading] = useState(false);
	var refAddress = '0x0000000000000000000000000000000000000000';

	const { enqueueSnackbar } = useSnackbar();
	let query = useMyQuery();
	const queryParams = new URLSearchParams(window.location.search);

	let dataForApi = { ref: query.get('ref') };
	let dataForApi2 = { ref: query.get('adRef') };

	const handleCloseMetaMaskDialog = () => {
		setOpenMetaMaskDialog(false);
	};

	const handleChangeBSCNetwork = () => {
		setOpenMetaMaskDialog(false);
		switchToBSCNetwork();
	};

	const getInfo = async (debug = false, address = null) => {
		let balance = await getWalletBalance(address);
		if (debug) console.log(balance);
		setWalletBalance(((balance * 100) / 100).toFixed(6));
	};

	const eventTime = 1712282400;

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Chibiwar: Buy Token';

		setTimeout(() => {
			getInfo();
		}, 500);
		setTimeout(() => {
			getInfo();
		}, 2000);

		const handleCountdown = () => {
			let currentTime = Math.floor(Date.now() / 1000);
			let leftTime = eventTime - currentTime;

			let days = Math.floor(leftTime / (24 * 60 * 60));

			let divisor_for_hous = leftTime % (24 * 60 * 60);
			let hours = Math.floor(divisor_for_hous / (60 * 60));

			let divisor_for_minutes = divisor_for_hous % (60 * 60);
			let minutes = Math.floor(divisor_for_minutes / 60);

			let divisor_for_seconds = divisor_for_minutes % 60;
			let seconds = Math.ceil(divisor_for_seconds);
			// let duration = moment.duration(leftTime, 'seconds');
			if (leftTime === 0) {
				clearInterval(myInterval);
				//window.location.reload(true); //#skip the cache and reload the page from the server
			}
			// duration = moment.duration(duration.asSeconds() - 1, 'seconds');
			setCountdown({ days, hours, minutes, seconds, leftTime });
		};

		const myInterval = setInterval(handleCountdown, 1000);

		return () => {
			clearInterval(myInterval); //This is important
		};
	}, []);

	const handlerButtonHover = () => {
		setButtonHover(true);
	};
	const handlerButtonNotHover = () => {
		setButtonHover(false);
	};
	const handlerButtonHover2 = () => {
		setButtonHover2(true);
	};
	const handlerButtonNotHover2 = () => {
		setButtonHover2(false);
	};
	const handlerOpenConnectWalletBox = () => {
		setOpenConnectWalletBox(true);
	};

	const handleConnectMetaMask = async () => {
		if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
			//huong dan install
			const onboarding = new MetaMaskOnboarding();
			onboarding.startOnboarding();
		} else {
			updateWeb3Provider(METAMASK_PROVIDER);
			const networkVersion = await getNetworkVersion();
			if (networkVersion === -1000000) {
				enqueueSnackbar('MetaMask not found! Please try to connect wallet on PC/Mac', {
					variant: 'warning',
					persist: true,
				});
				return;
			}
			console.log('networkVersion', networkVersion);
			if (parseInt(networkVersion) !== NETWORK_VERSION) {
				//Chưa đúng hiện thông báo hướng dẫn
				setOpenMetaMaskDialog(true);
				return;
			}

			//alert("networkVersion "+networkVersion)
			//Đúng chain, kết nối
			await getJWT(dataForApi);
		}
	};

	const handleClickConnectMetaMask = async () => {
		let address = await handleConnectMetaMask();
		// await switchToBSCNetwork();
		await getInfo(true, address);
	};

	const handleClickConnect = async () => {
		//localStorage.removeItem("wallet_address")
		updateWeb3Provider(WALLETCONNECT_PROVIDER);
		try {
			const webb3 = getWeb3();
			const provider = webb3.currentProvider;
			await provider.enable();
			console.log(provider.chainId, NETWORK_VERSION);
			if (provider.chainId !== NETWORK_VERSION) {
				enqueueSnackbar('Please change to BSC network', { variant: 'warning' });
				await provider.disconnect();
			} else {
				getJWT(dataForApi2);
			}
		} catch {}
	};

	const handleBuy = async () => {
		setLoading(true);
		await buyToken(
			numberBuy,
			refAddress,
			enqueueSnackbar,
			async () => {
				await getInfo();
				handleOpenTransInfo();
				setLoading(false);
			},
			async (transactionHash) => {
				await getInfo();
				setNumberTokenReceived((numberBuy ?? 0) * 2500);
				setMsgContent(transactionHash);
				addTokenErc20(TOKEN_ADDRESS, 'CHW');
			}
		);
	};

	const getShortenAddress = () => {
		let walletAddress = sessionData.myAddress;
		if (!walletAddress) return;
		let shortenAddress = walletAddress.substring(0, 6);
		shortenAddress = shortenAddress.concat('...');
		shortenAddress = shortenAddress.concat(walletAddress.substring(walletAddress.length - 6, walletAddress.length));
		return shortenAddress;
	};

	const getWalletBNB = () => {
		let balance = walletBalance;
		balance = balance ? balance : 0;
		return balance.toString().concat(' BNB');
	};

	const logOut = async () => {
		// await disconnectWallet();
		if (getProviderType() === WALLETCONNECT_PROVIDER) {
			const web3 = getWeb3();
			const provider = web3.currentProvider;
			await provider.disconnect();
		}
		sessionData.logOut();
	};

	const handleOpenTransInfo = () => {
		setOpenTransInfoPopUp(true);
	};

	const handleCloseTransInfo = () => {
		setOpenTransInfoPopUp(false);
	};

	for (const [key, value] of queryParams) {
		if (key === 'ref') {
			refAddress = value;
		}
	}

	return (
		<Grid container className={classes.fullPaper}>
			{sessionData.myAddress === null && openConnectWalletBox ? (
				<Grid item xs={12} className={classes.page100vh}>
					<div
						className={classes.overlay}
						onClick={() => {
							setOpenConnectWalletBox(false);
						}}
					></div>
					<img src={'/images/background/bg_buyToken1.jpg'} className={classes.imgBg}></img>
					<Grid
						container
						alignItems="center"
						justifyContent="center"
						className={classes.walletShapeContainer}
					>
						<Grid
							container
							direction="column"
							alignItems="center"
							justifyContent="center"
							className={classes.relativeContainter}
						>
							<img src={'/images/section/wallet_shape.png'} className={classes.walletShape}></img>
							<div className={classes.walletShape}>
								<Grid
									container
									justifyContent="center"
									alignItems="flex-start"
									style={{ width: '100%' }}
								>
									<Typography className={classes.walletTitle}>CONNECT WALLET</Typography>
								</Grid>
							</div>
							<div className={classes.walletShape}>
								<Grid
									container
									rowGap={3}
									direction="column"
									alignItems="center"
									justifyContent="center"
									style={{ width: '100%', height: '100%' }}
								>
									<Grid
										item
										className={classes.walletItem}
										onMouseOver={handlerButtonHover}
										onMouseOut={handlerButtonNotHover}
										onClick={handleClickConnectMetaMask}
									>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="center"
											className={classes.chooseWalletButton}
										>
											<Grid item>
												<img
													src="/images/icons/metamask.png"
													className={classes.chooseWalletButtonIcon}
												/>
											</Grid>
											<Grid item>
												<Typography
													className={classes.chooseWalletButtonContent}
													style={buttonHover ? { color: '#F5841F' } : {}}
												>
													METAMASK
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Dialog
										open={openMetaMaskDialog}
										onClose={handleCloseMetaMaskDialog}
										aria-labelledby="alert-dialog-title"
										aria-describedby="alert-dialog-description"
									>
										<DialogTitle id="alert-dialog-title">{'Use Binance Smart Chain!'}</DialogTitle>
										<DialogContent>
											<DialogContentText id="alert-dialog-description">
												You need to change your MetaMask network to &nbsp;
												<Link
													href="https://docs.binance.org/smart-chain/wallet/metamask.html"
													target="_blank"
												>
													Binance Smart Chain (BSC)
												</Link>{' '}
												to Connect!
											</DialogContentText>
										</DialogContent>
										<DialogActions>
											<Button onClick={handleChangeBSCNetwork} color="primary" autoFocus>
												Change to BSC
											</Button>

											<Button onClick={handleCloseMetaMaskDialog} color="primary">
												Close
											</Button>
										</DialogActions>
									</Dialog>

									<Grid
										item
										className={classes.walletItem}
										onMouseOver={handlerButtonHover2}
										onMouseOut={handlerButtonNotHover2}
										onClick={handleClickConnect}
									>
										<Grid
											container
											justifyContent="flex-start"
											alignItems="center"
											className={classes.chooseWalletButton}
										>
											<Grid item>
												<img
													src="/images/icons/walletconnect.png"
													className={classes.chooseWalletButtonIcon}
												/>
											</Grid>
											<Grid item>
												<Typography
													className={classes.chooseWalletButtonContent}
													style={buttonHover2 ? { color: '#3396FF' } : {}}
												>
													WALLETCONNECT
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</div>

							{/* <div  style={{}}> */}
							{/* </div> */}
						</Grid>
					</Grid>
				</Grid>
			) : (
				<Grid item xs={12} className={classes.page100vh}>
					<div className={classes.overlay}></div>
					<img src={'/images/background/bg_buyToken1.jpg'} className={classes.imgBg}></img>
					<Grid
						container
						direction="column"
						alignItems="center"
						justifyContent="center"
						sx={{ minHeight: '100%' }}
						style={{ width: '100%', position: 'absolute', zIndex: 2 }}
					>
						<Grid item>
							<Typography variant="h3" className={classes.paperHeader1}>
								CHIBIWAR SALE
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h1" className={classes.paperHeader2}>
								TOKEN SALE
							</Typography>
						</Grid>
						<Grid item style={{ borderBottom: '5px solid #FFE566' }}>
							<Typography variant="h3" className={classes.paperHeader1} style={{ opacity: 0 }}>
								CHIBIWAR SALE
							</Typography>
						</Grid>
						<Grid item style={{ paddingTop: '80px', paddingBottom: '80px' }}>
							<Grid
								container
								columnSpacing={{ xs: 1, md: 2 }}
								alignItems="center"
								justifyContent="center"
							>
								<Grid item className={classes.timeItem}>
									<Grid
										container
										rowSpacing={{ xs: 1, md: 2 }}
										direction="column"
										alignItems="center"
										justifyContent="center"
										display="flex"
									>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeNumber}>
												{countdown.days ? countdown.days : '00'}
											</Typography>
										</Grid>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeUnit}>
												DAYS
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item className={classes.timeItem}>
									<Grid
										container
										direction="column"
										alignItems="center"
										justifyContent="center"
										display="flex"
									>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeDivider}>
												:
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item className={classes.timeItem}>
									<Grid
										container
										rowSpacing={{ xs: 1, md: 2 }}
										direction="column"
										alignItems="center"
										justifyContent="center"
										display="flex"
									>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeNumber}>
												{countdown.hours ? countdown.hours : '00'}
											</Typography>
										</Grid>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeUnit}>
												HOURS
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item className={classes.timeItem}>
									<Grid
										container
										direction="column"
										alignItems="center"
										justifyContent="center"
										display="flex"
									>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeDivider}>
												:
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item className={classes.timeItem}>
									<Grid
										container
										rowSpacing={{ xs: 1, md: 2 }}
										direction="column"
										alignItems="center"
										justifyContent="center"
										display="flex"
									>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeNumber}>
												{countdown.minutes ? countdown.minutes : '00'}
											</Typography>
										</Grid>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeUnit}>
												MINUTES
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item className={classes.timeItem}>
									<Grid
										container
										direction="column"
										alignItems="center"
										justifyContent="center"
										display="flex"
									>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeDivider}>
												:
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item className={classes.timeItem}>
									<Grid
										container
										rowSpacing={{ xs: 1, md: 2 }}
										direction="column"
										alignItems="center"
										justifyContent="center"
										display="flex"
									>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeNumber}>
												{countdown.seconds ? countdown.seconds : '00'}
											</Typography>
										</Grid>
										<Grid item>
											<Typography lineHeight={1} className={classes.timeUnit}>
												SECONDS
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						{sessionData.myAddress === null ? (
							<Grid item>
								<Grid container style={{ lineHeight: 1 }}>
									<Grid
										item
										className={classes.connectWalletButton}
										xs={'auto'}
										onMouseOver={handlerButtonHover}
										onMouseOut={handlerButtonNotHover}
										onClick={handlerOpenConnectWalletBox}
									>
										<Grid container columnSpacing={2} justifyContent="center" alignItems="center">
											<Grid item>
												<Typography
													className={classes.buttonContent}
													style={buttonHover ? { color: 'white' } : {}}
												>
													Connect Wallet
												</Typography>
											</Grid>
											<Grid item>
												<img
													src={
														buttonHover
															? '/images/icons/share2.png'
															: '/images/icons/share.png'
													}
													className={classes.buttonIcon}
												></img>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						) : (
							<Grid item className={classes.inputItem}>
								<Typography mb={1} className={classes.textTopInput}>
									1 BNB = 2500 CHW - Buy Max: 25BNB
								</Typography>
								<Grid container direction="column" style={{ lineHeight: 1 }}>
									<Grid
										item
										className={classes.inputBuyToken}
										onMouseOver={handlerButtonHover}
										onMouseOut={handlerButtonNotHover}
										onClick={handlerOpenConnectWalletBox}
									>
										<Grid container justifyContent="center" alignItems="center">
											<Grid item xs={8}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<Grid item xs={12} style={{ paddingLeft: '17px' }}>
														<InputBase
															sx={{ ml: 1, flex: 1 }}
															inputProps={{ type: 'number' }}
															placeholder="Amount BNB"
															className={classes.inputBase}
															onChange={(event) => {
																setNumberBuy(event.target.value);
															}}
														/>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={4}>
												<Grid container justifyContent="flex-end" alignItems="center">
													<Grid item>
														<Button
															className={classes.buyButton}
															disabled={loading || !numberBuy}
															onClick={handleBuy}
															variant="contained"
														>
															Buy
														</Button>
													</Grid>
												</Grid>
											</Grid>
											<Dialog onClose={handleCloseTransInfo} open={openTransInfoPopUp}>
												<Grid
													container
													rowGap={2}
													direction="column"
													justifyContent="flex-start"
													alignItems="center"
													style={{
														padding: '20px',
														backgroundColor: '#161A24',
														border: '3px solid rgb(255 93 255)',
													}}
												>
													<Grid
														item
														style={{
															borderRadius: '100%',
															backgroundColor: 'rgb(255 93 255)',
															padding: '3px 8px',
														}}
													>
														<CheckIcon
															style={{ fontSize: '50px', color: 'rgb(255,255,255)' }}
														/>
													</Grid>
													<Grid item style={{ color: 'white' }}>
														<Typography>Your Purchase Was Successfull</Typography>
													</Grid>
													<Grid item style={{ color: 'white' }}>
														<Typography>
															{numberTokenReceived} tokens will be available for you
														</Typography>
													</Grid>
													<Link
														href={NETWORK_CONFIG[0].blockExplorerUrls + '/tx/' + msgContent}
														target="_blank"
														onClick={handleCloseTransInfo}
														style={{
															textDecoration: 'none',
															color: 'white',
															padding: '10px 25px',
															backgroundColor: 'rgb(255 93 255)',
															borderRadius: '5px',
														}}
													>
														<Typography>View Transaction</Typography>
													</Link>
												</Grid>
											</Dialog>
										</Grid>
									</Grid>
									<Grid item style={{ paddingTop: '7px' }}>
										<Grid container justifyContent="center" alignItems="center">
											<Grid item xs={6} style={{ paddingLeft: '17px' }}>
												<Grid container justifyContent="flex-start" alignContent="center">
													<Typography onClick={logOut} style={{ cursor: 'pointer' }}>
														{getShortenAddress()}
													</Typography>
												</Grid>
											</Grid>
											<Grid item xs={6} style={{ paddingRight: '17px' }}>
												<Grid container justifyContent="flex-end" alignContent="center">
													<Typography>{getWalletBNB()}</Typography>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						)}
						<Grid item style={{ paddingTop: '50px' }}>
							<Typography
								lineHeight={1}
								className={classes.timeUnit}
								onClick={() => {
									addTokenErc20(TOKEN_ADDRESS, 'CHW');
								}}
								style={{ cursor: 'pointer' }}
							>
								ADD TOKEN TO WALLET
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			)}
			<Footer />
		</Grid>
	);
}
