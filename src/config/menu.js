import {
	FiberNewOutlined,
	Inventory2Outlined,
	LogoutOutlined,
	StyleOutlined,
	ViewInArOutlined,
} from '@mui/icons-material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import RedeemIcon from '@mui/icons-material/Redeem';

import ClaimIcon from '@mui/icons-material/GetAppOutlined';
import { PATH } from './routes';

const MENU = {
	staking: {
		name: 'Staking',
		icon: AccountBalanceIcon,
		link: PATH.STAKING.path,
		child: [
			{
				name: 'Rewards',
				icon: Inventory2Outlined,
				link: PATH.CLAIM_REWARDS.path,
				disabled: true,
			},
			// {
			//     name: "Invitation",
			//     icon: PeopleOutline,
			//     link: PATH.SAPPHIRE.path,
			//     // disabled: true
			// },
			{
				name: 'Gem Bundle',
				icon: ViewInArOutlined,
				link: PATH.GEM.path,
				disabled: true,
			},
			// {
			//     name: "Cotton Box",
			//     icon: Inventory2Outlined,
			//     link: PATH.COTTON.path,
			// },
			// {
			//     name: "Ruby Box",
			//     icon: DiamondOutlined,
			//     link: PATH.WHITE_LIST.path,
			//     // disabled: true
			// },
			// {
			//     name: "Lottery",
			//     icon: StyleOutlined,
			//     link: PATH.LOTTERY.path,
			//     // disabled: true
			// },
			{
				name: 'White List Ranking',
				icon: StyleOutlined,
				link: PATH.WHITE_LIST_RANKING.path,
				disabled: true,
			},
			{
				name: 'My Box',
				icon: RedeemIcon,
				link: PATH.STAKING_ME.path,
				// disabled: sessionData.myAddress === null
			},
			{
				name: 'Dark Sword Box',
				icon: FiberNewOutlined,
				link: PATH.NEW_GENES.path,
				disabled: true,
			},
			{
				name: 'Vesting',
				icon: ClaimIcon,
				link: PATH.CLAIM_VESTING.path,
				disabled: true,
			},
			{
				name: 'Advisor',
				icon: ClaimIcon,
				link: PATH.CLAIM_ADVISOR.path,
				disabled: true,
			},
			{
				name: 'Flexible Pool',
				icon: ClaimIcon,
				link: PATH.STAKE_FELIX.path,
				disabled: false,
			},
			{
				name: '3-month term Pool',
				icon: ClaimIcon,
				link: PATH.STAKE_LOCK.path,
				disabled: false,
			},
			{
				name: '3-month term Pool 2',
				icon: ClaimIcon,
				link: PATH.STAKE_LOCK_2.path,
				disabled: false,
			},
		],
	},
	account: {
		name: 'Account',
		icon: DashboardIcon,
		link: PATH.ACCOUNT.path,
		disabled: true, //!sessionData.isLoggedIn()
	},
};

export const loginMenu = () => [
	{
		name: 'Disconnect',
		icon: LogoutOutlined,
		link: PATH.LOGOUT.path,
	},
];

export const mobileMenu = () => [...MENU.staking.child, MENU.account];

//hàm trả về menu theo page hiện tại
export const mainMenu = () => [MENU.staking, MENU.account];

//hàm trả về sidebar menu theo page hiện tại
export const sideBarMenu = () => MENU.staking.child;
