import { Grid, Slider,  Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Fragment } from 'react';

import { DRAWER_WIDTH } from '../../util/constants';

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		width: DRAWER_WIDTH,
		padding: theme.spacing(3),
		// overflowX: 'hidden'
		//paddingTop: theme.spacing(2)
	},
	toolbar: theme.mixins.toolbar,
	filterHead: {
		display: 'flex',
		paddingBottom: '5px',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		'-webkit-backface-visibility': 'hidden',
		'-webkit-transform': 'translateZ(0)' /* Chrome, Safari, Opera */,
		transform: 'translateZ(0)',
	},
	checkBox: {
		//marginRight: 0,//theme.spacing(0.5)
		padding: 0,
		//margin: 0
	},
	checkBoxForm: {
		padding: theme.spacing(1),
	},
	filterTitle: {
		marginTop: theme.spacing(3),
	},
	rail: {
		height: 2,
		opacity: 1,
		backgroundColor: 'black',
	},
	mark: {
		backgroundColor: '#bfbfbf',
		height: 6,
		width: 1,
		marginTop: -2,
	},
	thumb: {
		borderRadius: '1px',
		height: '15px',
		width: '15px',
		boxShadow: 'none',
		border: 'none',
		'&:hover': {
			boxShadow: '0 0 0 6px #CC66FF30',
		},
	},
	track: {
		height: '3px',
		borderRadius: 'none',
		// background-color: currentColor,
	},
	numberFilterPart: {
		backgroundColor: '#00AB55',
		height: 22,
		width: 22,
		borderRadius: '50%',
		marginLeft: 'auto',
		color: '#fff',
	},
	partBox: {
		display: 'inline-flex',
		// marginLeft: theme.spacing(1)
	},
	iconClass: {
		marginRight: 5,
		width: 28,
		height: 28,
	},
	part: {
		width: 28,
		height: 28,
	},
	clearIcon: {
		marginLeft: 'auto',
		marginRight: 'auto',
		fontSize: 20,
		width: 20,
		height: 20,
		color: '#6a7582',
	},
	clearButton: {
		margin: 3,
		float: 'right',
		width: 26,
		height: 26,
		borderRadius: '50%',
		'&:hover': {
			backgroundColor: '#f1f1f1',
		},
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	textSearch: {
		fontSize: 10,
	},
}));

function FilterSlider({ classes, value, handleChangeState, min, max, marks = null }) {
	const handleChange = (_, newValue) => handleChangeState(newValue);
	const getMarks = () => {
		let ret[] = [];
		value.forEach((value) => {
			ret.push({ value: value, label: `$${value}` });
		});
		return ret;
	};

	return (
		<Fragment>
			{/* <Grid item xs={12} className={classes.filterTitle} style={{backgroundColor:'transparent'}}>
                <Typography variant="body1" style={{color:'white'}}>Filter by Price</Typography>
            </Grid> */}
			<Grid item xs={12} style={{ backgroundColor: 'transparent' }}>
				<Slider
					classes={{
						rail: classes.rail,
						mark: classes.mark,
						thumb: classes.thumb,
					}}
					value={value}
					onChange={handleChange}
					aria-labelledby="discrete-slider-always"
					step={1}
					min={min}
					max={max}
					marks={marks ? marks : getMarks()}
					track={marks ? false : 'normal'}
					sx={{
						color: '#CC66FF',
						'& .MuiSlider-markLabel': {
							color: 'white',
						},
					}}
				/>
			</Grid>
		</Fragment>
	);
}

export default function FilterPanel({ price, setPrice, isOnInvetoryPage = false, isSM = false }) {
	const classes = useStyles();

	return (
		<Grid
			container
			rowGap={0.8}
			style={
				isOnInvetoryPage && !isSM
					? { borderTop: '1px solid rgb(226, 226, 226)' }
					: { backgroundColor: '#161A24', padding: '15px 20px', borderRadius: '10px' }
			}
		>
			<Grid item xs={12} className={classes.filterHead}>
				<Typography variant="h6" style={{ color: 'white', textTransform: 'uppercase', fontFamily: 'Sequel55' }}>
					Filter by Price
				</Typography>
			</Grid>
			<FilterSlider
				value={price}
				handleChangeState={setPrice}
				classes={classes}
				min={0}
				max={500}
				label="Price"
			/>
		</Grid>
	);
}
