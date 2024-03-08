import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

export const WhitelistROIDialog = ({ open, onClose }) => {
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
				Get points from Staking NINO
			</BootstrapDialogTitle>
			<DialogContent style={{ paddingTop: 13 }}>
				<Typography variant="body2">
					- You will receive 1 point if you stake 100 NINO a day.
					<br />
					- 25 points = 1 ticket to enter Whitelist Round
					<br />
					- There are 1000 Whitelist slots to buy Ninneko Box, qualifiers are selected randomly
					<br />
					- Top 10 users with the most staking points will be rewarded as the following: Top 1: 5 boxes, top
					2-4: 2 boxes, top 5-10: 1 box
					<br />- Token will be locked for 5 more days after the staking event end.
				</Typography>
			</DialogContent>
		</BootstrapDialog>
	);
};
