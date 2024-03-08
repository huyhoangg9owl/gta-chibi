import { API_URL } from './constants';
import sessionData from '../sessionData';

export const getLotteryData = async (setLotteryData: Function) => {
	if (sessionData.myAddress === null) {
		setLotteryData(null);
		return;
	}

	await fetch(API_URL + sessionData.myAddress)
		.then((res) => res.json())
		.then((json) => {
			// json = {"c":2,"m":"-","r":"10924", "r1":"24", "t": 1000}
			setLotteryData(json);
		});
};

export const claimLottery = async (setLotteryData: Function) => {
	await fetch(API_URL + sessionData.myAddress + '/c')
		.then((res) => res.json())
		.then((json) => {
			// json = {"c":2,"m":"60922,17351,78145,80297,30706","r":"10924", "r1":"24", "t": 1000}
			setLotteryData(json);
		});
};
