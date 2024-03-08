import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import HeaderBar from '../component/Header/HeaderBar';

export const TwoRowLayout = ({ openDrawerMenu, setOpenDrawerMenu }) => {
	return (
		<Grid container style={{ position: 'relative', width: '100%', height: '100%' }}>
			<HeaderBar openDrawerMenu={openDrawerMenu} setOpenDrawerMenu={setOpenDrawerMenu} />
			<Grid item xs={12} style={{ width: '100%', height: '100%' }}>
				<Outlet />
			</Grid>
		</Grid>
	);
};
