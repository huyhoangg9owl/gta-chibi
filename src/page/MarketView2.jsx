import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GridPet from './GridPet';
import { PetFilterPanel } from './PetFilterHandler';

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	main: {
		paddingTop: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(2),
		},

		paddingBottom: theme.spacing(10),
		flex: 1,
	},
	bodyContainer: {
		padding: '130px 40px 0px 40px',
		// height:'100%',
		// width:'100%',
		position: 'absolute',
		top: 0,
		zIndex: 2,
		// paddingTop:'130px',
		[theme.breakpoints.down('sm')]: {
			padding: '130px 15px 0px 15px',
		},
	},
	paperHeader: {
		fontFamily: 'Sequel65',
		textTransform: 'uppercase',
		cursor: 'default',
		fontSize: '72px',
		color: '#FFE566',
		// lineHeight:1,
		[theme.breakpoints.down('md')]: {
			fontSize: '36px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '30px',
		},
	},
	headerItem: {
		[theme.breakpoints.down('md')]: {
			paddingBottom: '15px',
		},
	},
	filterItem: {
		// [theme.breakpoints.down('md')]: {
		//     display: 'none',
		// },
	},
	gridItem: {
		paddingLeft: '25px',
		[theme.breakpoints.down('md')]: {
			paddingLeft: 0,
		},
	},
}));

export default function MarketView2({ handler }) {
	const classes = useStyles();

	return (
		<Grid container className={classes.bodyContainer}>
			<Grid item xs={12} className={classes.headerItem}>
				<Grid container justifyContent="center" alignItems="center">
					<Typography className={classes.paperHeader}>COMING SOON</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12} md={3.5} xl={2.3} className={classes.filterItem}>
				<PetFilterPanel handler={handler} />
			</Grid>
			<Grid item xs={12} md={8.5} xl={9.7} className={classes.gridItem}>
				<div className={classes.main}>
					{/* <PetSortPanel handler={handler} /> */}
					<GridPet />
				</div>
			</Grid>
		</Grid>
	);
}
