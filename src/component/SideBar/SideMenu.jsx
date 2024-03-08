import { Storefront } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	icon: {
		color: 'inherit',
	},
	nav: {
		//fontWeight: 900,
		//color: theme.palette.text.secondary,
		color: 'inherit',
		textDecoration: 'none',
	},
	//so anh current route cua react router cung duoc
	activeNav: {
		color: theme.palette.primary.main,
		//backgroundColor: theme.palette.primary.light,
	},
}));

export default function SideMenu({ routes, isContainMarket = false }) {
	const classes = useStyles();
	return (
		<List>
			{routes &&
				routes.map((prop, key) => {
					if (!prop || prop.disabled) return null;
					if (prop.redirect /* || key === 0 */) return null;
					return (
						<NavLink to={prop.link} className={classes.nav} key={key}>
							<ListItem button style={{ color: 'inherit' }}>
								<ListItemIcon style={{ color: 'inherit' }}>
									<prop.icon className={classes.icon} />
								</ListItemIcon>
								<ListItemText primary={prop.name} />
							</ListItem>
						</NavLink>
					);
				})}
			{!isContainMarket && (
				<>
					<a href="https://market.ninneko.com" style={{ textDecoration: 'none' }} target="_blank">
						<ListItem button style={{ color: '#212B36' }}>
							<ListItemIcon style={{ color: '#212B36' }}>
								<Storefront className={classes.icon} />
							</ListItemIcon>
							<ListItemText primary={'Marketplace'} />
						</ListItem>
					</a>
				</>
			)}
		</List>
	);
}
