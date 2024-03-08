import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from '../component/Footer/Footer';

const useStyles = makeStyles((theme) => ({
	fullPaper: {
		height: '100%',
		width: '100%',
		// overflow:'hidden'
	},
	page100vh: {
		height: '100%',
		width: '100%',
		position: 'relative',
		backgroundColor: 'rgb(0,0,0)',
		// paddingTop:'80px',
		overflow: 'hidden',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,.6)',
		zIndex: 2,
	},
	imgBg: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		objectFit: 'cover',
		zIndex: 1,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	comingsoon: {
		color: '#FFE566',
		lineHeight: 1,
		fontFamily: 'Sequel75',
		fontSize: '48px',
		[theme.breakpoints.down('md')]: {
			fontSize: '30px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '20px',
		},
	},
	pageContainer: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 3,
		padding: '0px 40px 0px 40px',
		[theme.breakpoints.down('sm')]: {
			padding: '0px 15px 0px 15px',
		},
	},
}));

export function Play() {
	const classes = useStyles();

	return (
		<Grid container className={classes.fullPaper}>
			<Grid item xs={12} className={classes.page100vh}>
				<div className={classes.overlay}></div>
				<img src={'/images/background/bg_play.png'} className={classes.imgBg}></img>
				<Grid
					container
					rowGap={{ sm: 2, md: 3 }}
					direction="column"
					justifyContent="center"
					alignItems="center"
					className={classes.pageContainer}
				>
					<Grid item>
						<Typography className={classes.comingsoon}>COMING SOON</Typography>
					</Grid>
					<Grid item>
						<Typography className={classes.comingsoon}>...</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Footer />
		</Grid>
	);
}
