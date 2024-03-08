import { useTheme } from '@emotion/react';
import { Card, Dialog, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PET_AVATAR_SIZE } from '../util/constants';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '15px 15px 0px 15px',
		height: '100%',
		display: 'block',
		borderRadius: '10px',
		backgroundColor: '#161A24',
	},
	centerGrid: {
		display: 'flex',
		justifyContent: 'center',
	},
	petAvatar: {
		width: 160,
		height: 160,
		// [theme.breakpoints.down('xl')]: {
		//     fontSize:'16px',
		// },
		[theme.breakpoints.down('sm')]: {
			width: 100,
			height: 100,
		},
		// height: '150px',
		//marginTop: theme.spacing(2),
		//marginBottom: theme.spacing(2)
	},
	petAvatarReview: {
		[theme.breakpoints.down('sm')]: {
			maxWidth: 250,
		},
		// maxWidth: '50%',
		// height: ',
	},
	petBox: {
		width: PET_AVATAR_SIZE,
		height: PET_AVATAR_SIZE,
		padding: theme.spacing(3),
		//marginTop: theme.spacing(2),
		//marginBottom: theme.spacing(2)
	},
	textBlock: {
		display: 'block',
	},
	priceBlock: {
		display: 'block',
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	factionIcon: {
		position: 'absolute',
		top: 0,
		left: '92%',
	},
	classIcon: {
		position: 'absolute',
		top: -1,
		left: '92%',
	},
	chip: {
		marginRight: theme.spacing(0.5),
		padding: 0,
	},
	nftName: {
		fontFamily: 'Sequel55',
		fontSize: '14px',
		color: 'rgb(255,255,255)',
		[theme.breakpoints.down('xl')]: {
			fontSize: '14px',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '12px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '10px',
		},
	},
	nftName2: {
		fontFamily: 'SykeMonoRegular',
		fontSize: '14px',
		color: '#CC66FF',
		[theme.breakpoints.down('xl')]: {
			fontSize: '14px',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '12px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '10px',
		},
	},
	nftAddress: {
		fontFamily: 'SykeMonoRegular',
		fontSize: '14px',
		color: '#999999',
		[theme.breakpoints.down('md')]: {
			fontSize: '12px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '10px',
		},
	},
}));

export default function PetItem({ nft }) {
	const classes = useStyles();
	const theme = useTheme();
	const isXS = useMediaQuery(theme.breakpoints.down('sm'));
	const [openReview, setOpenReview] = useState(false);

	if (!nft) return <div />;

	const handleClickImg = () => {
		setOpenReview(true);
	};
	const handleCloseImgReview = () => {
		setOpenReview(false);
	};

	return (
		<Link
			to={'/'}
			onClick={(event) => event.preventDefault()}
			style={{ textDecoration: 'none', cursor: 'default' }}
		>
			<Dialog open={openReview} onClose={handleCloseImgReview}>
				<img src={nft.avatarURL} className={classes.petAvatarReview} />
			</Dialog>
			<Card className={classes.root} onClick={handleClickImg}>
				<Grid container style={{ height: 'auto' }}>
					<Grid item xs={12} className={classes.centerGrid}>
						{/* <img src="/images/background/bg_home_1.jpg"  className={classes.petAvatar}/> */}
						<img src={nft.avatarURL} className={classes.petAvatar} />
					</Grid>
					<Grid item xs={12}>
						<div id="id" className={classes.textBlock}>
							<div style={{ display: 'block', position: 'relative', marginBottom: 2 }}>
								<Grid
									container
									rowSpacing={isXS ? 0.8 : 1.5}
									columnSpacing={1}
									style={{ padding: '15px 5px' }}
								>
									<Grid item xs={12} sm={7} md={6} lg={6.5} xl={7}>
										<Typography variant="h6" className={classes.nftName} noWrap>
											{nft.name}
										</Typography>
									</Grid>
									<Grid item xs={12} sm={5} md={6} lg={5.5} xl={5}>
										<Grid container justifyContent={isXS ? 'flex-start' : 'flex-end'}>
											<Typography variant="h6" className={classes.nftName2} noWrap>
												{nft.price + ' CHW'}
											</Typography>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<Typography variant="caption" className={classes.nftAddress}>
											{nft.address}
										</Typography>
									</Grid>
								</Grid>
							</div>
						</div>
					</Grid>
				</Grid>
			</Card>
		</Link>
	);
}
