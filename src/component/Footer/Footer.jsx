import { useTheme } from '@emotion/react';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	footerBar: {
		height: '100%',
		// width:'100%',
		padding: '0px 40px 0px 40px',
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
			padding: '0px 15px 0px 15px',
		},
	},
	footerItem: {
		backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgb(6, 9, 22) 20%, rgb(6, 9, 22))',
		paddingTop: '35px',
		paddingBottom: '35px',
		[theme.breakpoints.down('md')]: {
			paddingTop: '25px',
			paddingBottom: '15px',
		},
	},
	footerItem1: {
		height: '100%',
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
	topPageBar: {
		width: '100%',
		height: '25px',
		background: 'linear-gradient(rgb(6, 9, 22), rgba(0, 0, 0, 0))',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 2,
		// opacity:0.9,
		// borderTop: '10px solid rgba(0, 0, 0, 0.8)'
	},
	footerText: {
		fontFamily: 'SykeMonoThin',
		cursor: 'default',
		fontSize: '18px',
		color: 'white',
		maxWidth: '700px',
		textTransform: 'uppercase',
		[theme.breakpoints.down('md')]: {
			fontSize: '16px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '14px',
		},
	},
	footerLogo: {
		width: '50px',
		[theme.breakpoints.down('md')]: {
			width: '40px',
		},
	},
	footerContainer: {
		width: '100%',
		minHeight: '160px',
		position: 'relative',
		background: 'black',
	},
}));

export default function Footer() {
	const classes = useStyles();
	const theme = useTheme();
	const isSM = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Grid item xs={12} style={{ backgroundColor: 'black' }}>
			<Grid container>
				<Grid item xs={12} className={classes.footerItem}>
					<Grid container rowGap={1.5} direction={isSM ? 'column' : 'row'} className={classes.footerBar}>
						<Grid item xl={1} lg={1.5} md={2}>
							<Grid container justifyContent="flex-start" alignItems="center">
								<Grid item>
									<img src="/images/logo/logo1.png" alt="" className={classes.footerLogo} />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xl={11} lg={10.5} md={10}>
							<Grid
								container
								columnGap={6}
								rowGap={1}
								style={!isSM ? { height: '100%' } : {}}
								direction={isSM ? 'column' : 'row'}
								justifyContent={isSM ? 'center' : 'flex-start'}
								alignItems={isSM ? 'flex-start' : 'center'}
							>
								<Grid item>
									<Typography variant="h6" className={classes.footerText}>
										Terms of service
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="h6" className={classes.footerText}>
										Privacy policy
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="h6" className={classes.footerText}>
										Chibiwar terms
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="h6" className={classes.footerText}>
										Challenge rules
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="h6" className={classes.footerText}>
										Cookies
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="h6" className={classes.footerText}>
										Open source
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid
						container
						columnGap={2}
						className={classes.footerBar}
						justifyContent="flex-start"
						alignItems="center"
					>
						<Typography className={classes.footerText} style={{ color: 'rgb(107, 114, 128)' }}>
							© 2024 STUDIO, INC. CHIBIWAR ALL RIGHT RESERVED
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
