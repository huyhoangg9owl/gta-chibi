import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

export const UnclaimedDialog = ({ open, onClose }) => {
	return (
		<BootstrapDialog
			onClose={onClose}
			// @ts-ignore
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<BootstrapDialogTitle
				// @ts-ignore
				id="customized-dialog-title"
				onClose={onClose}
			>
				Unclaimed Point
			</BootstrapDialogTitle>
			<DialogContent>
				<Typography variant="body2">
					<br />
					This is your staking points during staking period. If you withdraw your staked NINO tokens, you also
					claim these points
					<br />
					<br />
					Staking points are calculated based on current APY, and would be changed if APY changes
					<br />
					<br />
				</Typography>
			</DialogContent>
		</BootstrapDialog>
	);
};
