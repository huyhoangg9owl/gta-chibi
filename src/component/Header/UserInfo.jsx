import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, Button, Divider, Popover, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment, useState } from 'react';
import sessionData from '../../sessionData';
// import {disconnectWallet} from "../../service/cryptoWallet";

import { WALLETCONNECT_PROVIDER } from '../../util/constants';
import { getProviderType, getWeb3 } from '../../util/cryptoWallet';

const useStyles = makeStyles((theme) => ({
	box: {
		margin: theme.spacing(2),
	},

	box1: {
		margin: theme.spacing(2),
		marginTop: 0,
		marginBottom: theme.spacing(4),
	},

	pop: {
		padding: theme.spacing(4),
	},
}));

export default function UserInfo({ address }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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

	const classes = useStyles();

	return (
		<Fragment>
			<Button
				aria-describedby={id}
				startIcon={<AccountIcon color="action" style={{ width: 30, height: 30 }} />}
				onClick={handleClick}
			>
				<Typography noWrap variant="button" style={{ maxWidth: 100 }}>
					{' '}
					{address}
				</Typography>
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				style={{ zIndex: 10000 }}
			>
				<Divider />
				<Box textAlign="center" className={classes.box}>
					<Button variant="outlined" onClick={logOut}>
						Disconnect
					</Button>
				</Box>
				{/* <Divider/>
                <Box textAlign='center' className={classes.box}>
                    <Typography variant='caption'>Privacy Policy - Term Of Services</Typography>
                    
                </Box> */}
			</Popover>
		</Fragment>
	);
}
