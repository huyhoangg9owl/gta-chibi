import { DialogContentText, Link } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

export const ChangeNetworkDialog = ({ open, handleChangeNetwork, onClose }) => {
	return (
		<BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
			{/* @ts-ignore */}
			<BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
				Use Binance Smart Chain
			</BootstrapDialogTitle>
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

				<Button onClick={onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</BootstrapDialog>
	);
};
