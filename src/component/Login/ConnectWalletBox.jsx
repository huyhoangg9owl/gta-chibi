import { Dialog, DialogContent, DialogTitle, Grid, Slide }from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment } from 'react';
import LoginMetaMaskButton from './LoginMetaMaskButton';
import LoginWalletConnectButton from './LoginWalletConnectButton';

const useStyles = makeStyles((theme) => ({
	dialogLoginTitle: {
		display: 'flex',
		justifyContent: 'center',
	},
	dialogLogin: {
		position: 'absolute',
		top: 50,
		left.spacing(3),
		right.spacing(3),
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	groupButtonLogin: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginBottom: 30,
		paddingLeft: 40,
		paddingRight: 40,
	},
}));
const Transition = React.forwardRef(function Transition(props, ref) {
	// @ts-ignore
	return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConnectWalletBox({ component }: { component }) {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const classes = useStyles();

	return (
		<Fragment>
			{React.cloneElement(component, { onClick: handleOpen })}

			<Dialog
				open={open}
				// fullWidth={true}
				maxWidth="xs"
				classes={{
					paper: classes.dialogLogin,
				}}
				// @ts-ignore
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle className={classes.dialogLoginTitle}>{'Connect to a Wallet'}</DialogTitle>
				<DialogContent>
					<div className={classes.groupButtonLogin}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								{' '}
								<LoginMetaMaskButton />{' '}
							</Grid>
							<Grid item xs={12}>
								{' '}
								<LoginWalletConnectButton />{' '}
							</Grid>
						</Grid>
					</div>
				</DialogContent>
			</Dialog>
		</Fragment>
	);
}
