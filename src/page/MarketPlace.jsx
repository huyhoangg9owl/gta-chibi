import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useMemo } from 'react';
import { useLocation } from 'react-router';
import Footer from '../component/Footer/Footer';
import MarketView2 from './MarketView2';
import PetFilterHandler from './PetFilterHandler';
//import {animation} from "../utils/pixiApp"

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	fullPaper: {
		minHeight: '100%',
		width: '100%',
		backgroundColor: 'rgb(0,0,0)',
		// paddingTop:'80px',
		overflow: 'hidden',
	},
	page100vh: {
		height: '1480px',
		width: '100%',
		position: 'relative',
		[theme.breakpoints.down('xl')]: {},
		[theme.breakpoints.down('lg')]: {},
		[theme.breakpoints.down('md')]: {
			height: '2710px',
		},
		[theme.breakpoints.down('sm')]: {
			height: '2240px',
		},
	},
	imgBg: {
		width: '100%',
		height: '100%',
		// minHeight: '100vh',
		position: 'absolute',
		objectFit: 'cover',
		zIndex: 1,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,.25)',
		zIndex: 2,
	},
}));

function useMyQuery() {
	const { search } = useLocation();

	return useMemo(() => new URLSearchParams(search), [search]);
}

export function MarketPlace() {
	const classes = useStyles();
	let query = useMyQuery();

	const queryParams = new URLSearchParams(window.location.search);

	let ref = query.get('ref');
	// console.log((data.me.id !== ref))
	if (typeof Storage !== 'undefined') {
		// console.log(localStorage.ref)
		if (ref) {
			localStorage.ref = ref;
		}
	}

	// console.log(localStorage.ref)

	return (
		<Grid container className={classes.fullPaper}>
			<Grid item xs={12} className={classes.page100vh}>
				<div className={classes.overlay} style={{ backgroundColor: 'rgba(0,0,0,.8)' }}></div>
				<img src="/images/background/bg_market.png" className={classes.imgBg} />
				<PetFilterHandler queryParams={queryParams}>
					<MarketView2 />
				</PetFilterHandler>
			</Grid>
			<Footer />
		</Grid>
	);
}
