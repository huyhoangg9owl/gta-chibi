import { Button, Fade, Grid, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
// import Button, { ButtonProps } from "@mui/material/Button";
import { useTheme } from '@emotion/react';
import { makeStyles } from '@mui/styles';
import Footer from '../component/Footer/Footer';
import { VisionPages } from './VisionPages';

const useStyles = makeStyles((theme) => ({
	page100vh: {
		// backgroundImage: 'url("/images/background/bg_home_1.png")',
		// backgroundSize: 'cover',
		height: '100vh',
		width: '100%',
		position: 'relative',
		backgroundColor: 'rgb(0,0,0)',
	},
	backgroundContainer: {
		padding: '0px 40px 0px 40px',
		height: '100%',
		width: '100%',
	},
	listItem: {
		display: 'flex',
	},
	fullPaper: {
		height: '100%',
		width: '100%',
	},
	paperContent: {
		fontFamily: 'SykeMonoRegular',
		fontSize: '18px',
		maxWidth: '700px',
		[theme.breakpoints.down('md')]: {
			fontSize: '16px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '12px',
		},
	},
	button: {
		borderRadius: '5px',
		border: '1px solid #CC66FF',
		padding: '10px',
	},
	topPageBar: {
		width: '100%',
		height: '120px',
		background: 'linear-gradient(rgb(6, 9, 22), rgba(0, 0, 0, 0))',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 2,
		opacity: 0.8,
	},
	endPageBar: {
		width: '100%',
		height: '120px',
		background: 'linear-gradient(to top, rgb(6, 9, 22), rgba(0, 0, 0, 0))',
		position: 'absolute',
		bottom: 0,
		left: 0,
		zIndex: 2,
		opacity: 0.8,
	},
	slideButton: {
		borderRadius: '4px',
		backgroundColor: 'rgb(255,255,255)',
		opacity: 0.4,
		boxShadow: 'none',
		height: '10px',
		minHeight: '10px',
		width: '55px',
		minWidth: '55px',
		'&:hover': {
			backgroundColor: 'rgb(255,255,255)',
		},
		[theme.breakpoints.down('md')]: {
			// height:'25px',
			// minHeight:'25px',
			width: '45px',
			minWidth: '45px',
		},
	},
	slideButtonChosen: {
		borderRadius: '4px',
		backgroundColor: 'rgb(255, 57, 255)',
		boxShadow: 'none',
		height: '10px',
		minHeight: '10px',
		width: '55px',
		minWidth: '55px',
		'&:hover': {
			backgroundColor: 'rgb(255, 57, 255)',
		},
		[theme.breakpoints.down('md')]: {
			width: '45px',
			minWidth: '45px',
		},
	},
	switchPage: {
		position: 'absolute',
		top: '70%',
		width: '100%',
		// height:'15px',
		zIndex: 2,
		padding: '0px 40px 0px 40px',
		// [theme.breakpoints.down('xl')]: {
		//     top: '72%',
		// },
		// [theme.breakpoints.down('lg')]: {
		//     top: '78%',
		// },
		[theme.breakpoints.down('md')]: {
			top: '66%',
		},
		[theme.breakpoints.down('sm')]: {
			// top: '60%',
			padding: '0px 15px 0px 15px',
		},
	},
	bodyContainer: {
		padding: '0px 40px 0px 40px',
		height: '100%',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			padding: '0px 15px 0px 15px',
		},
		// position:'absolute',
		// top:0,
		// zIndex:2,
	},
	imgBg: {
		width: '100%',
		height: '100vh',
		position: 'absolute',
		objectFit: 'cover',
		zIndex: 1,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
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
	paperHeader: {
		fontFamily: 'Sequel65',
		textTransform: 'uppercase',
		fontSize: '72px',
		[theme.breakpoints.down('md')]: {
			fontSize: '36px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '30px',
		},
	},
	paperItem: {
		paddingTop: '30px',
	},
}));

// const ColorButton = (key,classes, tmpPageId, setFadeIn,currentPageId, setCurrentPageId) => {
//     console.log(tmpPageId)
//     function handleClick() {
//         setFadeIn(true);
//         setCurrentPageId(tmpPageId);
//     }

//     return(
//         <div key={key} className={tmpPageId === currentPageId ? classes.slideButton : classes.slideButtonChosen} onClick={handleClick}>{tmpPageId}</div>
//     )
// }
// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//     height:'20px',
//     width:'20px',
//     backgroundColor: purple[500],
//     "&:hover": {
//       backgroundColor: purple[700],
//     },
// }));

export function Vision() {
	const classes = useStyles();
	const theme = useTheme();
	const [currentPageId, setCurrentPageId] = useState(1);
	const [listFadeIn, setListFadeIn] = useState([true, false, false, false]);
	const isXS = useMediaQuery(theme.breakpoints.only('xs'));

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Chibiwar : Vision';
	}, []);

	const handleChangePage = (pageId) => {
		setCurrentPageId(pageId);
		var newListFadeIn = [false, false, false, false];
		newListFadeIn[pageId - 1] = true;
		setListFadeIn(newListFadeIn);
	};

	const getBackGroundImg = (currentPageId) => {
		console.log(currentPageId);
		let path =
			isXS && currentPageId === 3 ? VisionPages[currentPageId - 1].mb : VisionPages[currentPageId - 1].bgImg;
		return path;
	};

	const timeout = {
		appear: 2000,
		enter: 2000,
		// exit: 200,
	};

	return (
		<Grid container className={classes.fullPaper}>
			<Grid item xs={12} className={classes.page100vh}>
				<div className={classes.overlay}></div>
				<Grid
					container
					direction="column"
					justifyContent="flex-start"
					alignItems="center"
					style={{ width: '100%', height: '100%' }}
				>
					<Fade in={listFadeIn[0]} timeout={timeout}>
						{/* <Grid item style={{width:'100%', height:'100%'}}> */}
						<img src={getBackGroundImg(currentPageId)} className={classes.imgBg}></img>
						{/* </Grid> */}
					</Fade>
					<Fade in={listFadeIn[0]} timeout={timeout}>
						<Grid item style={{ width: '100%', height: '100%', position: 'absolute', top: 0, zIndex: 2 }}>
							<Grid container className={classes.bodyContainer}>
								<Grid item xs={12} height={'100%'}>
									<Grid
										container
										direction="column"
										alignItems="left-center"
										justifyContent="center"
										sx={{ minHeight: '100vh' }}
									>
										<Grid item xs={12} className={classes.paperItem}>
											<Typography
												color="rgb(255, 255, 255)"
												variant="h1"
												lineHeight={1}
												className={classes.paperHeader}
											>
												The Mission
											</Typography>
										</Grid>
										<Grid item xs={12} className={classes.paperItem}>
											<Typography
												color="rgb(255, 255, 255)"
												variant="h6"
												className={classes.paperContent}
											>
												To empower players with on-chain asset ownership through fun and
												enduring games.
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Fade>

					<Fade in={listFadeIn[1]} timeout={timeout}>
						<img src={getBackGroundImg(currentPageId)} className={classes.imgBg}></img>
					</Fade>
					<Fade in={listFadeIn[1]} timeout={timeout}>
						<Grid item style={{ width: '100%', height: '100%', position: 'absolute', top: 0, zIndex: 2 }}>
							<Grid container className={classes.bodyContainer}>
								<Grid item xs={12} height={'100%'}>
									<Grid
										container
										direction="column"
										alignItems="left-center"
										justifyContent="center"
										sx={{ minHeight: '100vh' }}
									>
										<Grid item xs={12} className={classes.paperItem}>
											<Typography
												color="rgb(255, 255, 255)"
												variant="h1"
												lineHeight={1}
												className={classes.paperHeader}
											>
												Building Together
											</Typography>
										</Grid>
										<Grid item xs={12} className={classes.paperItem}>
											<Typography
												color="rgb(255, 255, 255)"
												variant="h6"
												className={classes.paperContent}
											>
												Community is everything. We aim to engage, listen, and build with ours.
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Fade>

					<Fade in={listFadeIn[2]} timeout={timeout}>
						<img src={getBackGroundImg(currentPageId)} className={classes.imgBg}></img>
					</Fade>
					<Fade in={listFadeIn[2]} timeout={timeout}>
						<Grid item style={{ width: '100%', height: '100%', position: 'absolute', top: 0, zIndex: 2 }}>
							<Grid container className={classes.bodyContainer}>
								<Grid item xs={12} height={'100%'}>
									<Grid
										container
										direction="column"
										alignItems="left-center"
										justifyContent="center"
										sx={{ minHeight: '100vh' }}
									>
										<Grid item xs={12} className={classes.paperItem}>
											<Typography
												color="rgb(255, 255, 255)"
												variant="h1"
												lineHeight={1}
												className={classes.paperHeader}
											>
												More than <br />
												just a game
											</Typography>
										</Grid>
										<Grid item xs={12} className={classes.paperItem}>
											<Typography
												color="rgb(255, 255, 255)"
												variant="h6"
												className={classes.paperContent}
											>
												Chibiwar is a transmedia franchise that redefines interactive
												entertainment, while pushing the limits of creativity and innovation.
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Fade>

					<Fade in={listFadeIn[3]} timeout={timeout}>
						<img src={getBackGroundImg(currentPageId)} className={classes.imgBg}></img>
					</Fade>
					<Fade in={listFadeIn[3]} timeout={timeout}>
						<Grid item style={{ width: '100%', height: '100%', position: 'absolute', top: 0, zIndex: 2 }}>
							<Grid container className={classes.bodyContainer}>
								<Grid item xs={12} height={'100%'}>
									<Grid
										container
										direction="column"
										alignItems="left-center"
										justifyContent="center"
										sx={{ minHeight: '100vh' }}
									>
										<Grid item xs={12} className={classes.paperItem}>
											<Typography
												color="rgb(255, 255, 255)"
												variant="h1"
												lineHeight={1}
												className={classes.paperHeader}
											>
												Project Expansion
											</Typography>
										</Grid>
										<Grid item xs={12} className={classes.paperItem}>
											<Typography
												color="rgb(255, 255, 255)"
												variant="h6"
												className={classes.paperContent}
											>
												Chibiwar is a Web3 gaming platform and ecosystem. As a holder, you get
												access to our experiences and have direct input in our vision to expand
												Chibiwar through accessibility and user-generated content
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Fade>
				</Grid>

				<Grid item xs={12} className={classes.switchPage}>
					<Grid container spacing={1.5}>
						{VisionPages.map((page, key) => {
							return (
								<Grid item key={key}>
									<Button
										variant="contained"
										className={
											page.id === currentPageId ? classes.slideButtonChosen : classes.slideButton
										}
										onClick={() => {
											handleChangePage(page.id);
										}}
									></Button>
								</Grid>
							);
						})}
					</Grid>
				</Grid>
			</Grid>

			<Footer />
		</Grid>
	);
}
