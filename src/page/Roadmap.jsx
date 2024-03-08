import { useTheme } from '@emotion/react';
import CheckIcon from '@mui/icons-material/Check';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Footer from '../component/Footer/Footer';

const useStyles = makeStyles((theme) => ({
	fullPaper: {
		width: '100%',
		color: 'rgb(255, 255, 255)',
		backgroundColor: 'black',
	},
	imgBg: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		objectFit: 'cover',
		zIndex: 1,
	},
	imgBg2: {
		width: '20px',
		height: '3000px',
		position: 'absolute',
		zIndex: 1,
		top: 154,
		left: 365,
		bottom: 0,
		right: 0,
		[theme.breakpoints.down('lg')]: {
			top: 122,
			left: 290,
		},
		[theme.breakpoints.down('md')]: {
			width: '16px',
			top: 88,
			left: 192,
		},
		[theme.breakpoints.down('sm')]: {
			width: '10px',
			top: 63,
			left: 10,
		},
	},
	bodyItemCheckBox1: {
		backgroundColor: '#FFE566',
		borderRadius: '10px',
		border: '1px solid #CC66FF',
		position: 'absolute',
		zIndex: 2,
		left: 341,
		top: 348,
		padding: '10px 13px 6px 13px',
		[theme.breakpoints.down('lg')]: {
			left: 271,
			top: 309,
		},
		[theme.breakpoints.down('md')]: {
			padding: '7px 9px 3px 9px',
			left: 180,
			top: 267,
		},
		[theme.breakpoints.down('sm')]: {
			left: -3,
			top: 245,
		},
	},
	bodyItemCheckBox2: {
		backgroundColor: '#FFE566',
		borderRadius: '10px',
		border: '1px solid #CC66FF',
		position: 'absolute',
		zIndex: 2,
		left: 341,
		top: 752,
		padding: '10px 13px 6px 13px',
		[theme.breakpoints.down('lg')]: {
			left: 271,
			top: 702,
		},
		[theme.breakpoints.down('md')]: {
			padding: '7px 9px 3px 9px',
			left: 180,
			top: 654,
		},
		[theme.breakpoints.down('sm')]: {
			left: -3,
			top: 582,
		},
	},

	bodyItemCheckBox3: {
		backgroundColor: '#FFE566',
		borderRadius: '10px',
		border: '1px solid #CC66FF',
		position: 'absolute',
		zIndex: 2,
		left: 341,
		top: 1071,
		padding: '10px 13px 6px 13px',
		[theme.breakpoints.down('lg')]: {
			left: 271,
			top: 1032,
		},
		[theme.breakpoints.down('md')]: {
			padding: '7px 9px 3px 9px',
			left: 180,
			top: 989,
		},
		[theme.breakpoints.down('sm')]: {
			left: -3,
			top: 966,
		},
	},
	bodyItemCheckBox4: {
		backgroundColor: '#FFE566',
		borderRadius: '10px',
		border: '1px solid #CC66FF',
		position: 'absolute',
		zIndex: 2,
		left: 341,
		top: 1465,
		padding: '10px 13px 6px 13px',
		[theme.breakpoints.down('lg')]: {
			left: 271,
			top: 1416,
		},
		[theme.breakpoints.down('md')]: {
			padding: '7px 9px 3px 9px',
			left: 180,
			top: 1368,
		},
		[theme.breakpoints.down('sm')]: {
			left: -3,
			top: 1329,
		},
	},
	bodyItemCheckBox5: {
		backgroundColor: '#FFE566',
		borderRadius: '10px',
		border: '1px solid #CC66FF',
		position: 'absolute',
		zIndex: 2,
		left: 341,
		top: 1796,
		padding: '10px 13px 6px 13px',
		[theme.breakpoints.down('lg')]: {
			left: 271,
			top: 1750,
		},
		[theme.breakpoints.down('md')]: {
			padding: '7px 9px 3px 9px',
			left: 180,
			top: 1732,
		},
		[theme.breakpoints.down('sm')]: {
			left: -3,
			top: 1714,
		},
	},
	bodyItemCheckBox6: {
		backgroundColor: '#FFE566',
		borderRadius: '10px',
		border: '1px solid #CC66FF',
		position: 'absolute',
		zIndex: 2,
		left: 341,
		top: 2108,
		padding: '10px 13px 6px 13px',
		[theme.breakpoints.down('lg')]: {
			left: 271,
			top: 2078,
		},
		[theme.breakpoints.down('md')]: {
			padding: '7px 9px 3px 9px',
			left: 180,
			top: 2035,
		},
		[theme.breakpoints.down('sm')]: {
			left: -3,
			top: 2012,
		},
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,.3)',
		zIndex: 3,
	},
	bodyContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		// height:'100%',
		zIndex: 3,
		paddingTop: '190px',
		[theme.breakpoints.down('sm')]: {
			paddingLeft: 15,
			paddingRight: 15,
		},
	},
	page100vh: {
		width: '100%',
		height: '2600px',
		position: 'relative',
		overflow: 'hidden',
		[theme.breakpoints.down('lg')]: {
			height: '2500px',
		},
		[theme.breakpoints.down('md')]: {
			height: '2450px',
		},
		[theme.breakpoints.down('sm')]: {
			height: '2400px',
		},
	},
	gridCenter: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleItem: {
		width: '750px',
		// height:'150px',
		border: '2px solid #CC66FF',
		borderRadius: '15px',
		backgroundColor: '#00000050',
		position: 'relative',
		[theme.breakpoints.down('lg')]: {
			width: '600px',
		},
		[theme.breakpoints.down('md')]: {
			width: '400px',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	titleText: {
		fontFamily: 'Sequel65',
		textTransform: 'uppercase',
		cursor: 'default',
		fontSize: '72px',
		color: '#FFE566',
		lineHeight: 1,
		padding: '30px 0 50px 0',
		textAlign: 'center',
		// lineHeight:1,
		[theme.breakpoints.down('lg')]: {
			fontSize: '56px',
			padding: '25px 0 39px 0',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '36px',
			padding: '20px 0 30px 0',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '26px',
			padding: '15px 0 20px 0',
		},
	},
	bodyItem: {
		width: '68%',
		minHeight: '260px',
		[theme.breakpoints.down('xl')]: {
			width: '80%',
		},
		[theme.breakpoints.down('lg')]: {
			width: '85%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			minHeight: '230px',
		},
	},
	bodyText1: {
		fontFamily: 'Sequel65',
		fontSize: '28px',
		cursor: 'default',
		textTransform: 'uppercase',
		color: '#CC66FF',
		// textAlign:'left',
		[theme.breakpoints.down('md')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '16px',
		},
	},
	bodyTextItem2: {
		backgroundColor: '#101C3F',
		padding: '12px 15px',
		borderRadius: '8px',
	},
	bodyText2: {
		fontFamily: 'SykeMonoThin',
		cursor: 'default',
		fontSize: '18px',
		color: 'white',
		[theme.breakpoints.down('lg')]: {
			fontSize: '14px',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '12px',
		},
	},
	bodyText3: {
		fontFamily: 'SykeMonoThin',
		cursor: 'default',
		fontSize: '18px',
		color: 'white',
		[theme.breakpoints.down('lg')]: {
			fontSize: '14px',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '12px',
		},
	},
	bodyItemContainer1: {
		width: '80%',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: '#000B28',
		borderRadius: '10px',
		border: '1px solid #CC66FF',
		padding: '15px 20px',
		boxShadow: '6px 6px rgb(255,255,255)',
		[theme.breakpoints.down('lg')]: {
			width: '85%',
		},
		[theme.breakpoints.down('md')]: {
			boxShadow: '3px 3px rgb(255,255,255)',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	bodyImg1: {
		position: 'absolute',
		left: '-85px',
		top: '-80px',
		width: '170px',
		[theme.breakpoints.down('lg')]: {
			width: '100px',
			left: '-50px',
			top: '-60px',
		},
		[theme.breakpoints.down('md')]: {
			width: '60px',
			left: '-30px',
			top: '-35px',
		},
	},

	bodyItemContainer2: {
		width: '80%',
		position: 'absolute',
		top: 0,
		right: 0,
		backgroundColor: '#000B28',
		borderRadius: '10px',
		border: '1px solid #CC66FF',
		padding: '10px 15px',
		boxShadow: '-6px 6px rgb(255,255,255)',
		[theme.breakpoints.down('lg')]: {
			width: '85%',
		},
		[theme.breakpoints.down('md')]: {
			boxShadow: '-3px 3px rgb(255,255,255)',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	bodyImg2: {
		position: 'absolute',
		right: '-85px',
		top: '-80px',
		width: '170px',
		[theme.breakpoints.down('lg')]: {
			width: '100px',
			right: '-50px',
			top: '-60px',
		},
		[theme.breakpoints.down('md')]: {
			width: '60px',
			right: '-30px',
			top: '-35px',
		},
	},
}));

export function Roadmap() {
	const classes = useStyles();
	const theme = useTheme();
	const isMD = useMediaQuery(theme.breakpoints.only('md'));
	const isSM = useMediaQuery(theme.breakpoints.only('sm'));
	const isXS = useMediaQuery(theme.breakpoints.only('xs'));

	const getCheckIcon = (isChecked = false) => {
		if (isMD) {
			return isChecked ? (
				<CheckIcon style={{ fontSize: '30px', color: 'rgb(0,0,0)', lineHeight: 1 }} />
			) : (
				<CheckIcon style={{ fontSize: '30px', color: 'rgb(0,0,0)', lineHeight: 1, opacity: 0 }} />
			);
		}

		if (isSM) {
			return isChecked ? (
				<CheckIcon style={{ fontSize: '20px', color: 'rgb(0,0,0)', lineHeight: 1 }} />
			) : (
				<CheckIcon style={{ fontSize: '20px', color: 'rgb(0,0,0)', lineHeight: 1, opacity: 0 }} />
			);
		}

		if (isXS) {
			return isChecked ? (
				<CheckIcon style={{ fontSize: '16px', color: 'rgb(0,0,0)', lineHeight: 1 }} />
			) : (
				<CheckIcon style={{ fontSize: '16px', color: 'rgb(0,0,0)', lineHeight: 1, opacity: 0 }} />
			);
		}

		return isChecked ? (
			<CheckIcon style={{ fontSize: '40px', color: 'rgb(0,0,0)', lineHeight: 1 }} />
		) : (
			<CheckIcon style={{ fontSize: '40px', color: 'rgb(0,0,0)', lineHeight: 1, opacity: 0 }} />
		);
	};

	return (
		<Grid container className={classes.fullPaper}>
			<Grid item xs={12} className={classes.page100vh}>
				<img src="images/background/bg_roadMap.png" className={classes.imgBg} />
				<div className={classes.overlay}></div>
				<Grid
					container
					rowGap={12}
					direction="column"
					justifyContent="flex-start"
					alignItems={isXS ? 'center' : 'center'}
					className={classes.bodyContainer}
				>
					<Grid item className={classes.titleItem}>
						<Typography className={classes.titleText}>ROADMAP</Typography>
						<img src="images/background/bg_roadMap2.png" className={classes.imgBg2} />
						<div className={classes.bodyItemCheckBox1} style={{}}>
							{getCheckIcon(true)}
						</div>
						<div className={classes.bodyItemCheckBox2} style={{}}>
							{getCheckIcon(true)}
						</div>
						<div className={classes.bodyItemCheckBox3} style={{}}>
							{getCheckIcon()}
						</div>
						<div className={classes.bodyItemCheckBox4} style={{}}>
							{getCheckIcon()}
						</div>
						<div className={classes.bodyItemCheckBox5} style={{}}>
							{getCheckIcon()}
						</div>
						<div className={classes.bodyItemCheckBox6} style={{}}>
							{getCheckIcon()}
						</div>
					</Grid>
					<Grid item className={classes.bodyItem}>
						<Grid
							container
							justifyContent={isXS ? 'flex-end' : 'flext-start'}
							alignItems="center"
							style={{ width: '100%' }}
						>
							<Grid item xs={10} sm={6} position="relative">
								<Grid container rowGap={1.5} className={classes.bodyItemContainer1}>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText1}
											style={isXS ? { textAlign: 'center' } : { textAlign: 'right' }}
										>
											Chibistone 1
										</Typography>
									</Grid>
									<Grid item xs={12} className={classes.bodyTextItem2}>
										<Typography
											className={classes.bodyText2}
											style={isXS ? { textAlign: 'left' } : { textAlign: 'right' }}
										>
											Dec 1st - 30th, 2023
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText3}
											style={isXS ? { textAlign: 'left' } : { textAlign: 'right' }}
										>
											Founded Chibi team <br />
											Design Website
											<br />
											Design game system
											<br />
											Introduce gameplay
										</Typography>
									</Grid>
								</Grid>
								{/* <div className={classes.bodyItemCheckBox1}>
                                    {getCheckIcon(true)}
                                </div> */}
								<img src="/images/section/section_chapter_5_2.png" className={classes.bodyImg1}></img>
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.bodyItem} style={isXS ? { minHeight: '331px' } : { minHeight: 290 }}>
						<Grid container justifyContent="flex-end" alignItems="center" style={{ width: '100%' }}>
							<Grid item xs={10} sm={6} position="relative">
								<Grid container rowGap={1.5} className={classes.bodyItemContainer2}>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText1}
											style={isXS ? { textAlign: 'center' } : { textAlign: 'left' }}
										>
											Chibistone 2
										</Typography>
									</Grid>
									<Grid item xs={12} className={classes.bodyTextItem2}>
										<Typography className={classes.bodyText2} style={{ textAlign: 'left' }}>
											Feb 1st - Apr 11th, 2024
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.bodyText3} style={{ textAlign: 'left' }}>
											Launch Website
											<br />
											Open Seed Round
											<br />
											Open Private Sale
											<br />
											Open Public Sale
											<br />
											Audit Smart Contract
											<br />
											CMC - CEX listing
											<br />
											Game Phase 1 Launch
											<br />
											NFT market launch
											<br />
										</Typography>
									</Grid>
								</Grid>
								{/* <div className={classes.bodyItemCheckBox2}>
                                    {getCheckIcon(true)}
                                </div> */}
								<img
									src="/images/section/section_chapter_5_2.png"
									className={isXS ? classes.bodyImg1 : classes.bodyImg2}
								></img>
							</Grid>
						</Grid>
					</Grid>

					<Grid item className={classes.bodyItem}>
						<Grid
							container
							justifyContent={isXS ? 'flex-end' : 'flext-start'}
							alignItems="center"
							style={{ width: '100%' }}
						>
							<Grid item xs={10} sm={6} position="relative">
								<Grid container rowGap={1.5} className={classes.bodyItemContainer1}>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText1}
											style={isXS ? { textAlign: 'center' } : { textAlign: 'right' }}
										>
											Chibistone 3
										</Typography>
									</Grid>
									<Grid item xs={12} className={classes.bodyTextItem2}>
										<Typography
											className={classes.bodyText2}
											style={isXS ? { textAlign: 'left' } : { textAlign: 'right' }}
										>
											Apr 10th - May 11th, 2024
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText3}
											style={isXS ? { textAlign: 'left' } : { textAlign: 'right' }}
										>
											Add 5+ Games to Our Ecosystem
											<br />
											Approve NFTs for Staking
										</Typography>
									</Grid>
								</Grid>
								{/* <div className={classes.bodyItemCheckBox2}>
                                    {getCheckIcon(true)}
                                </div> */}
								<img src="/images/section/section_chapter_5_2.png" className={classes.bodyImg1}></img>
							</Grid>
						</Grid>
					</Grid>

					<Grid item className={classes.bodyItem} style={isXS ? { minHeight: '303px' } : { minHeight: 250 }}>
						<Grid container justifyContent="flex-end" alignItems="center" style={{ width: '100%' }}>
							<Grid item xs={10} sm={6} position="relative">
								<Grid container rowGap={1.5} className={classes.bodyItemContainer2}>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText1}
											style={isXS ? { textAlign: 'center' } : { textAlign: 'left' }}
										>
											Chibistone 4
										</Typography>
									</Grid>
									<Grid item xs={12} className={classes.bodyTextItem2}>
										<Typography className={classes.bodyText2} style={{ textAlign: 'left' }}>
											May 15th - July 11th, 2024
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.bodyText3} style={{ textAlign: 'left' }}>
											Add 15+ Games to Our Ecosystem
											<br />
											New In-Game Feature: Boss
											<br />
											Battles, earn CHW, BNB
											<br />
											New In-Game Feature: Multi - Hero
											<br />
											Battle
										</Typography>
									</Grid>
								</Grid>
								{/* <div className={classes.bodyItemCheckBox2}>
                                    {getCheckIcon()}
                                </div> */}
								<img
									src="/images/section/section_chapter_5_2.png"
									className={isXS ? classes.bodyImg1 : classes.bodyImg2}
								></img>
							</Grid>
						</Grid>
					</Grid>

					<Grid item className={classes.bodyItem}>
						<Grid
							container
							justifyContent={isXS ? 'flex-end' : 'flext-start'}
							alignItems="center"
							style={{ width: '100%' }}
						>
							<Grid item xs={10} sm={6} position="relative">
								<Grid container rowGap={1.5} className={classes.bodyItemContainer1}>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText1}
											style={isXS ? { textAlign: 'center' } : { textAlign: 'right' }}
										>
											Chibistone 5
										</Typography>
									</Grid>
									<Grid item xs={12} className={classes.bodyTextItem2}>
										<Typography
											className={classes.bodyText2}
											style={isXS ? { textAlign: 'left' } : { textAlign: 'right' }}
										>
											July 15th - Aug 25th, 2024
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText3}
											style={isXS ? { textAlign: 'left' } : { textAlign: 'right' }}
										>
											Add 25+ Games to Our Ecosystem
											<br />
											New Gameplay Mode: MOBA
											<br />
											New In-Game Feature: Co-owner
											<br />
											NFT Estate
										</Typography>
									</Grid>
								</Grid>
								{/* <div className={classes.bodyItemCheckBox1}>
                                    {getCheckIcon()}
                                </div> */}
								<img src="/images/section/section_chapter_5_2.png" className={classes.bodyImg1}></img>
							</Grid>
						</Grid>
					</Grid>

					<Grid item className={classes.bodyItem}>
						<Grid container justifyContent="flex-end" alignItems="center" style={{ width: '100%' }}>
							<Grid item xs={10} sm={6} position="relative">
								<Grid container rowGap={1.5} className={classes.bodyItemContainer2}>
									<Grid item xs={12}>
										<Typography
											className={classes.bodyText1}
											style={isXS ? { textAlign: 'center' } : { textAlign: 'left' }}
										>
											Chibistone 6
										</Typography>
									</Grid>
									<Grid item xs={12} className={classes.bodyTextItem2}>
										<Typography className={classes.bodyText2} style={{ textAlign: 'left' }}>
											Coming soon!
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.bodyText3} style={{ textAlign: 'left' }}>
											Coming soon!
										</Typography>
									</Grid>
								</Grid>
								{/* <div className={classes.bodyItemCheckBox2} style={{top:'55px'}}>
                                    {getCheckIcon()}
                                </div> */}
								<img
									src="/images/section/section_chapter_5_2.png"
									className={isXS ? classes.bodyImg1 : classes.bodyImg2}
								></img>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Footer />
		</Grid>
	);
}
