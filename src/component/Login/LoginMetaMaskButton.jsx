import MetaMaskOnboarding from '@metamask/onboarding';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { METAMASK_PROVIDER, NETWORK_VERSION } from '../../util/constants';
import { getJWT, getNetworkVersion, switchToBSCNetwork, updateWeb3Provider } from '../../util/cryptoWallet';

const useStyles = makeStyles((theme) => ({
	icon: {
		//width: 44,
		height: 40,
	},
	caption: {
		marginTop: theme.spacing(1),
	},
}));

function useMyQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function LoginMetaMaskButton() {
	const { enqueueSnackbar } = useSnackbar();

	let query = useMyQuery();

	let dataForApi = { ref: query.get('ref') };

	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeNetwork = () => {
		setOpen(false);
		switchToBSCNetwork();
	};

	const classes = useStyles();

	// const handleClickConnect = async () => {
	//     console.log("sao day")
	//     activateBrowserWallet()
	// }
	const handleClickConnect = async () => {
		if (
			//!mobileMetaMaskAndroidBrowser &&
			!MetaMaskOnboarding.isMetaMaskInstalled()
			//!isMetaMaskInstalled()
		) {
			//huong dan install
			const onboarding = new MetaMaskOnboarding();
			onboarding.startOnboarding();
		} else {
			//da cai metamask
			//Kiểm tra xem MetaMask đang set đúng Chain chưa

			updateWeb3Provider(METAMASK_PROVIDER);

			const networkVersion = await getNetworkVersion();
			// console.log(networkVersion,NETWORK_VERSION )
			//cho nay chu yeu la do KO CO WEB 3
			if (networkVersion === -1000000) {
				enqueueSnackbar('MetaMask not found! Please try to connect wallet on PC/Mac', {
					variant: 'warning',
					persist: true,
				});
				return;
			}

			if (networkVersion !== NETWORK_VERSION) {
				//Chưa đúng hiện thông báo hướng dẫn
				setOpen(true);
				return;
			}

			//alert("networkVersion "+networkVersion)
			//Đúng chain, kết nối
			getJWT(dataForApi);
		}
	};

	return (
		<Fragment>
			{
				// (isMobile && !window.ethereum) ?//tren mobile va ko phai metamask
				//     <Fragment>
				//         <Link href="https://metamask.app.link/dapp/market.ninneko.com/login">
				//             <Button variant="outlined" color="primary" fullWidth
				//                 startIcon={<img src="/images/metamask.png" className={classes.icon} />}
				//             >
				//                 Use MetaMask Browser
				//             </Button>
				//         </Link>
				//         <Typography variant="body2" color="textSecondary" className={classes.caption}>
				//             On mobile device you need to use MetaMask Browser to Login with MetaMask
				//         </Typography>
				//     </Fragment>
				//     : <Button variant="contained" color="primary" fullWidth
				//         startIcon={<img src="/images/metamask.png" className={classes.icon} />}
				//         onClick={handleClickConnect}>
				//         MetaMask
				//     </Button>
			}

			<Button
				variant="outlined"
				color="primary"
				fullWidth
				startIcon={<img src="/images/metamask.png" className={classes.icon} />}
				onClick={handleClickConnect}
			>
				MetaMask
			</Button>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Use Binance Smart Chain!'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You need to change your MetaMask network to &nbsp;
						<Link href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank">
							Binance Smart Chain (BSC)
						</Link>{' '}
						to Connect!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleChangeNetwork} color="primary" autoFocus>
						Change to BSC
					</Button>

					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
