const MySvg1 = '/images/svg/h1.svg';
const MySvg2 = '/images/svg/h2.svg';
const MySvg3 = '/images/svg/h3.svg';
const MySvg4 = '/images/svg/h4.svg';
const MySvg5 = '/images/svg/h5.svg';
const MySvg6 = '/images/svg/h6.svg';

const MySvgClass1 = '/images/svg/n1.svg';
const MySvgClass2 = '/images/svg/n2.svg';
const MySvgClass3 = '/images/svg/n3.svg';
const MySvgClass4 = '/images/svg/n4.svg';
const MySvgClass5 = '/images/svg/n5.svg';

export const DRAWER_WIDTH = 280;

export function LightningIcon({ width = 25, height = 25, className = '' }) {
	//return <img src="/imagess/pet/bolt.png"} width={width} height={height} className={className}/>
	return <img src={MySvg5} width={width} height={height} className={className} />;
}

export function EarthIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvg3} width={width} height={height} className={className} />;
}

export function FireIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvg1} width={width} height={height} className={className} />;
}

export function WindIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvg2} width={width} height={height} className={className} />;
}

export function WaterIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvg4} width={width} height={height} className={className} />;
}

export function YinYangIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvg6} width={width} height={height} className={className} />;
}

export function CaptainIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvgClass4} width={width} height={height} className={className} />;
}

export function GuardIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvgClass1} width={width} height={height} className={className} />;
}

export function SupportIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvgClass5} width={width} height={height} className={className} />;
}

export function ScoutIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvgClass2} width={width} height={height} className={className} />;
}

export function AssassinIcon({ width = 25, height = 25, className = '' }) {
	return <img src={MySvgClass3} width={width} height={height} className={className} />;
}

export const PETS_PER_PAGE = 8;
export const ERROR_TYPE_TRANSACTION = 1;
export const PET_AVATAR_SIZE = 215;

////---------------------------Snack
export const SNACK_ERROR_TYPE_TRANSACTION = 1;
export const SNACK_INFO = 2;

//-------------------------------------------------------------------------

export const TEST_NET = false;

export const METAMASK_PROVIDER = 'METAMASK';
export const WALLETCONNECT_PROVIDER = 'WALLETCONNECT';

export const NETWORK_VERSION = TEST_NET ? 97 : 56;
export const NETWORK_VERSION_HEX = TEST_NET ? '0x61' : '0x38';
export const NETWORK_RPC_URL = TEST_NET
	? 'https://endpoints.omniatech.io/v1/bsc/testnet/public'
	: 'https://bsc-dataseed1.binance.org/';

export const API_URL = 'https://game-t.ninneko.com/xs/';

export const AD_REF_API_URL = TEST_NET
	? 'https://api-test.ninneko.com/rest/user/refer'
	: 'https://api.ninneko.com/rest/user/refer';

export const TOKEN_ADDRESS = TEST_NET
	? '0x35c18164e4C24D44960012782cD70e17E46ADe2B'
	: '0x89129Fad064deE5306F2d9e93cf816eD5a53C050';

export const NETWORK_CONFIG = TEST_NET
	? [
			{
				chainId: NETWORK_VERSION_HEX,
				chainName: 'Binance Smart Chain Testnet',
				nativeCurrency: {
					name: 'BNB',
					symbol: 'tBNB',
					decimals: 18,
				},
				rpcUrls: ['https://endpoints.omniatech.io/v1/bsc/testnet/public'],
				blockExplorerUrls: ['https://testnet.bscscan.com/'],
			},
	  ]
	: [
			{
				chainId: NETWORK_VERSION_HEX,
				chainName: 'BNB Smart Chain',
				nativeCurrency: {
					name: 'BNB',
					symbol: 'BNB',
					decimals: 18,
				},
				rpcUrls: ['https://bsc-dataseed.binance.org/'],
				blockExplorerUrls: ['https://bscscan.com/'],
			},
	  ];
