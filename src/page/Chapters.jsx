import { Fade, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import Footer from '../component/Footer/Footer';

const useStyles = makeStyles(() => ({
	fullPaper: {
		height: '100%',
		width: '100%',
		// position:'relative',
		backgroundColor: 'black',
	},
	headerImgBg: {
		width: '100%',
		// height:'200px',
		// position:'absolute',
		// zIndex:1,
	},
	page100vh: {
		// backgroundImage: 'url("/images/background/bg_home_1.png")',
		// backgroundSize: 'cover',
		height: '100vh',
		width: '100%',
		position: 'relative',
		backgroundColor: 'rgb(0,0,0)',
	},
	imgBg: {
		width: '100%',
		// height: '100vh',
		// position:'absolute',
		// objectFit: "cover",
		zIndex: 3,
	},
	buttonSectionImg: {
		// width:'100%',
		// height:'100%',
		transform: 'scale(1)',
		transition: 'all 0.5s',
		// opacity:0,
		'&:hover': {
			transform: 'scale(1.1)',
			// opacity:1
		},
	},
	backdrop: {
		height: '100%',
		width: '100%',
		position: 'fixed',
		top: 0,
		left: 0,
		visibility: 'hidden',
		zIndex: 0,
		backgroundColor: '#fff',
	},
	backdropActived: {
		height: '100%',
		width: '100%',
		position: 'fixed',
		top: 0,
		left: 0,
		zIndex: 4,
		backgroundColor: '#060916e6',
	},
	dialogContainer: {
		height: '100%%',
		width: '100%',
	},
	dialogParagraph: {
		color: 'white',
		fontFamily: 'SykeMonoRegular',
		cursor: 'default',
	},
	dialogContent: {
		height: '3%',
		width: '30%',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		justifyContent: 'center',
		display: 'flex',
	},
	dialogContent1: {
		height: '3%',
		width: '30%',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: -50,
		right: 0,
		border: 'none',
		justifyContent: 'center',
		display: 'flex',
	},
	dialogImg1: {
		height: '3.03%',
		width: '15.7%',
		marginTop: '14.11%',
		marginLeft: '16.8%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(1.1)',
	},
	buttonSection1: {
		height: '3.03%',
		width: '15.7%',
		marginTop: '14.11%',
		marginLeft: '16.8%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		// overflow:'hidden',
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
		// '&:hover': {
		//     width:'17.7%',
		//     height:'3.43%',
		//     marginTop:'13.28%',
		//     marginLeft:'15.64%',
		// }
	},
	dialogImg2: {
		height: '3.4%',
		width: '7.71%',
		marginTop: '34.7%',
		marginLeft: '58.6%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(1.1)',
	},
	buttonSection2: {
		height: '3.4%',
		width: '7.71%',
		marginTop: '34.7%',
		marginLeft: '58.6%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg3: {
		height: '1.03%',
		width: '5.99%',
		marginTop: '32.1%',
		marginLeft: '7.5%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(1.1)',
	},
	buttonSection3: {
		height: '1.03%',
		width: '5.99%',
		marginTop: '32.1%',
		marginLeft: '7.5%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg4: {
		height: '7.4%',
		width: '28.9%',
		marginTop: '64.6%',
		marginLeft: '7%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(1.1)',
	},
	buttonSection4: {
		height: '7.4%',
		width: '28.9%',
		marginTop: '64.6%',
		marginLeft: '7%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg5: {
		height: '2.51%',
		width: '11.7%',
		marginTop: '107.1%',
		marginLeft: '72.2%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(1.1)',
	},
	buttonSection5: {
		height: '2.51%',
		width: '11.7%',
		marginTop: '107.1%',
		marginLeft: '72.2%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg6: {
		height: '3.1%',
		width: '8.07%',
		marginTop: '114.5%',
		marginLeft: '56%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(1.1)',
	},
	buttonSection6: {
		height: '3.1%',
		width: '8.07%',
		marginTop: '114.5%',
		marginLeft: '56%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg7: {
		height: '6.1%',
		width: '27.9%',
		marginTop: '120.8%',
		marginLeft: '6.4%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(1.1)',
	},
	buttonSection7: {
		height: '6.1%',
		width: '27.9%',
		marginTop: '120.8%',
		marginLeft: '6.4%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg8: {
		height: '5.21%',
		width: '27.2%',
		marginTop: '152.3%',
		marginLeft: '71.1%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(1.1)',
	},
	buttonSection8: {
		height: '5.21%',
		width: '27.2%',
		marginTop: '152.3%',
		marginLeft: '71.1%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg9: {
		height: '11.8%',
		width: '39.2%',
		marginTop: '163.7%',
		// marginLeft: '32.1%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		// marginTop: '163.7%',
		marginLeft: '4.1%',
		transform: 'scale(0.6)',
	},
	buttonSection9: {
		height: '11.8%',
		width: '39.2%',
		marginTop: '163.7%',
		marginLeft: '32.1%',
		position: 'absolute',
		zIndex: 3,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg10: {
		height: '9.06%',
		width: '74.6%',
		marginTop: '222%',
		marginLeft: '-13.51%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(0.4)',
	},
	buttonSection10: {
		height: '9.06%',
		width: '74.6%',
		marginTop: '222%',
		marginLeft: '8.49%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg11: {
		height: '8%',
		width: '49.4%',
		marginTop: '313%',
		marginLeft: '0.1%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(0.6)',
	},
	buttonSection11: {
		height: '8%',
		width: '49.4%',
		marginTop: '313%',
		marginLeft: '24.1%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
	dialogImg12: {
		height: '6.95%',
		width: '34.8%',
		marginTop: '406.7%',
		marginLeft: '5.7%',
		position: 'absolute',
		zIndex: 4,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		border: 'none',
		transform: 'scale(0.7)',
	},
	buttonSection12: {
		height: '6.95%',
		width: '34.8%',
		marginTop: '406.7%',
		marginLeft: '32.7%',
		position: 'absolute',
		zIndex: 2,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		border: 'none',
		cursor: 'pointer',
	},
}));

export function Chapters() {
	const classes = useStyles();
	const [openBd1, setOpenBd1] = useState(false);
	const [openBd2, setOpenBd2] = useState(false);
	const [openBd3, setOpenBd3] = useState(false);
	const [openBd4, setOpenBd4] = useState(false);
	const [openBd5, setOpenBd5] = useState(false);
	const [openBd6, setOpenBd6] = useState(false);
	const [openBd7, setOpenBd7] = useState(false);
	const [openBd8, setOpenBd8] = useState(false);
	const [openBd9, setOpenBd9] = useState(false);
	const [openBd10, setOpenBd10] = useState(false);
	const [openBd11, setOpenBd11] = useState(false);
	const [openBd12, setOpenBd12] = useState(false);
	const [openDialog1, setOpenDialog1] = useState(false);
	const [openDialog2, setOpenDialog2] = useState(false);
	const [openDialog3, setOpenDialog3] = useState(false);
	const [openDialog4, setOpenDialog4] = useState(false);
	const [openDialog5, setOpenDialog5] = useState(false);
	const [openDialog6, setOpenDialog6] = useState(false);
	const [openDialog7, setOpenDialog7] = useState(false);
	const [openDialog8, setOpenDialog8] = useState(false);
	const [openDialog9, setOpenDialog9] = useState(false);
	const [openDialog10, setOpenDialog10] = useState(false);
	const [openDialog11, setOpenDialog11] = useState(false);
	const [openDialog12, setOpenDialog12] = useState(false);
	const sectionRef1 = useRef();
	const sectionRef2 = useRef();
	const sectionRef3 = useRef();
	const sectionRef4 = useRef();
	const sectionRef5 = useRef();
	const sectionRef6 = useRef();
	const sectionRef7 = useRef();
	const sectionRef8 = useRef();
	const sectionRef9 = useRef();
	const sectionRef10 = useRef();
	const sectionRef11 = useRef();
	const sectionRef12 = useRef();
	const timeout = {
		appear: 1200,
		enter: 1200,
		// exit: 200,
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Chibiwar: Chapters';
		const observer1 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(0);
			}
		});
		observer1.observe(sectionRef1.current);
		const observer2 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(1);
			}
		});
		observer2.observe(sectionRef2.current);
		const observer3 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(2);
			}
		});
		observer3.observe(sectionRef3.current);
		const observer4 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(3);
			}
		});
		observer4.observe(sectionRef4.current);
		const observer5 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(4);
			}
		});
		observer5.observe(sectionRef5.current);
		const observer6 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(5);
			}
		});
		observer6.observe(sectionRef6.current);
		const observer7 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(6);
			}
		});
		observer7.observe(sectionRef7.current);
		const observer8 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(7);
			}
		});
		observer8.observe(sectionRef8.current);
		const observer9 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(8);
			}
		});
		observer9.observe(sectionRef9.current);
		const observer10 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(9);
			}
		});
		observer10.observe(sectionRef10.current);
		const observer11 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(10);
			}
		});
		observer11.observe(sectionRef11.current);
		const observer12 = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!entry.isIntersecting) {
				handleCloseDialog(11);
			}
		});
		observer12.observe(sectionRef12.current);
	}, []);

	const handleCloseDialog = (index) => {
		if (index === 0) {
			setOpenBd1(false);
			setOpenDialog1(false);
		}
		if (index === 1) {
			setOpenBd2(false);
			setOpenDialog2(false);
		}
		if (index === 2) {
			setOpenBd3(false);
			setOpenDialog3(false);
		}
		if (index === 3) {
			setOpenBd4(false);
			setOpenDialog4(false);
		}
		if (index === 4) {
			setOpenBd5(false);
			setOpenDialog5(false);
		}
		if (index === 5) {
			setOpenBd6(false);
			setOpenDialog6(false);
		}
		if (index === 6) {
			setOpenBd7(false);
			setOpenDialog7(false);
		}
		if (index === 7) {
			setOpenBd8(false);
			setOpenDialog8(false);
		}
		if (index === 8) {
			setOpenBd9(false);
			setOpenDialog9(false);
		}
		if (index === 9) {
			setOpenBd10(false);
			setOpenDialog10(false);
		}
		if (index === 10) {
			setOpenBd11(false);
			setOpenDialog11(false);
		}
		if (index === 11) {
			setOpenBd12(false);
			setOpenDialog12(false);
		}
	};
	const handleOpenDialog = (index) => {
		if (index === 0) {
			setOpenBd1(true);
			setOpenDialog1(true);
		}
		if (index === 1) {
			setOpenBd2(true);
			setOpenDialog2(true);
		}
		if (index === 2) {
			setOpenBd3(true);
			setOpenDialog3(true);
		}
		if (index === 3) {
			setOpenBd4(true);
			setOpenDialog4(true);
		}
		if (index === 4) {
			setOpenBd5(true);
			setOpenDialog5(true);
		}
		if (index === 5) {
			setOpenBd6(true);
			setOpenDialog6(true);
		}
		if (index === 6) {
			setOpenBd7(true);
			setOpenDialog7(true);
		}
		if (index === 7) {
			setOpenBd8(true);
			setOpenDialog8(true);
		}
		if (index === 8) {
			setOpenBd9(true);
			setOpenDialog9(true);
		}
		if (index === 9) {
			setOpenBd10(true);
			setOpenDialog10(true);
		}
		if (index === 10) {
			setOpenBd11(true);
			setOpenDialog11(true);
		}
		if (index === 11) {
			setOpenBd12(true);
			setOpenDialog12(true);
		}
	};

	// const onScroll = () => {
	//     if (listInnerRef.current) {
	//       const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
	//       const isNearBottom = scrollTop + clientHeight >= scrollHeight;

	//       if (isNearBottom) {
	//         console.log("Reached bottom");
	//         // DO SOMETHING HERE
	//       }
	//     }
	// };

	return (
		<Grid container className={classes.fullPaper}>
			<Grid item xs={12}>
				<img src={'/images/background/bg_chapter_header.jpg'} className={classes.headerImgBg}></img>
			</Grid>
			<Grid item xs={12} position="relative">
				<img src={'/images/background/bg_chapter_1.webp'} className={classes.imgBg}></img>
				<img src={'/images/background/bg_chapter_2.webp'} className={classes.imgBg}></img>
				<img src={'/images/background/bg_chapter_3.webp'} className={classes.imgBg}></img>
				<img src={'/images/background/bg_chapter_4.webp'} className={classes.imgBg}></img>
				<img src={'/images/background/bg_chapter_5.webp'} className={classes.imgBg}></img>
				<img src={'/images/background/bg_chapter_6.webp'} className={classes.imgBg}></img>
				<img src={'/images/background/bg_chapter_7.webp'} className={classes.imgBg}></img>

				<div
					className={openBd1 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(0);
					}}
				></div>
				<div
					className={openBd2 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(1);
					}}
				></div>
				<div
					className={openBd3 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(2);
					}}
				></div>
				<div
					className={openBd4 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(3);
					}}
				></div>
				<div
					className={openBd5 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(4);
					}}
				></div>
				<div
					className={openBd6 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(5);
					}}
				></div>
				<div
					className={openBd7 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(6);
					}}
				></div>
				<div
					className={openBd8 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(7);
					}}
				></div>
				<div
					className={openBd9 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(8);
					}}
				></div>
				<div
					className={openBd10 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(9);
					}}
				></div>
				<div
					className={openBd11 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(10);
					}}
				></div>
				<div
					className={openBd12 ? classes.backdropActived : classes.backdrop}
					onClick={() => {
						handleCloseDialog(11);
					}}
				></div>

				<button
					className={classes.buttonSection1}
					onClick={() => {
						handleOpenDialog(0);
					}}
				>
					<img
						src={'/images/section/section_chapter_1_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_1_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_1_1.png')}
					></img>
				</button>
				{openDialog1 ? (
					<img
						src={'/images/section/section_chapter_1_2.png'}
						className={classes.dialogImg1}
						style={{
							zIndex: openDialog1 ? 5 : 2,
						}}
						onClick={() => {
							handleCloseDialog(0);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog1} timeout={timeout}>
					<Grid
						component="div"
						container
						className={classes.dialogContent}
						direction="column"
						style={{ marginTop: '13%', marginLeft: '35%', zIndex: openDialog1 ? 5 : 2 }}
						ref={sectionRef1}
						onClick={() => {
							handleCloseDialog(0);
						}}
					>
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'left' }}>
							The Origin story. The directions to Chibiwar are clear, but invitations are limited. Who was
							invited?
						</Typography>
					</Grid>
				</Fade>
				<button
					className={classes.buttonSection2}
					onClick={() => {
						handleOpenDialog(1);
					}}
				>
					<img
						src={'/images/section/section_chapter_2_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_2_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_2_1.png')}
					></img>
				</button>
				{openDialog2 ? (
					<img
						src={'/images/section/section_chapter_2_2.png'}
						style={{ zIndex: openDialog2 ? 5 : 2 }}
						className={classes.dialogImg2}
						onClick={() => {
							handleCloseDialog(1);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog2} timeout={timeout}>
					<Grid
						component="div"
						container
						className={classes.dialogContent1}
						direction="column"
						style={{ marginTop: '37%', marginLeft: '27%', zIndex: openDialog2 ? 5 : 2 }}
						ref={sectionRef2}
						onClick={() => {
							handleCloseDialog(1);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'right' }}>
							Stake? Medium rare. Your stakes come with a complimentary side dish of gaming energy
							crystals.
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection3}
					onClick={() => {
						handleOpenDialog(2);
					}}
				>
					<img
						src={'/images/section/section_chapter_3_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_3_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_3_1.png')}
					></img>
				</button>
				{openDialog3 ? (
					<img
						src={'/images/section/section_chapter_3_2.png'}
						style={{ zIndex: openDialog3 ? 5 : 2 }}
						className={classes.dialogImg3}
						onClick={() => {
							handleCloseDialog(2);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog3} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						direction="column"
						style={{ marginTop: '27%', marginLeft: '15%', zIndex: openDialog3 ? 5 : 2 }}
						ref={sectionRef3}
						onClick={() => {
							handleCloseDialog(2);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'left' }}>
							?????
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection4}
					onClick={() => {
						handleOpenDialog(3);
					}}
				>
					<img
						src={'/images/section/section_chapter_4_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_4_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_4_1.png')}
					></img>
				</button>
				{openDialog4 ? (
					<img
						src={'/images/section/section_chapter_4_2.png'}
						style={{ zIndex: openDialog4 ? 5 : 2 }}
						className={classes.dialogImg4}
						onClick={() => {
							handleCloseDialog(3);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog4} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						zIndex={openDialog4 ? 5 : 2}
						direction="column"
						style={{ marginTop: '72%', marginLeft: '40%' }}
						ref={sectionRef4}
						onClick={() => {
							handleCloseDialog(3);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'left' }}>
							Rift extraction... What is Mel up to? And how did he get his hands on a rift???
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection5}
					onClick={() => {
						handleOpenDialog(4);
					}}
				>
					<img
						src={'/images/section/section_chapter_5_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_5_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_5_1.png')}
					></img>
				</button>
				{openDialog5 ? (
					<img
						src={'/images/section/section_chapter_5_2.png'}
						style={{ zIndex: openDialog5 ? 5 : 2 }}
						className={classes.dialogImg5}
						onClick={() => {
							handleCloseDialog(4);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog5} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						zIndex={openDialog5 ? 5 : 2}
						direction="column"
						style={{ width: '33%', height: '2.6%', marginTop: '107%', marginLeft: '36%' }}
						ref={sectionRef5}
						onClick={() => {
							handleCloseDialog(4);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'right' }}>
							Goats, Mountains, Climbing. The alpha is to reach your All Time Heights.
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection6}
					onClick={() => {
						handleOpenDialog(5);
					}}
				>
					<img
						src={'/images/section/section_chapter_6_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_6_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_6_1.png')}
					></img>
				</button>
				{openDialog6 ? (
					<img
						src={'/images/section/section_chapter_6_2.png'}
						style={{ zIndex: openDialog6 ? 5 : 2 }}
						className={classes.dialogImg6}
						onClick={() => {
							handleCloseDialog(5);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog6} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						zIndex={openDialog6 ? 5 : 2}
						direction="column"
						style={{ width: '48%', height: '3.3%', marginTop: '114%', marginLeft: '5%' }}
						ref={sectionRef6}
						onClick={() => {
							handleCloseDialog(5);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'right' }}>
							Their choice of beverage. Grab Alfa to replenish your essence.
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection7}
					onClick={() => {
						handleOpenDialog(6);
					}}
				>
					<img
						src={'/images/section/section_chapter_7_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_7_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_7_1.png')}
					></img>
				</button>
				{openDialog7 ? (
					<img
						src={'/images/section/section_chapter_7_2.png'}
						style={{ zIndex: openDialog7 ? 5 : 2 }}
						className={classes.dialogImg7}
						onClick={() => {
							handleCloseDialog(6);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog7} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						direction="column"
						style={{
							width: '55%',
							height: '3%',
							marginTop: '125%',
							marginLeft: '38%',
							zIndex: openDialog7 ? 5 : 2,
						}}
						ref={sectionRef7}
						onClick={() => {
							handleCloseDialog(6);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'left' }}>
							Secret tunnel? Must be something new to play with.
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection8}
					onClick={() => {
						handleOpenDialog(7);
					}}
				>
					<img
						src={'/images/section/section_chapter_8_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_8_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_8_1.png')}
					></img>
				</button>
				{openDialog8 ? (
					<img
						src={'/images/section/section_chapter_8_2.png'}
						style={{ zIndex: openDialog8 ? 5 : 2 }}
						className={classes.dialogImg8}
						onClick={() => {
							handleCloseDialog(7);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog8} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						zIndex={openDialog8 ? 5 : 2}
						direction="column"
						style={{ width: '55%', height: '3%', marginTop: '157%', marginLeft: '14%' }}
						ref={sectionRef8}
						onClick={() => {
							handleCloseDialog(7);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'right' }}>
							Energy shards have been found throughout Chibiwar.
							<br /> Rumor has it that you can use energy for [redacted].
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection9}
					onClick={() => {
						handleOpenDialog(8);
					}}
				>
					<img
						src={'/images/section/section_chapter_9_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_9_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_9_1.png')}
					></img>
				</button>
				{openDialog9 ? (
					<img
						src={'/images/section/section_chapter_9_2.png'}
						style={{ zIndex: openDialog9 ? 5 : 2 }}
						className={classes.dialogImg9}
						onClick={() => {
							handleCloseDialog(8);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog9} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						direction="column"
						style={{ marginTop: '182.7%', marginLeft: '39.1%', zIndex: openDialog9 ? 5 : 2 }}
						ref={sectionRef9}
						onClick={() => {
							handleCloseDialog(8);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'left' }}>
							What are they doing?
							<br /> What are they building?
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection10}
					onClick={() => {
						handleOpenDialog(9);
					}}
				>
					<img
						src={'/images/section/section_chapter_10_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_10_2.jpg')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_10_1.png')}
					></img>
				</button>
				{openDialog10 ? (
					<img
						src={'/images/section/section_chapter_10_2.jpg'}
						style={{ zIndex: openDialog10 ? 5 : 2 }}
						className={classes.dialogImg10}
						onClick={() => {
							handleCloseDialog(9);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog10} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						zIndex={openDialog10 ? 5 : 2}
						direction="column"
						style={{ marginTop: '235%', marginLeft: '43.5%' }}
						ref={sectionRef10}
						onClick={() => {
							handleCloseDialog(9);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'left' }}>
							Chibiwar’s next chapter. Multiple rifts,
							<br />a new world, the CHW holder.
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection11}
					onClick={() => {
						handleOpenDialog(10);
					}}
				>
					<img
						src={'/images/section/section_chapter_11_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_11_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_11_1.png')}
					></img>
				</button>
				{openDialog11 ? (
					<img
						src={'/images/section/section_chapter_11_2.png'}
						style={{ zIndex: openDialog11 ? 5 : 2 }}
						className={classes.dialogImg11}
						onClick={() => {
							handleCloseDialog(10);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog11} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						zIndex={openDialog11 ? 5 : 2}
						direction="column"
						style={{ marginTop: '323%', marginLeft: '43%' }}
						ref={sectionRef11}
						onClick={() => {
							handleCloseDialog(10);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'left' }}>
							Another invite only, but this time it’s different.
							<br />
							Which team will win it all?
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>

				<button
					className={classes.buttonSection12}
					onClick={() => {
						handleOpenDialog(11);
					}}
				>
					<img
						src={'/images/section/section_chapter_12_1.png'}
						className={classes.buttonSectionImg}
						onMouseOver={(e) => (e.currentTarget.src = '/images/section/section_chapter_12_2.png')}
						onMouseOut={(e) => (e.currentTarget.src = '/images/section/section_chapter_12_1.png')}
					></img>
				</button>
				{openDialog12 ? (
					<img
						src={'/images/section/section_chapter_12_2.png'}
						style={{ zIndex: openDialog12 ? 5 : 2 }}
						className={classes.dialogImg12}
						onClick={() => {
							handleCloseDialog(11);
						}}
					/>
				) : (
					<div></div>
				)}
				<Fade in={openDialog12} timeout={timeout}>
					<Grid
						container
						className={classes.dialogContent}
						zIndex={openDialog12 ? 5 : 2}
						direction="column"
						style={{ marginTop: '414%', marginLeft: '38%' }}
						ref={sectionRef12}
						onClick={() => {
							handleCloseDialog(11);
						}}
					>
						{/* <Grid item> */}
						<Typography className={classes.dialogParagraph} style={{ textAlign: 'left' }}>
							The mission? Connect the world through Chibiwar.
						</Typography>
						{/* </Grid> */}
					</Grid>
				</Fade>
			</Grid>

			<Footer />
		</Grid>
	);
}
