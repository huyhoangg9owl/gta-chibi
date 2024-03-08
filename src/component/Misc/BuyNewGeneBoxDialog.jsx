import { List, ListItem, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { BOX_DARK_SWORD } from '../../config/staking';
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

export const BuyNewGeneBoxDialog = ({ buyNFTBox, open, loading, onClose }) => {
	const classes = useStyles();
	const [numberOfBox, setNumberOfBox] = useState(0);

	const buyBox = () => {
		buyNFTBox(numberOfBox);
	};

	return (
		<BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
			{/* @ts-ignore */}
			<BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
				Buy box with NINO
			</BootstrapDialogTitle>
			<DialogContent dividers>
				<List>
					{BOX_DARK_SWORD.map((box, key) => {
						return (
							<ListItem key={key} className={classes.selected}>
								{/* <Inventory2OutlinedIcon fontSize='large' style={{marginRight: 20}}/> */}
								<img src={box.boxImage} width="90" />
								<Stack>
									<Typography variant="h6" component={'p'}>
										Dark Sword Box{' '}
									</Typography>

									<Typography>1200 NINO and 50.000 MATA</Typography>
								</Stack>
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
					onChange={(event) => setNumberOfBox(parseInt(event.target.value))}
				/>
			</DialogContent>
			<DialogActions>
				{/* {!approved && <Button onClick={approveBuyNFT} disabled={loading} color="primary" autoFocus>
                        Approve
                    </Button>
                } */}
				{/* {approved && */}
				<Button onClick={buyBox} disabled={loading || numberOfBox <= 0} color="primary" autoFocus>
					Buy Box
				</Button>
				{/* } */}
				<Button onClick={onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</BootstrapDialog>
	);
};
