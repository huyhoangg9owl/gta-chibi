import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
import { AppBar, Drawer, Grid, IconButton, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PATH } from '../../config/routes';

const useStyles = makeStyles((theme) => ({
	appBar: {
		// backdropFilter: 'blur(2px)',
		// WebkitBackdropFilter: 'blur(2px)', // Fix on Mobile
		background: 'linear-gradient(to bottom, #000000b8 30%, rgba(0,0,0,0)) 80%',
		// zIndex: 1000,
		padding: '35px 40px 0px 40px',
		boxShadow: 'none',
		borderColor: '#e5e7eb',
		height: '130px',
		width: '100%',
		// opacity:'0.8'
		// position:'fixed'
		[theme.breakpoints.down('sm')]: {
			padding: '0px 15px 0px 15px',
			height: '115px',
		},
	},
	toolBar: {
		padding: 0,
		height: '100%',
		width: '100%',
	},

	leftNav: {
		flexGrow: 1,
		display: 'inline-flex',
	},
	icon: {
		width: 20,
		height: 20,
	},
	logo: {
		textDecoration: 'none',
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'center',
		lineHeight: 1,
		borderBottom: '4px solid transparent',
		width: '185px',
		[theme.breakpoints.down('md')]: {
			width: '150px',
		},
	},

	menuItemMobile: {
		width: '100%',
		borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
		paddingLeft: '40px',
		transition: 'all 0.6s',
		'&:hover': {
			paddingLeft: '52px',
		},
	},
	menuItemContentMobile: {
		padding: 0,
		textDecoration: 'none',
		justifyContent: 'center',
		// alignItems: 'center',
		fontSize: '25px',
		color: 'rgb(255, 255, 255)',
		fontFamily: 'Sequel65',
	},
	menuItemContent: {
		padding: 0,
		textDecoration: 'none',
		justifyContent: 'center',
		// alignItems: 'center',
		display: 'flex',
		borderBottom: '4px solid transparent',
		fontSize: '17px',
		fontWeight: 800,
		color: 'rgb(255, 255, 255)',
		lineHeight: '35px',
		fontFamily: 'Sequel55',
		'&:hover': {
			// background: "#f00",
			borderBottom: '4px solid rgb(255 93 255)',
			color: 'rgb(255 93 255)',
		},
	},
	menuItemContentActive: {
		padding: 0,
		textDecoration: 'none',
		justifyContent: 'center',
		// alignItems: 'bottom',
		display: 'flex',
		fontSize: '17px',
		fontWeight: 800,
		color: 'rgb(255 93 255)',
		borderBottom: '4px solid rgb(255 93 255)',
		lineHeight: '35px',
		fontFamily: 'Sequel55',
	},
	logoContent: {
		fontSize: '40px',
		color: 'rgb(255 355 255)',
		fontFamily: 'Sequel75',
		lineHeight: 1,
		textTransform: 'uppercase',
	},
	socialItem: {
		padding: '0px 20px 0px 20px',
		borderBottom: '4px solid transparent',
	},
	socialIcon: {
		color: 'white',
		fontSize: '33px',
	},
	menuItem: {
		padding: '0px 20px 0px 20px',
	},

	drawerPaper: {
		width: '100vw',
		backgroundColor: 'rgba(4, 6, 36, 0.2)',
		backdropFilter: 'blur(50px)',
		paddingTop: '50px',
	},
	midNav: {
		height: '100%',
		[theme.breakpoints.down('xl')]: {
			display: 'none',
		},
	},
	rightNav: {
		height: '100%',
		[theme.breakpoints.down('xl')]: {
			display: 'none',
		},
	},
	menuButton: {
		[theme.breakpoints.up('xl')]: {
			display: 'none',
		},
	},
	menuIcon: {
		fontSize: '50px',
		color: 'white',
		[theme.breakpoints.down('md')]: {
			fontSize: '45px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '40px',
		},
	},
	headerContainter: {
		position: 'fixed',
		zIndex: 10,
		minHeight: '130px',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			minHeight: '100px',
		},
	},
	headerOverlay: {
		height: '190px',
		width: '100%',
		position: 'fixed',
		zIndex: 10,
		top: 0,
		left: 0,
		mask: 'linear-gradient(black 30%,transparent)',
		backdropFilter: 'blur(40px)',
		[theme.breakpoints.down('sm')]: {
			height: '120px',
		},
	},
}));

export const ToolBarPlaceHolder = () => {
	const classes = useStyles();
	return <div className={classes.toolbar} />;
};

const HeaderBar = ({ openDrawerMenu, setOpenDrawerMenu }) => {
	const classes = useStyles();

	const handleDrawerOpen = () => {
		setOpenDrawerMenu(true);
	};

	const handleDrawerClose = () => {
		setOpenDrawerMenu(false);
	};

	return (
		<Fragment>
			<div className={classes.headerOverlay}></div>
			<Grid item xs={12} className={classes.headerContainter}>
				<AppBar className={classes.appBar}>
					<Toolbar className={classes.toolBar}>
						<Grid container style={{ height: '100%', width: '100%' }}>
							<Grid item xs={8} lg={3} xl={1.8} style={{ height: '100%' }}>
								<Grid
									container
									style={{ height: '70%' }}
									justifyContent="flex-start"
									alignItems="flex-end"
								>
									<Link to={PATH.HOME.path} className={classes.logo}>
										{<img src="/images/logo/logo_text_1.png" style={{ width: '100%' }} />}
									</Link>
								</Grid>
							</Grid>
							<Grid item xl={8.4} className={classes.midNav}>
								<Grid
									container
									style={{ height: '70%', width: '100%' }}
									justifyContent="center"
									alignItems="flex-end"
								>
									<Grid item className={classes.menuItem}>
										<NavLink
											to={PATH.HOME.path}
											className={({ isActive }) =>
												isActive ? classes.menuItemContentActive : classes.menuItemContent
											}
										>
											HOME
										</NavLink>
									</Grid>
									<Grid item className={classes.menuItem}>
										<NavLink
											to={PATH.CHAPTERS.path}
											className={({ isActive }) =>
												isActive ? classes.menuItemContentActive : classes.menuItemContent
											}
										>
											CHAPTERS
										</NavLink>
									</Grid>
									<Grid item className={classes.menuItem}>
										<NavLink
											to={PATH.VISION.path}
											className={({ isActive }) =>
												isActive ? classes.menuItemContentActive : classes.menuItemContent
											}
										>
											VISION
										</NavLink>
									</Grid>
									<Grid item className={classes.menuItem}>
										<NavLink
											to={PATH.ROADMAP.path}
											className={({ isActive }) =>
												isActive ? classes.menuItemContentActive : classes.menuItemContent
											}
										>
											ROADMAP
										</NavLink>
									</Grid>
									<Grid item className={classes.menuItem}>
										<NavLink
											to={PATH.BUYTOKEN.path}
											className={({ isActive }) =>
												isActive ? classes.menuItemContentActive : classes.menuItemContent
											}
										>
											BUY TOKEN
										</NavLink>
									</Grid>
									<Grid item className={classes.menuItem}>
										<NavLink
											to={PATH.MARKETPLACE.path}
											className={({ isActive }) =>
												isActive ? classes.menuItemContentActive : classes.menuItemContent
											}
										>
											MARKETPLACE
										</NavLink>
									</Grid>
									<Grid item className={classes.menuItem}>
										<NavLink
											to={PATH.PLAY.path}
											className={({ isActive }) =>
												isActive ? classes.menuItemContentActive : classes.menuItemContent
											}
										>
											PLAY
										</NavLink>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xl={1.8} className={classes.rightNav}>
								<Grid
									container
									style={{ height: '70%', width: '100%' }}
									justifyContent="flex-end"
									alignItems="flex-end"
								>
									<Grid item className={classes.socialItem}>
										<a
											style={{ display: 'block', height: '33px', width: '33px' }}
											href={'https://x.com/gtachibi_war?s=11'}
											rel="noopener noreferrer"
											target="_blank"
										>
											<XIcon className={classes.socialIcon} />
										</a>
									</Grid>
									<Grid item className={classes.socialItem}>
										<a
											style={{ display: 'block', height: '33px', width: '33px' }}
											href={'https://t.me/gtachibiwar_nft'}
											rel="noopener noreferrer"
											target="_blank"
										>
											<TelegramIcon className={classes.socialIcon} />
										</a>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={4} lg={9} style={{ height: '100%' }}>
								<Grid
									container
									style={{ height: '80%' }}
									justifyContent="flex-end"
									alignItems="flex-end"
								>
									<Grid item className={classes.menuButton}>
										<IconButton
											aria-label="open drawer"
											onClick={handleDrawerOpen}
											edge="start"
											sx={{ ...(openDrawerMenu && { display: 'none' }) }}
										>
											<MenuIcon className={classes.menuIcon} />
										</IconButton>
									</Grid>
									<Drawer
										classes={{ paper: classes.drawerPaper }}
										anchor="right"
										onClose={handleDrawerClose}
										variant="temporary"
										open={openDrawerMenu}
									>
										<Grid container rowSpacing={1.5}>
											<Grid
												item
												xs={12}
												style={{
													paddingBottom: '15px',
													paddingLeft: '40px',
													paddingRight: '40px',
												}}
											>
												<Grid container>
													<Grid item xs={6}>
														<Grid container justifyContent="flex-start" alignItems="center">
															<Link to={PATH.HOME.path} className={classes.logo}>
																<img
																	src="/images/logo/logo_text_1.png"
																	style={{ width: '185px' }}
																/>
															</Link>
														</Grid>
													</Grid>
													<Grid item xs={6}>
														<Grid container justifyContent="flex-end" alignItems="center">
															<CloseIcon
																onClick={handleDrawerClose}
																style={{ color: 'white', fontSize: '40px' }}
															/>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<NavLink
														onClick={handleDrawerClose}
														to={PATH.HOME.path}
														className={classes.menuItemContentMobile}
													>
														HOME
													</NavLink>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<NavLink
														onClick={handleDrawerClose}
														to={PATH.CHAPTERS.path}
														className={classes.menuItemContentMobile}
													>
														CHAPTERS
													</NavLink>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<NavLink
														onClick={handleDrawerClose}
														to={PATH.VISION.path}
														className={classes.menuItemContentMobile}
													>
														VISION
													</NavLink>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<NavLink
														onClick={handleDrawerClose}
														to={PATH.ROADMAP.path}
														className={classes.menuItemContentMobile}
													>
														ROADMAP
													</NavLink>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<NavLink
														onClick={handleDrawerClose}
														to={PATH.BUYTOKEN.path}
														className={classes.menuItemContentMobile}
													>
														BUY TOKEN
													</NavLink>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<NavLink
														onClick={handleDrawerClose}
														to={PATH.MARKETPLACE.path}
														className={classes.menuItemContentMobile}
													>
														MARKETPLACE
													</NavLink>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<NavLink
														onClick={handleDrawerClose}
														to={PATH.PLAY.path}
														className={classes.menuItemContentMobile}
													>
														PLAY
													</NavLink>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<a
														onClick={handleDrawerClose}
														className={classes.menuItemContentMobile}
														href={'https://x.com/gtachibi_war?s=11'}
														rel="noopener noreferrer"
														target="_blank"
														style={{ fontFamily: 'DecimaBold' }}
													>
														Join X
													</a>
												</Grid>
											</Grid>
											<Grid item style={{ width: '100%' }} className={classes.menuItemMobile}>
												<Grid container justifyContent="flex-start" alignItems="center">
													<a
														onClick={handleDrawerClose}
														className={classes.menuItemContentMobile}
														href={'https://t.me/gtachibiwar_nft'}
														rel="noopener noreferrer"
														target="_blank"
														style={{ fontFamily: 'DecimaBold' }}
													>
														Join Telegram
													</a>
												</Grid>
											</Grid>
										</Grid>
									</Drawer>
								</Grid>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</Grid>
		</Fragment>
	);
};
export default HeaderBar;
