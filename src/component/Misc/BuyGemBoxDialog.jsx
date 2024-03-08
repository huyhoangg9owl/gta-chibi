import { List, ListItem, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { BOX_SAPPHIRE } from '../../config/staking';
import { GEM_NAME } from '../../page/staking/GemBox';
import sessionData from '../../sessionData';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

const useStyles = makeStyles(() => ({
	selected: {
		//border: "1px solid",
		//borderColor: theme.palette.primaryColor
		background: 'rgba(200, 200, 200, 0.4)',
		//background: "#f7f7f8",
		borderRadius: 10,
	},
	centerGrid: {
		display: 'flex',
		//alignItems: 'stretch',
		justifyContent: 'center',
	},
}));

export const BuyGemBoxDialog = ({ open, onClose, id, approved, buyBox, approveBuyGemBox, loading }) => {
	const classes = useStyles();
	const [numberOfBox, setNumberOfBox] = useState(1);

	return (
		<BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
			{/* @ts-ignore */}
			<BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
				{/* @ts-ignore */}
				Buy {GEM_NAME[id]}
			</BootstrapDialogTitle>
			<DialogContent dividers>
				<List>
					{BOX_SAPPHIRE.map((_, key) => {
						return (
							<ListItem key={key} className={classes.centerGrid}>
								<img src={'/images/gems/5/' + id + '.png'} width="90" />
								{/* <ListItemText>{box.boxName} - {box.boxPoint}</ListItemText> */}
							</ListItem>
						);
					})}
				</List>

				<Typography>- Gem has 4 random attribues: ATK, DEF, HP, Crit... </Typography>

				<Typography>- 4 gems of the same type makes a set</Typography>

				<Typography>- Set effect is activated if Ninneko equips the whole set</Typography>

				<div className={classes.centerGrid} style={{ marginTop: 16, marginBottom: 24 }}>
					{sessionData.myAddress ? (
						<>
							{!approved && (
								<Button
									onClick={approveBuyGemBox}
									disabled={loading}
									color="primary"
									autoFocus
									variant="contained"
								>
									Approve NINO
								</Button>
							)}

							{approved && (
								<>
									<Select
										//style={{ width: 150 }}
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={numberOfBox}
										//label="Quantity"
										size="small"
										onChange={(event) => setNumberOfBox(parseInt(event.target.value.toString()))}
									>
										<MenuItem value={1}>01 Gem - 10 USD </MenuItem>
										<MenuItem value={2}>02 Gems - 15 USD</MenuItem>
										<MenuItem value={5}>05 Gems - 30 USD</MenuItem>
										<MenuItem value={10}>10 Gems - 50 USD</MenuItem>
										<MenuItem value={20}>20 Gems - 80 USD</MenuItem>
									</Select>
									<Button
										onClick={buyBox}
										disabled={loading || numberOfBox <= 0}
										color="primary"
										variant="contained"
										style={{ marginLeft: 16 }}
										autoFocus
									>
										Buy
									</Button>
								</>
							)}
						</>
					) : (
						<>
							<Typography>
								<strong>Connect wallet to buy</strong>
							</Typography>
						</>
					)}
				</div>
			</DialogContent>
		</BootstrapDialog>
	);
};
