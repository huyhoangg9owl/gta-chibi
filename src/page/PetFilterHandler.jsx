import { useTheme } from '@emotion/react';
import { Button, Card, Drawer, Grid, Hidden, MenuItem, Select, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { cloneElement, useState } from 'react';
import { DRAWER_WIDTH } from '../util/constants';
import { useMemoryState } from '../util/memoryState';
import { updateURLParameter } from '../util/utils';
//import {animation} from "../utils/pixiApp"

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},

	toolbar: theme.mixins.toolbar,

	drawerPaper: {
		width: DRAWER_WIDTH,
		// height: '100%',
		// marginTop: '130px',
		padding: theme.spacing(3),
		backgroundColor: '#161A24',
		// overflowX: 'hidden'
		// paddingTop: theme.spacing(2),
		'&::-webkit-scrollbar': {
			width: 0,
		},
	},

	main: {
		//padding: theme.spacing(12),
		//padding: theme.spacing(4),

		paddingTop: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(2),
		},

		paddingBottom: theme.spacing(10),
		flex: 1,
		//display: 'flex',
		//justifyContent: 'center'
		//overflowY: 'auto',
		// overflowX: 'hidden'
	},
	saleFilter: {
		color: '#D9D9D9',
		textTransform: 'uppercase',
		fontFamily: 'SykeMonoThin',
		textAlign: 'right',
		backgroundColor: '#161A24',
		fontSize: '16px',
	},
	select: {
		padding: 0,
	},
	filter: {
		padding: 5,
	},
	filterToolBar: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(5),
			marginRight: theme.spacing(5),
		},
		display: 'flex',
		height: 42,
		justifyContent: 'space-between',
	},
	filterHead: {
		color: 'rgb(255,255,255)',
		textTransform: 'uppercase',
		fontFamily: 'Sequel65',
		fontSize: '18px',
		[theme.breakpoints.down('xl')]: {
			fontSize: '16px',
		},
	},
	filterContentLeft: {
		color: '#D9D9D9',
		textTransform: 'uppercase',
		fontFamily: 'SykeMonoRegular',
		textAlign: 'left',
		fontSize: '16px',
		[theme.breakpoints.down('xl')]: {
			fontSize: '14px',
		},
	},
	filterContentRight: {
		color: '#D9D9D9',
		textTransform: 'uppercase',
		fontFamily: 'SykeMonoRegular',
		textAlign: 'right',
		fontSize: '16px',
		[theme.breakpoints.down('xl')]: {
			fontSize: '14px',
		},
	},
	cardImg: {
		width: '100%',
		height: '969px',
		borderRadius: '8px',
		overflow: 'hidden',
		[theme.breakpoints.down('xl')]: {
			height: '980px',
		},
	},
}));

export const PetFilterPanel = ({ handler }) => {
	const classes = useStyles();
	return (
		<Grid
			container
			rowSpacing={2}
			justifyContent="center"
			alignItems="center"
			style={!handler.isSM ? { paddingTop: '32px ' } : {}}
		>
			<Drawer
				classes={{ paper: classes.drawerPaper }}
				variant={'temporary'}
				onClose={() => {
					handler.setFilterClick(false);
				}}
				open={handler.isSM && handler.filterClick}
			>
				<Grid container rowSpacing={2} style={{ height: '100%' }}>
					<Grid item xs={12} style={{ height: '25%' }}>
						<Grid container rowGap={0.8} style={{ backgroundColor: '#161A24', paddingTop: '15px' }}>
							<Grid item xs={12} style={{ paddingBottom: '5px' }}>
								<Typography variant="h6" className={classes.filterHead}>
									Categories
								</Typography>
								{/* <Divider /> */}
							</Grid>
							<Grid item xs={10}>
								<Typography className={classes.filterContentLeft} noWrap>
									Basic
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography className={classes.filterContentRight} noWrap>
									10
								</Typography>
							</Grid>
							<Grid item xs={10}>
								<Typography className={classes.filterContentLeft}>Standard</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography className={classes.filterContentRight}>12</Typography>
							</Grid>
							<Grid item xs={10}>
								<Typography className={classes.filterContentLeft}>Premium</Typography>
							</Grid>
							<Grid item xs={2}>
								<Typography className={classes.filterContentRight}>25</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} style={{ height: '75%' }}>
						<Card style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
							<img
								src="/images/background/banner_market.png"
								style={{ width: '100%', height: '100%', objectFit: 'cover' }}
							></img>
						</Card>
					</Grid>
				</Grid>
			</Drawer>

			{
				// !handler.isSM?
				// <Grid item xs ={12}>
				//     <Grid container rowGap={0.8} style={{backgroundColor:'#161A24', padding: '15px 20px', borderRadius:'10px'}}>
				//         <Grid item xs={12} style={{paddingBottom:'5px'}}>
				//             <Typography variant="h6" className={classes.filterHead}>Categories</Typography>
				//             {/* <Divider /> */}
				//         </Grid>
				//         <Grid item xs={10}>
				//             <Typography className={classes.filterContentLeft} noWrap>Basic</Typography>
				//         </Grid>
				//         <Grid item xs={2}>
				//             <Typography className={classes.filterContentRight} noWrap>10</Typography>
				//         </Grid>
				//         <Grid item xs={10}>
				//             <Typography className={classes.filterContentLeft}>Standard</Typography>
				//         </Grid>
				//         <Grid item xs={2}>
				//             <Typography className={classes.filterContentRight}>12</Typography>
				//         </Grid>
				//         <Grid item xs={10}>
				//             <Typography className={classes.filterContentLeft}>Premium</Typography>
				//         </Grid>
				//         <Grid item xs={2}>
				//             <Typography className={classes.filterContentRight}>25</Typography>
				//         </Grid>
				//     </Grid>
				// </Grid>
				// :
				// <Grid item xs ={12}>
				//     <Button
				//         variant="outlined"
				//         className={classes.filterButton}
				//         onClick={() => {
				//             //console.log(handler.setFilterClick)
				//             handler.setFilterClick(true)
				//         }}
				//     >
				//         Categories
				//     </Button>
				// </Grid>
			}

			<Grid item xs={10} sm={8} md={12}>
				<Grid
					container
					rowGap={0.8}
					style={{ backgroundColor: '#161A24', padding: '15px 20px', borderRadius: '10px' }}
				>
					<Grid item xs={12} style={{ paddingBottom: '5px' }}>
						<Typography variant="h6" className={classes.filterHead}>
							Categories
						</Typography>
						{/* <Divider /> */}
					</Grid>
					<Grid item xs={10}>
						<Typography className={classes.filterContentLeft} noWrap>
							Basic
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography className={classes.filterContentRight} noWrap>
							10
						</Typography>
					</Grid>
					<Grid item xs={10}>
						<Typography className={classes.filterContentLeft}>Standard</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography className={classes.filterContentRight}>12</Typography>
					</Grid>
					<Grid item xs={10}>
						<Typography className={classes.filterContentLeft}>Premium</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography className={classes.filterContentRight}>25</Typography>
					</Grid>
				</Grid>
			</Grid>

			{!handler.isSM ? (
				<Grid item xs={12}>
					<Card className={classes.cardImg}>
						<img
							src="/images/background/banner_market.png"
							style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						></img>
					</Card>
				</Grid>
			) : (
				<></>
			)}
		</Grid>
	);
};

export const PetSortPanel = ({ handler }) => {
	const classes = useStyles();

	return (
		<div className={classes.filterToolBar}>
			<Select
				size="small"
				value={handler.sale}
				onChange={handler.handleChangeSale}
				className={classes.saleFilter}
				disabled
				MenuProps={{
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right',
					},
				}}
			>
				<MenuItem value={2}>All</MenuItem>
				<MenuItem value={1}>For sale</MenuItem>
				<MenuItem value={0}>Not for sale</MenuItem>
			</Select>

			<Select
				value={handler.sortValue}
				size="small"
				disabled
				onChange={handler.handleChangeSort}
				className={classes.saleFilter}
				MenuProps={{
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'left',
					},
				}}
			>
				<MenuItem value={0}>Sort by Popularity</MenuItem>
			</Select>

			<Hidden only={['sm', 'md', 'lg', 'xl']}>
				<Button
					variant="outlined"
					className={classes.saleFilter}
					onClick={() => {
						//console.log(handler.setFilterClick)
						handler.setFilterClick(true);
					}}
				>
					FILTER
				</Button>
			</Hidden>
		</div>
	);
};

export default function PetFilterHandler({ children, queryParams, inventory = '' }) {
	const theme = useTheme();
	const isSM = useMediaQuery(theme.breakpoints.down('md'));
	const isXS = useMediaQuery(theme.breakpoints.down('sm'));
	const [filterClick, setFilterClick] = useState(false);

	const defaultPage = 1;
	const defaultSort = { popular: true };
	const defaultSortValue = 0;
	const defaultSale = 1;
	const defaultPrice = [50, 450];

	let paramPage = defaultPage;
	const paramSort = defaultSort;
	const paramSortValue = defaultSortValue;
	let paramSale = defaultSale;
	const paramPrice = defaultPrice;

	for (const [key, value] of queryParams) {
		if (key === 'page') {
			paramPage = value;
		} else if (key === 'sale') {
			paramSale = value;
		}
	}

	// const [page, setPage] = useMemoryState('page', pageId);
	const [page, setPage] = useMemoryState(inventory + 'page', paramPage);

	//FILTER
	const [price, setPrice] = useMemoryState(inventory + 'price', paramPrice);
	//SORT
	const [sort, setSort] = useMemoryState(inventory + 'sort', paramSort);
	const [sortValue, setSortValue] = useMemoryState(inventory + 'sortValue', paramSortValue);
	const [sale, setSale] = useMemoryState(inventory + 'sale', paramSale);

	const handleChangeSale = (event) => {
		setPage(1);
		setSale(event.target.value);
		let newURL = updateURLParameter(window.location.href, 'page', 1);
		newURL = updateURLParameter(newURL, 'sale', event.target.value);
		window.history.replaceState('', '', newURL);
	};

	const handleChangeSort = (event) => {
		const value = event.target.value;
		doUpdateChangeSort(value);
	};

	const doUpdateChangeSort = (value) => {
		if (value === 0) setSort({ id: false, price: undefined, priceSetAt: undefined });
		if (value === 1) setSort({ id: true, price: undefined, priceSetAt: undefined });
		if (value === 2) setSort({ id: undefined, price: false, priceSetAt: undefined });
		if (value === 3) setSort({ id: undefined, price: true, priceSetAt: undefined });
		if (value === 4) setSort({ id: undefined, price: undefined, priceSetAt: true });
		setPage(1);
		setSortValue(value);
		let newURL = updateURLParameter(window.location.href, 'page', 1);
		newURL = updateURLParameter(newURL, 'sort', value);
		window.history.replaceState('', '', newURL);
	};

	const handleChangePrice = (value) => {
		setPage(1);
		setPrice(value);
		const paramVal = value[0] + '-' + value[1];
		let newURL = updateURLParameter(window.location.href, 'page', 1);
		newURL = updateURLParameter(newURL, 'price', paramVal);
		window.history.replaceState('', '', newURL);
	};

	//----END FILTER

	const handleChangePage = (_, newPage) => {
		setPage(newPage);
		window.history.replaceState('', '', updateURLParameter(window.location.href, 'page', newPage));
	};

	return cloneElement(children, {
		handler: {
			page: page,
			handleChangePage: handleChangePage,
			sale: sale,
			forSale: sale,
			sort: sort,
			handleChangeSale: handleChangeSale,
			sortValue: sortValue,
			handleChangeSort: handleChangeSort,
			doUpdateChangeSort: doUpdateChangeSort,
			filterClick: filterClick,
			setFilterClick: setFilterClick,
			price: price,
			handleChangePrice: handleChangePrice,
			isSM: isSM,
			isXS: isXS,
		},
	});
}
