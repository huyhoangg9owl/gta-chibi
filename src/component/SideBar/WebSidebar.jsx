import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import { MHidden } from '../@material-extend';
import SideMenu from './SideMenu';
const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: '16.67%',
		paddingTop: theme.spacing(2),
	},
}));

export default function WebSidebar({ routes }) {
	const classes = useStyles();

	return (
		routes && (
			<MHidden width="smDown">
				{' '}
				{/* Ẩn cái Drawer cố định ở xsDown, tức là chỉ hiện từ smUp */}
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant="permanent"
					open
				>
					<div className={classes.toolbar} />
					<SideMenu routes={routes} activeNav />
				</Drawer>
			</MHidden>
		)
	);
}
