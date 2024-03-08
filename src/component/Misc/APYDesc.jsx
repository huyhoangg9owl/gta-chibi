import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

export const APYFlexible = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
	return (
		<BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
			{/* @ts-ignore */}
			<BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
				APR
			</BootstrapDialogTitle>
			<DialogContent style={{ paddingTop: 13 }}>
				<Typography variant="body2">
					- The APR will fluctuate based on the amount of NINO staked in the pool.
					<br />
					(The less NINO, the more APR and vice versa)
				</Typography>
			</DialogContent>
		</BootstrapDialog>
	);
};
