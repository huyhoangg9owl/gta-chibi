import { Table } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

export const ROIDialog = ({ apy, open, onClose }) => {
	return (
		<BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
			<BootstrapDialogTitle
				// @ts-ignore
				id="customized-dialog-title"
				onClose={onClose}
			>
				ROI Details
			</BootstrapDialogTitle>
			<DialogContent>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Timeframe</TableCell>
								<TableCell>ROI</TableCell>
								<TableCell>Point per 1k NINO</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>1d</TableCell>
								<TableCell>{Math.round(apy / 0.365) / 1000}%</TableCell>
								<TableCell>{Math.round(apy / 0.365) / 100}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>7d</TableCell>
								<TableCell>{Math.round((apy * 7) / 0.365) / 1000}%</TableCell>
								<TableCell>{Math.round((apy * 7) / 0.365) / 100}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>30d</TableCell>
								<TableCell>{Math.round((apy * 30) / 0.365) / 1000}%</TableCell>
								<TableCell>{Math.round((apy * 30) / 0.365) / 100}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>365d(APY)</TableCell>
								<TableCell>{Math.round(apy * 1000) / 1000}%</TableCell>
								<TableCell>{Math.round(apy * 1000) / 100}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Typography variant="body2">
					- ROI Calculated based on current rates. Rates changes depending on the amount of NINO stake.
					<br />- APY will be fixed in the last day of Event to ensure fairness to all of our stakers
				</Typography>
			</DialogContent>
		</BootstrapDialog>
	);
};
