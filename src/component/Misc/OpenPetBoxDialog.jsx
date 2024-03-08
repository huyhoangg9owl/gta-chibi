import { List, ListItem, ListItemText, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@mui/styles';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

const useStyles = makeStyles(() => ({
	selected: {
		//border: "1px solid",
		//borderColor: theme.palette.primaryColor
		background: 'rgba(200, 200, 200, 0.4)',
		//background: "#f7f7f8",
		borderRadius: 10,
	},
	listItem: {
		paddingTop: 0,
		paddingBottom: 0,
	},
}));

export const OpenPetBoxDialog = ({ open, onClose, ninneko }) => {
	const classes = useStyles();

	// let refAvatarURL = useRef(ninneko)
	// refAvatarURL.current = ninneko.avatarURL
	// let refIsMyPet = useRef(ninneko)

	return (
		<BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
			{/* @ts-ignore */}
			<BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
				Congratulation!
			</BootstrapDialogTitle>
			<DialogContent dividers>
				<List>
					{ninneko && ninneko.pet && (
						<>
							<ListItem className={classes.listItem}>
								<ListItemText style={{ textAlign: 'center' }}>{ninneko.pet.name}</ListItemText>
							</ListItem>
							<ListItem className={classes.listItem}>
								<img src={ninneko.pet.avatarURL} />
							</ListItem>
						</>
					)}
				</List>
				<Typography style={{ textAlign: 'center' }}>
					See your ninneko in&nbsp;
					<a href="https://market.ninneko.com/account/inventory">Market</a>
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</BootstrapDialog>
	);
	// }
};
