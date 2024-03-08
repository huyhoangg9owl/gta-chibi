import makeStyles from '@mui/styles/makeStyles';
import classnames from 'classnames';
import { forwardRef, useCallback, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { SnackbarContent, useSnackbar } from 'notistack';
import { NETWORK_CONFIG, SNACK_ERROR_TYPE_TRANSACTION, SNACK_INFO } from '../../util/constants';

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up('sm')]: {
			minWidth: '344px !important',
		},
		maxWidth: 800,
	},
	card: {
		backgroundColor: '#fddc6c',
		width: '100%',
	},
	cardInfo: {
		backgroundColor: theme.palette.primary.main,
		width: '100%',
	},
	typography: {
		fontWeight: 'bold',
	},
	typographyInfo: {
		color: 'white',
		fontWeight: 'bold',
	},
	actionRoot: {
		padding: '8px 8px 8px 16px',
		justifyContent: 'space-between',
	},
	icons: {
		marginLeft: 'auto',
	},
	expand: {
		padding: '8px 8px',
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandInfo: {
		padding: '8px 8px',
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
		color: 'white',
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	collapse: {
		padding: 16,
	},
	checkIcon: {
		fontSize: 20,
		color: '#b3b3b3',
		paddingRight: 4,
	},
	button: {
		padding: 0,
		textTransform: 'none',
	},
}));

export const MySnackMessage = forwardRef((props, ref) => {
	const classes = useStyles();
	const { closeSnackbar } = useSnackbar();
	const [expanded, setExpanded] = useState(true);

	const handleExpandClick = useCallback(() => {
		setExpanded((oldExpanded) => !oldExpanded);
	}, []);

	const handleDismiss = useCallback(() => {
		closeSnackbar(props.id);
	}, [props.id, closeSnackbar]);

	const title = props.message[0];
	const content = props.message[1];
	const type = props.message[2];

	const headerBg = type === SNACK_INFO ? classes.cardInfo : classes.card;
	const headerText = type === SNACK_INFO ? classes.typographyInfo : classes.typography;
	const expand = type === SNACK_INFO ? classes.expandInfo : classes.expand;

	//console.log(props)

	return (
		<SnackbarContent ref={ref} className={classes.root}>
			<Card className={headerBg}>
				<CardActions classes={{ root: classes.actionRoot }}>
					<Typography variant="subtitle1" className={headerText}>
						{title}
					</Typography>
					<div className={classes.icons}>
						<IconButton
							aria-label="Show more"
							className={classnames(expand, { [classes.expandOpen]: expanded })}
							onClick={handleExpandClick}
						>
							<ExpandMoreIcon />
						</IconButton>
						<IconButton className={expand} onClick={handleDismiss}>
							<CloseIcon />
						</IconButton>
					</div>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<Paper className={classes.collapse}>
						{type === SNACK_ERROR_TYPE_TRANSACTION ? (
							<Link href={NETWORK_CONFIG[0].blockExplorerUrls + '/tx/' + content} target="_blank">
								See it on BscScan
							</Link>
						) : (
							<pre style={{ whiteSpace: 'pre-line' }}>{content}</pre>
						)}
					</Paper>
				</Collapse>
			</Card>
		</SnackbarContent>
	);
});
