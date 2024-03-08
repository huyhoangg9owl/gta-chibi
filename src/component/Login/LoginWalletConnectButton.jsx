import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { NETWORK_VERSION, WALLETCONNECT_PROVIDER } from '../../util/constants';
import { getJWT, getWeb3, updateWeb3Provider } from '../../util/cryptoWallet';

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

export default function LoginWalletConnectButton() {
	let query = useMyQuery();

	let dataForApi = { ref: query.get('adRef') };

	const { enqueueSnackbar } = useSnackbar();

	const classes = useStyles();

	const handleClickConnect = async () => {
		updateWeb3Provider(WALLETCONNECT_PROVIDER);
		try {
			const webb3 = getWeb3();
			const provider = webb3.currentProvider;
			await provider.enable();
			if (provider.chainId !== NETWORK_VERSION) {
				enqueueSnackbar('Please change to BSC network', { variant: 'warning' });
				await provider.disconnect();
			} else {
				getJWT(dataForApi);
			}
		} catch {}
	};

	return (
		<Fragment>
			{
				<Button
					variant="outlined"
					color="primary"
					fullWidth
					startIcon={<img src="/images/walletconnect.png" className={classes.icon} alt="walletconnect" />}
					onClick={handleClickConnect}
				>
					WalletConnect
				</Button>
			}
		</Fragment>
	);
}
