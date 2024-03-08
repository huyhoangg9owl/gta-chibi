import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { MHidden } from '../../component/@material-extend';
import { BuyGemBoxDialog } from '../../component/Misc/BuyGemBoxDialog';
import { approveBuyGemNft, checkAllowanceBuyGem } from '../../service/gem';

export const GEM_NAME = {
	1: 'Ruby',
	2: 'Sapphire',
	3: 'Emeralda ',
	4: 'Amethyst',
	5: 'Amber',
	6: 'Citrine',
	7: 'Berserker',
	8: 'Mage Hunter',
	9: 'Image of Sin',
	10: 'Living Fortress',
	11: 'Armor piercing ',
	12: 'Mighty Sorcerer',
	13: 'Eyes Blessing',
	14: 'Stun immunity',
	15: 'Burning Rage',
};

export const GEM_EFFECT = {
	1: '15% ATK',
	2: '15% DEF',
	3: '15% HP',
	4: '30% Accuracy',
	5: '30% Control Immune',
	6: '30% Block',
	7: '50% Damage to Assasin',
	8: '50% Damage to Mage',
	9: '50% Damage to Support',
	10: '50% Damage to Ranger',
	11: '50% Damage to Warrior',
	12: '100% Silence Immune',
	13: '100% Petrify Immune',
	14: '100% Stun Immune',
	15: '100% Freeze Immune	',
};

export const GEM_QUALITY = {
	4: 'Epic',
	5: 'Mythic',
};

const useStyles = makeStyles((theme) => ({
	grid: {
		padding: theme.spacing(2),
		display: 'flex',
		//alignItems: 'stretch',
		justifyContent: 'center',
	},
	centerGrid: {
		display: 'flex',
		//alignItems: 'stretch',
		justifyContent: 'center',
	},
	bannerImg: {
		display: 'flex',
		borderRadius: '10px',
		backgroundImage: 'url("/images/gem.jpg")',
		height: 800,
		//background: "linear-gradient(268.58deg,#0c2a54 .69%,#1a3175)",
		//border: "1px solid #000",
		//boxSizing: "border-box",
		//boxShadow: "0 4px 4px rgba(0,0,0,.25)",
		padding: '35px 26px 28px',
		margin: '24px 0 43px',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		color: 'white',
	},
}));

function GemItem({ id, approved, buyBox, approveBuyGemBox, onError, loading }) {
	const [openBuyBox, setOpenBuyBox] = useState(false);

	const classes = useStyles();
	return (
		<Card style={{ width: 220, margin: 8, padding: 16 }}>
			<Grid item xs={12}>
				<Typography color="textPrimary" style={{ paddingBottom: 6 }}>
					{GEM_NAME[id]}
				</Typography>
				<Divider />

				<div className={classes.centerGrid}>
					<img src={'/images/gems/5/' + id + '.png'} width={100} height={100} style={{ margin: 16 }} />
				</div>

				<div className={classes.centerGrid}>
					<Typography color="textPrimary" variant="body2">
						Set effect (4 items):
					</Typography>
				</div>

				<div className={classes.centerGrid}>
					<Typography color="textPrimary" variant="body2">
						<strong>{GEM_EFFECT[id]}</strong>
					</Typography>
				</div>

				<div className={classes.centerGrid}>
					<Button onClick={() => setOpenBuyBox(true)} variant="contained">
						Buy now
					</Button>
				</div>
			</Grid>

			<BuyGemBoxDialog
				loading={loading}
				buyBox={buyBox}
				approveBuyGemBox={approveBuyGemBox}
				onError={onError}
				open={openBuyBox}
				onClose={() => setOpenBuyBox(false)}
				id={id}
				approved={approved}
			/>
		</Card>
	);
}

export function GemBox() {
	const classes = useStyles();

	const [approved, setApproved] = useState(false);
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const getInfo = () => {
		checkAllowanceBuyGem(setApproved);
	};

	//console.log("sao goi nhieu vay "+approved)
	//getInfo ()

	const approveBuyGemBox = () => {
		setLoading(true);
		approveBuyGemNft(
			enqueueSnackbar,
			() => {
				getInfo();
				setLoading(false);
				enqueueSnackbar('Now you can buy Gem', { variant: 'success', autoHideDuration: 10000 });
			},
			onError
		);
	};

	const onError = () => {
		console.log('clean loading');
		setLoading(false);
	};

	useEffect(() => {
		setTimeout(() => {
			getInfo();
		}, 500);
		setTimeout(() => {
			getInfo();
		}, 2000);
	}, []);

	return (
		<Grid container style={{ maxWidth: '800px' }}>
			<MHidden width="mdDown">
				<Grid item xs={12}>
					<Card className={classes.bannerImg}></Card>
				</Grid>
			</MHidden>
			<Grid item xs={12}>
				<Grid container className={classes.grid} spacing={2}>
					{Object.keys(GEM_NAME).map((index) => (
						<GemItem
							id={index}
							key={index}
							approveBuyGemBox={approveBuyGemBox}
							onError={onError}
							loading={loading}
							approved={approved}
						/>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}
