import { List, ListItem, ListItemText, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { BOX } from '../../config/staking';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

const useStyles = makeStyles(() => ({
	selected: {
		//border: "1px solid",
		//borderColor: theme.palette.primaryColor
		background: 'rgba(200, 200, 200, 0.4)',
		//background: "#f7f7f8",
		borderRadius: 10,
	},
}));

export const BuyBoxDialog = ({ approved, approveBuyNFT, buyNFTBox, open, loading, onClose }) => {
	const classes = useStyles();

	const [boxType, setBoxType] = useState(0);
	const [numberOfBox, setNumberOfBox] = useState(0);
	const boxTypeClassname = (type) => {
		if (boxType === type) {
			return classes.selected;
		}
	};

	const buyBox = () => {
		buyNFTBox(boxType, numberOfBox);
	};

	return (
		<BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
			{/* @ts-ignore */}
			<BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
				Buy box with Point
			</BootstrapDialogTitle>
			<DialogContent dividers>
				<List>
					{BOX.map((box, key) => {
						return (
							<ListItem
								key={key}
								className={boxTypeClassname(box.boxType)}
								onClick={() => setBoxType(box.boxType)}
							>
								<img src={box.boxImage} width="90" />
								<ListItemText>
									{box.boxName} - {box.boxPoint} Points
								</ListItemText>
							</ListItem>
						);
					})}
				</List>
				<TextField
					autoFocus
					margin="dense"
					id="numberOfBox"
					label="Number Of Box"
					type="number"
					fullWidth
					variant="standard"
					value={numberOfBox}
					onChange={(event) =>
						setNumberOfBox(parseInt(event.target.value) <= 20 ? parseInt(event.target.value) : 20)
					}
				/>
			</DialogContent>
			<DialogActions>
				{!approved && (
					<Button onClick={approveBuyNFT} disabled={loading} color="primary" autoFocus>
						Approve
					</Button>
				)}
				{approved && (
					<Button onClick={buyBox} disabled={loading || numberOfBox <= 0} color="primary" autoFocus>
						Buy Box
					</Button>
				)}
				<Button onClick={onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</BootstrapDialog>
	);
};
