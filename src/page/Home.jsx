import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer/Footer';
import { PATH } from '../config/routes';

const useStyles = makeStyles((theme) => ({
	page100vh: {
		height: '100vh',
		width: '100%',
		position: 'relative',
		overflow: 'hidden',
		backgroundColor: 'black',
	},
	bodyContainer: {
		padding: '0px 40px 0px 40px',
		height: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		zIndex: 2,
		[theme.breakpoints.down('sm')]: {
			padding: '0px 15px 0px 15px',
		},
	},
	listItem: {
		display: 'flex',
	},
	fullPaper: {
		height: '100%',
		width: '100%',
	},
	paperItem: {
		paddingTop: '30px',
	},
	paperHeader: {
		fontFamily: 'Sequel65',
		textTransform: 'uppercase',
		cursor: 'default',
		fontSize: '72px',
		color: 'white',
		// lineHeight:1,
		[theme.breakpoints.down('md')]: {
			fontSize: '36px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '30px',
		},
	},
	paperContent: {
		// maxWidth:'50% !important',
		// [theme.breakpoints.down('sm')]: {
		//     maxWidth:'100% !important',
		// },
	},
	paperContentText: {
		fontFamily: 'SykeMonoRegular',
		cursor: 'default',
		fontSize: '18px',
		color: 'white',
		maxWidth: '700px',
		[theme.breakpoints.down('md')]: {
			fontSize: '16px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '12px',
		},
	},
	buttonBuy: {
		borderRadius: '8px',
		border: '2px solid rgb(255, 57, 255)',
		padding: '17px 20px 20px 20px',
		[theme.breakpoints.down('sm')]: {
			padding: '12px 12px 15px 12px',
		},
		'&:hover': {
			backgroundColor: 'rgba(255, 57, 255,0.05)',
			transform: 'scale(1.1)',
			boxShadow: '0px 0px 10px rgb(255, 57, 255)',
		},
	},
	buttonPlay: {
		borderRadius: '8px',
		border: '2px solid rgb(255, 57, 255)',
		padding: '8px 20px 11px 10px',
		[theme.breakpoints.down('sm')]: {
			padding: '10px 16px 12px 10px',
		},
		'&:hover': {
			backgroundColor: 'rgba(255, 57, 255,0.05)',
			transform: 'scale(1.1)',
			boxShadow: '0px 0px 10px rgb(255, 57, 255)',
		},
	},
	buttonText: {
		fontSize: '20px',
		color: 'white',
		lineHeight: 1,
		fontFamily: 'SykeMonoMedium',
		[theme.breakpoints.down('md')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '12px',
		},
	},
	buttonIcon: {
		color: 'rgb(255, 57, 255)',
		fontSize: '35px',
		lineHeight: 1,
		[theme.breakpoints.down('sm')]: {
			fontSize: '25px',
		},
	},
	topPageBar: {
		width: '100%',
		height: '120px',
		background: 'linear-gradient(rgb(6, 9, 22), rgba(0, 0, 0, 0))',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 2,
		[theme.breakpoints.down('sm')]: {
			height: 40,
		},
	},
	endPageBar: {
		width: '100%',
		height: '120px',
		background: 'linear-gradient(to top, rgb(6, 9, 22), rgba(0, 0, 0, 0))',
		position: 'absolute',
		bottom: 0,
		left: 0,
		zIndex: 2,
		[theme.breakpoints.down('sm')]: {
			height: 40,
		},
	},
	videoBg: {
		width: '100%',
		height: '100vh',
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
	introVideo: {
		width: '100%',
		height: 'auto',
	},
	scrollArrowSection: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		backgroundColor: 'transparent',
		zIndex: 10,
	},
	partnerLine: {
		width: '100%',
	},
	partnerImg: {
		[theme.breakpoints.down('md')]: {
			maxWidth: '100px',
			maxHeight: '100px',
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '75px',
			maxHeight: '75px',
		},
		// [theme.breakpoints.down('sm')]: {
		//     transform:'scale(0.6)'
		// },
	},
	partnerImg1: {
		[theme.breakpoints.down('md')]: {
			maxWidth: '100px',
			maxHeight: '78px',
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '85px',
			maxHeight: '67px',
		},
		// [theme.breakpoints.down('sm')]: {
		//     transform:'scale(0.6)'
		// },
	},
	closeVideoButton: {
		position: 'fixed',
		right: '15px',
		top: '15px',
		zIndex: 21,
	},
}));

export function Home({ isIntroFinished, setIsIntroFinished, openDrawerMenu }) {
	const classes = useStyles();
	const [showScrollArrow, setShowScrollArrow] = useState(false);
	const [currentSection, setCurrentSection] = useState(1);
	const [showVideo, setShowVideo] = useState(false);
	const sectionRef1 = useRef();
	const sectionRef2 = useRef();
	const sectionRef3 = useRef();
	const sectionRef4 = useRef();
	const sectionRef5 = useRef();
	const sectionRef6 = useRef();

	useLayoutEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	useEffect(() => {
		document.title = 'Chibiwar: Home';

		const handleScroll = () => {
			if (
				!sectionRef2.current ||
				!sectionRef3.current ||
				!sectionRef4.current ||
				!sectionRef5.current ||
				!sectionRef6.current
			)
				return;
			if (window.scrollY < sectionRef2.current.offsetTop) {
				setShowScrollArrow(true);
				setCurrentSection(1);
			} else if (window.scrollY < sectionRef3.current.offsetTop) {
				setShowScrollArrow(true);
				setCurrentSection(2);
			} else if (window.scrollY < sectionRef4.current.offsetTop) {
				setShowScrollArrow(true);
				setCurrentSection(3);
			} else if (window.scrollY < sectionRef5.current.offsetTop) {
				setShowScrollArrow(true);
				setCurrentSection(4);
			} else if (window.scrollY < sectionRef6.current.offsetTop) {
				setShowScrollArrow(true);
				setCurrentSection(5);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleClickScrollArrow = () => {
		if (
			!sectionRef2.current ||
			!sectionRef3.current ||
			!sectionRef4.current ||
			!sectionRef5.current ||
			!sectionRef6.current
		)
			return;
		if (currentSection === 1) {
			// console.log("offsetTop",sectionRef2.current.offsetTop)
			window.scrollTo({ top: sectionRef2.current.offsetTop, behavior: 'smooth' });
			setCurrentSection(2);
		} else if (currentSection === 2) {
			// console.log("offsetTop",sectionRef3.current.offsetTop)
			window.scrollTo({ top: sectionRef3.current.offsetTop, behavior: 'smooth' });
			setCurrentSection(3);
		} else if (currentSection === 3) {
			// console.log("offsetTop",sectionRef4.current.offsetTop)
			window.scrollTo({ top: sectionRef4.current.offsetTop, behavior: 'smooth' });
			setCurrentSection(4);
		} else if (currentSection === 4) {
			// console.log("offsetTop",sectionRef5.current.offsetTop)
			window.scrollTo({ top: sectionRef5.current.offsetTop, behavior: 'smooth' });
			setCurrentSection(5);
		} else if (currentSection === 5) {
			window.scrollTo({ top: sectionRef6.current.offsetTop, behavior: 'smooth' });
			setCurrentSection(6);
		}
	};

	if (isIntroFinished) {
		const myVideo = document.getElementById('home_video_1');
		if (myVideo) {
			if (openDrawerMenu) myVideo.pause();
			else myVideo.play();
		}
	}

	const theme = useTheme();

	const isSM = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid container className={classes.fullPaper}>
			<Grid item xs={12} component="div" className={classes.page100vh} ref={sectionRef1}>
				<div className={classes.overlay}></div>
				<video
					id="home_video_1"
					autoPlay
					loop
					playsInline
					muted
					src="/videos/home_1.mp4"
					className={classes.videoBg}
				/>
				<Grid
					container
					rowGap={4}
					direction="column"
					justifyContent="center"
					alignItems="flex-start"
					className={classes.bodyContainer}
				>
					<Grid item>
						<Typography variant="h1" className={classes.paperHeader}>
							CHIBIWAR CHW
						</Typography>
					</Grid>
					<Grid item className={classes.paperContent}>
						<Typography variant="h6" className={classes.paperContentText}>
							Chapter 0 has begun, see you in Chibiwar.
						</Typography>
					</Grid>
					<Grid item>
						<Link to={PATH.BUYTOKEN.path} style={{ textDecoration: 'none' }}>
							<Grid
								container
								justifyContent="flex-start"
								alignItems="center"
								className={classes.buttonBuy}
							>
								<Grid item>
									<img src="/images/logo/logo1.png" style={{ width: '20px' }} />
								</Grid>
								<Grid item style={{ paddingLeft: '15px', cursor: 'pointer' }}>
									<Typography className={classes.buttonText}>Buy CHW</Typography>
								</Grid>
							</Grid>
						</Link>
					</Grid>
				</Grid>
				<div className={classes.endPageBar}></div>
				<div className={classes.topPageBar}></div>
			</Grid>
			<Grid item xs={12} className={classes.page100vh} ref={sectionRef2}>
				<div className={classes.overlay} style={{ backgroundColor: 'rgba(0,0,0,.6)' }}></div>
				<img src="/images/background/bg_home_1.jpg" className={classes.videoBg} />
				<Grid
					container
					rowGap={4}
					direction="column"
					justifyContent="center"
					alignItems="flex-start"
					className={classes.bodyContainer}
				>
					<Grid item>
						<Typography variant="h1" className={classes.paperHeader}>
							THE STORY <br /> SO FAR
						</Typography>
					</Grid>
					<Grid item className={classes.paperContent}>
						<Typography variant="h6" className={classes.paperContentText}>
							Farm life isn’t for everyone. So Pig, Goat and Bird hopped the fence to visit their old
							friend Mel in the city. But they’re not the only ones going places, otherworldly beings
							called Nyx found the rift that Pig “accidentally” created and they’re heading to ChibiWar
							too. In a secret lab, Mayor Mel is trying to harness the fantastic energy to bring his dream
							to life. The story of ChibiWar is only just beginning…
						</Typography>
					</Grid>
					<Grid item>
						<Grid
							container
							justifyContent="flex-start"
							alignItems="center"
							className={classes.buttonPlay}
							onClick={() => {
								setShowVideo(true);
							}}
						>
							<Grid item style={{ lineHeight: 1, cursor: 'pointer' }}>
								<PlayArrowIcon className={classes.buttonIcon}></PlayArrowIcon>
							</Grid>
							<Grid item style={{ paddingLeft: '8px', cursor: 'pointer' }}>
								<Typography className={classes.buttonText}>Play</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<div className={classes.endPageBar}></div>
				<div className={classes.topPageBar}></div>
			</Grid>
			<Grid item xs={12} className={classes.page100vh} ref={sectionRef3}>
				<div className={classes.overlay} style={{ backgroundColor: 'rgba(0,0,0,.5)' }}></div>
				<img src="/images/background/bg_home_2.jpg" className={classes.videoBg} />
				<Grid
					container
					rowSpacing={4}
					direction="column"
					justifyContent="center"
					alignItems="flex-start"
					className={classes.bodyContainer}
				>
					<Grid item>
						<Typography variant="h1" className={classes.paperHeader}>
							WHAT ARE CHW?
						</Typography>
					</Grid>
					<Grid item className={classes.paperContent}>
						<Typography variant="h6" className={classes.paperContentText}>
							CHW are the essence of the lives you lose in gaming. They travel from their world through
							rifts in the space-time continuum and are building games that you play for rewards in
							Chibiwar.
						</Typography>
					</Grid>
				</Grid>
				<div className={classes.endPageBar}></div>
				<div className={classes.topPageBar}></div>
			</Grid>
			<Grid item xs={12} className={classes.page100vh} ref={sectionRef4}>
				<div className={classes.overlay} style={{ backgroundColor: 'rgba(0,0,0,.5)' }}></div>
				<video autoPlay loop playsInline muted src="/videos/home_3.mp4" className={classes.videoBg} />
				<Grid
					container
					rowGap={4}
					direction="column"
					justifyContent="center"
					alignItems="flex-start"
					className={classes.bodyContainer}
				>
					<Grid item>
						<Typography variant="h1" className={classes.paperHeader}>
							THE COLLECTION
						</Typography>
					</Grid>
					<Grid item className={classes.paperContent}>
						<Typography variant="h1" className={classes.paperContentText}>
							This is the first Chibiwar collection. 9999 digital collectibles inspired by our love of
							gaming. Holding CHW gives collectors access to the Chibiwar platform, our games, rewards,
							and…
						</Typography>
					</Grid>
				</Grid>
				<div className={classes.endPageBar}></div>
				<div className={classes.topPageBar}></div>
			</Grid>
			<Grid item xs={12} className={classes.page100vh} ref={sectionRef5}>
				<div className={classes.overlay} style={{ backgroundColor: 'rgba(0,0,0,.6)' }}></div>
				<img src="/images/background/bg_home_3.png" className={classes.videoBg} />
				<Grid
					rowGap={{ xs: 2, sm: 2, md: 4, lg: 6, xl: 10 }}
					direction="column"
					container
					justifyContent="center"
					alignItems="flex-start"
					className={classes.bodyContainer}
				>
					<Grid item>
						<Typography variant="h1" className={classes.paperHeader}>
							Our Partners
						</Typography>
					</Grid>
					<Grid item className={classes.partnerLine}>
						<Grid
							container
							columnSpacing={{ xs: 2, sm: 4, md: 6, lg: 8 }}
							justifyContent="center"
							alignItems="center"
						>
							<Grid item>
								<img src="/images/logo/partner_1.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_2.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_3.png" className={classes.partnerImg}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_4.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_5.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_6.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_7.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_8.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_9.png" className={classes.partnerImg}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_10.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_11.png" className={classes.partnerImg}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_12.png" className={classes.partnerImg1}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_13.png" className={classes.partnerImg}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_14.png" className={classes.partnerImg}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_15.png" className={classes.partnerImg}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_16.png" className={classes.partnerImg}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_17.png" className={classes.partnerImg}></img>
							</Grid>
							<Grid item>
								<img src="/images/logo/partner_18.png" className={classes.partnerImg}></img>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<div className={classes.endPageBar}></div>
				<div className={classes.topPageBar}></div>
			</Grid>
			<Grid
				item
				xs={12}
				className={classes.page100vh}
				style={{
					height: 'auto',
				}}
				ref={sectionRef6}
			>
				<img
					src="/images/CHWTK.jpg"
					className={classes.videoBg}
					style={{
						height: 'auto',
						position: 'relative',
					}}
				/>
				<div className={classes.endPageBar}></div>
				<div className={classes.topPageBar}></div>
			</Grid>
			{showScrollArrow ? (
				<Grid item className={classes.scrollArrowSection}>
					<Grid container justifyContent="center" alignItems="center" style={{ width: '100%' }}>
						<IconButton onClick={handleClickScrollArrow}>
							<KeyboardArrowDownIcon
								sx={
									isSM
										? { color: 'rgb(255, 57, 255)', fontSize: '40px' }
										: { color: 'rgb(255, 57, 255)', fontSize: '60px' }
								}
							/>
						</IconButton>
					</Grid>
				</Grid>
			) : (
				<></>
			)}

			<Footer />
			{!isIntroFinished ? (
				<Grid item style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 2000 }}>
					<Grid
						container
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: 'black',
							justifyContent: 'center',
							alignItems: 'center',
							display: 'flex',
						}}
					>
						<Grid item xs={12} md={4.5}>
							<video
								autoPlay
								muted
								playsInline
								src="/videos/intro.mp4"
								className={classes.introVideo}
								onEnded={() => setIsIntroFinished(true)}
							></video>
						</Grid>
					</Grid>
				</Grid>
			) : (
				<></>
			)}

			{showVideo ? (
				<Fragment>
					<IconButton
						onClick={() => {
							setShowVideo(false);
						}}
						className={classes.closeVideoButton}
					>
						<CloseIcon style={{ color: 'white', fontSize: '40px' }} />
					</IconButton>
					<Grid item style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 20 }}>
						<Grid
							container
							style={{
								width: '100%',
								height: '100%',
								backgroundColor: 'black',
								justifyContent: 'center',
								alignItems: 'center',
								display: 'flex',
							}}
						>
							<Grid item xs={12} xl={11}>
								<iframe
									src="https://streamable.com/e/9dvi9r"
									width="100%"
									height="100%"
									style={{
										width: '100%',
										height: '100%',
										position: 'absolute',
										left: '0px',
										top: '0px',
										overflow: 'hidden',
									}}
								></iframe>
							</Grid>
						</Grid>
					</Grid>
				</Fragment>
			) : (
				<></>
			)}
		</Grid>
	);
}
