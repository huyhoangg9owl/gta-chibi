import { useTheme } from '@emotion/react';
import { Grid, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';
import PetItem from './PetItem';

const useStyles = makeStyles((theme) => ({
	grid: {
		padding: theme.spacing(2),
		display: 'flex',
		//alignItems: 'stretch',
		justifyContent: 'center',
		// width:'100%',
		// height:'90%',
		// overflow:'hidden',
		// backgroundColor
		// [theme.breakpoints.down('md')]: {
		//     paddingTop: '0px'
		// },
		// [theme.breakpoints.down('sm')]: {
		//     padding: '10px 15px 0px 0px'
		// },
	},
	page: {
		display: 'flex',
		marginTop: theme.spacing(4),
	},
}));

function GridPetItem({ nft }) {
	return (
		<Grid item xs={6} lg={4} xl={3} style={{ width: '230px' }}>
			<PetItem nft={nft} />
		</Grid>
	);
}

export default function GridPet() {
	const classes = useStyles();

	const nfts = [
		{
			id: 1,
			name: 'Plan Chibi #1',
			address: '0x4638...7dh26s',
			avatarURL: '/images/nfts/nft_1.png',
			price: '15000',
		},
		{
			id: 2,
			name: 'Electro Chibi #2',
			address: '0x4638...7hd5a2',
			avatarURL: '/images/nfts/nft_2.png',
			price: '18000',
		},
		{
			id: 3,
			name: 'Flame Chibi #3',
			address: '0x4638...45sd2f',
			avatarURL: '/images/nfts/nft_3.png',
			price: '15000',
		},
		{
			id: 4,
			name: 'Magneto Chibi #4',
			address: '0x4638...76sh23',
			avatarURL: '/images/nfts/nft_4.png',
			price: '18000',
		},
		{
			id: 5,
			name: 'Darkness Chibi #5',
			address: '0x4638...23c5d2',
			avatarURL: '/images/nfts/nft_5.png',
			price: '18000',
		},
		{
			id: 6,
			name: 'Gentle Chibi #6',
			address: '0x4638...23df67',
			avatarURL: '/images/nfts/nft_6.png',
			price: '18000',
		},
		{
			id: 7,
			name: 'Mordern Chibi #7',
			address: '0x4638...2df54h',
			avatarURL: '/images/nfts/nft_7.png',
			price: '18000',
		},
		{
			id: 8,
			name: 'Goku Chibi #8',
			address: '0x4638...2f35d2',
			avatarURL: '/images/nfts/nft_8.png',
			price: '15000',
		},
		{
			id: 9,
			name: 'Bearbear Chibi #9',
			address: '0x4638...2h3gx6',
			avatarURL: '/images/nfts/nft_9.png',
			price: '16500',
		},
		{
			id: 10,
			name: 'Frozen Chibi #10',
			address: '0x4638...5x8ses',
			avatarURL: '/images/nfts/nft_10.png',
			price: '16500',
		},
		{
			id: 11,
			name: 'Fishman Chibi #11',
			address: '0x4638...7d8x63',
			avatarURL: '/images/nfts/nft_11.png',
			price: '15000',
		},
		{
			id: 12,
			name: 'GenZ Chibi #12',
			address: '0x4638...87d89a',
			avatarURL: '/images/nfts/nft_12.png',
			price: '15000',
		},
		{
			id: 13,
			name: 'Dump Chibi #13',
			address: '0x4638...s29fh2',
			avatarURL: '/images/nfts/nft_13.png',
			price: '15000',
		},
		{
			id: 14,
			name: 'Freddy Chibi #14',
			address: '0x4638...2k9s7h',
			avatarURL: '/images/nfts/nft_14.png',
			price: '16500',
		},
		{
			id: 15,
			name: 'Krueger Chibi #15',
			address: '0x4638...s9h26s',
			avatarURL: '/images/nfts/nft_15.png',
			price: '16500',
		},
		{
			id: 16,
			name: 'Fallin Chibi #16',
			address: '0x4638...x09k32',
			avatarURL: '/images/nfts/nft_16.png',
			price: '16500',
		},
	];

	const theme = useTheme();
	const isXL = useMediaQuery(theme.breakpoints.only('xl'));
	const isLG = useMediaQuery(theme.breakpoints.only('lg'));
	const isSM = useMediaQuery(theme.breakpoints.only('sm'));
	const isXS = useMediaQuery(theme.breakpoints.only('xs'));

	const getNfts = () => {
		if (isXL) {
			return nfts.slice(0, 16);
		}
		if (isLG) {
			return nfts.slice(0, 12);
		}
		if (isXS || isSM) {
			return nfts.slice(0, 16);
		}
		return nfts.slice(0, 8);
	};

	return (
		<Fragment>
			<Grid
				container
				className={classes.grid}
				justifyContent="center"
				alignItems="center"
				spacing={{ xs: 2, sm: 3, xl: 3 }}
			>
				{getNfts() && getNfts().map((nft, key) => <GridPetItem nft={nft} key={key} />)}
			</Grid>
		</Fragment>
	);
}
