import { ListItem, ListItemIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Balance({ balanceIcon, balanceFunction, balanceTicker }) {
	const [balance, updateBalance] = useState('');

	useEffect(
		() =>
			balanceFunction()?.then((balanceData) => {
				const balanceStr = parseFloat(parseFloat(balanceData).toFixed(2));
				updateBalance(balanceStr + ' ' + balanceTicker);
				console.log('balance BNB ' + balanceStr);
			}),
		[]
	);

	return (
		<ListItem style={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
			<ListItemIcon style={{ minWidth: 0, marginRight: 8 }}>{balanceIcon}</ListItemIcon>
			<Typography>{balance}</Typography>
		</ListItem>
	);
}
