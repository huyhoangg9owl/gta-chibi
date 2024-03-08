import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';
import { loginMenu, mobileMenu } from '../../config/menu';
import { MHidden } from '../@material-extend';

import { DRAWER_WIDTH } from '../../util/constants';
import { ToolBarPlaceHolder } from '../Header/HeaderBar';
import SideMenu from './SideMenu';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: DRAWER_WIDTH,
			flexShrink: 0,
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: DRAWER_WIDTH,
	},
}));

export default function MobileSidebar({ login, mobileOpen, handleDrawerToggle }) {
	//const { window } = props;
	const classes = useStyles();

	const container = window !== undefined ? () => window.document.body : undefined;

	const drawer = (
		<div>
			<ToolBarPlaceHolder />
			<Divider />
			<SideMenu routes={mobileMenu()} />
			<Divider />
			{login && <SideMenu routes={loginMenu()} isContainMarket={true} />}
		</div>
	);

	return (
		<Fragment>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<MHidden width="smUp">
					{' '}
					{/* Ẩn cái temporary Drawer với smUp, ngay cả khi ko ẩn thì cũng bị control bởi mobile Open */}
					<Drawer
						container={container}
						variant="temporary"
						//anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						anchor="right"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</MHidden>
			</nav>
		</Fragment>
	);
}
