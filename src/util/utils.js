import { getWalletAddress, getWalletBalance, getWeb3 } from './cryptoWallet';
import { ERROR_TYPE_TRANSACTION, SNACK_ERROR_TYPE_TRANSACTION } from './constants';
import { LANG_TRANSACTION_COMPLETED, LANG_TRANSACTION_IS_PROCESSED } from './lang';

function regexCheck(a) {
	if (
		/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
			a
		) ||
		/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
			a.substr(0, 4)
		)
	)
		return true;
	return false;
}

export const isMobileBrowser = () => {
	return regexCheck(navigator.userAgent || navigator.vendor || window.opera);
};

function parseRPCError1(msg?) {
	if (!msg) return '';

	const start = msg.indexOf(`"message": "`, 0);
	if (start === -1) return '';
	const end = msg.indexOf(`",`, start);
	if (end === -1) return '';
	const mess = msg.substring(start + `"message": "`.length, end);
	if (mess === 'execution reverted: Over limitPerDay') {
		return 'Over Limit';
	}
	if (mess === 'execution reverted: Over limitPerDay') {
		return 'Over Limit';
	}
	return mess;
}

function parseRPCError(msg?) {
	if (!msg) return '';
	console.log(msg);
	try {
		const ret = JSON.parse(msg);
		const mess = ret.data.message;
		if (ret && ret.data && ret.data.message) {
			if (mess === 'execution reverted: Over limitPerDay') {
				return 'Over Limit';
			}
			if (mess === 'execution reverted: Over limitPerDay') {
				return 'Over Limit';
			}
			return mess;
		}
	} catch (e) {
		console.log('ERROR is not JSON');
		return parseRPCError1(msg);
	}
}

export const handleResult = async (
	contractMethod,
	enqueueSnackbar,
	onComplete: Function = null,
	onError: Function = null,
	priceValue = null,
	onTransactionHash: Function = null,
	onReceipt: Function = null,
	gasModifier = null,
	isPriceBNB = true
) => {
	let param = { from: await getWalletAddress() };
	if (priceValue && isPriceBNB) {
		const myBalance = await getWalletBalance();
		param.value = priceValue;

		let priceWei = getWeb3().utils.hexToNumberString(priceValue);
		priceWei = getWeb3().utils.fromWei(priceWei);
		console.log(myBalance);
		console.log(priceWei);

		if (parseFloat(myBalance) < parseFloat(priceWei)) {
			enqueueSnackbar(['There was an Error!', 'You do not have enough funds to buy this item', 0], {
				variant: 'error',
				persist: true,
			});
			if (onError) onError();
			return;
		}
	}

	//Tính Gas Limit trước, nếu có lỗi sẽ ko bị báo cái Phí to vật ở Metamask
	const gasLimit = await contractMethod.estimateGas(param).catch((error) => {
		console.log(error);
		enqueueSnackbar(['There was an Error!', parseRPCError(error.message), 0], { variant: 'error', persist: true });
		if (onError) onError();
	});

	if (gasLimit) {
		if (gasModifier) {
			param.gas = gasLimit * gasModifier;
			console.log('apply modifier for Breed ' + gasModifier);
		}

		const result = contractMethod.send(param);
		//console.log(result)
		if (!result) return;
		result
			.on('transactionHash', () => {
				if (onTransactionHash) {
					//tùy chọn xử lý khi có hash
					onTransactionHash();
				} else {
					enqueueSnackbar(LANG_TRANSACTION_IS_PROCESSED, { variant: 'info', autoHideDuration: 10000 });
				}
			})
			.on('receipt', (receipt) => {
				if (onReceipt) {
					onReceipt(receipt);
				} else {
					enqueueSnackbar(LANG_TRANSACTION_COMPLETED, { variant: 'success', autoHideDuration: 10000 });
				}

				if (onComplete) onComplete();
			})
			.on('error', (error, receipt) => {
				let errorTitle = '';
				let errorContent = '';
				let errorType = 0;
				if (receipt) {
					//error từ chain, lấy tx để debug
					errorTitle = 'Transaction Error!';
					errorContent = receipt.transactionHash;
					errorType = SNACK_ERROR_TYPE_TRANSACTION;
					console.log(receipt);
					enqueueSnackbar([errorTitle, errorContent, errorType], { variant: 'error', persist: true });
				} else if (error) {
					//error từ ví hoặc cái gì khác
					errorTitle = 'There was an Error!';
					errorContent = error.message;
					enqueueSnackbar(errorContent, { variant: 'error', persist: true });
					console.log(error);
				}
				if (onError) onError();
			})
			.catch((error) => {
				console.log(error);
			});
	}
};

export const handleResultOpenNewGeneBox = async (
	contractMethod,
	enqueueSnackbar,
	onComplete: Function = null,
	onError: Function = null,
	priceValue = null
) => {
	let param = { from: await getWalletAddress() };
	if (priceValue) param.value = priceValue;

	const gasLimit = await contractMethod.estimateGas(param).catch((error) => {
		enqueueSnackbar(['There was an Error!', error.message, 0], { variant: 'error', persist: true });
		if (onError) onError();
		//enqueueSnackbar(parseWeb3Error(error.message), { variant: 'error', persist: true });
	});
	if (gasLimit) {
		console.log('gasLimit ' + gasLimit);
		if (priceValue) param.gas = gasLimit;
		const result = contractMethod.send(param);
		// console.log(result)
		if (!result) return;
		result
			.on('transactionHash', () => {
				enqueueSnackbar(LANG_TRANSACTION_IS_PROCESSED, { variant: 'info', autoHideDuration: 10000 });
			})
			.on('receipt', (data) => {
				console.log('DONE');
				// console.log(data)
				enqueueSnackbar(LANG_TRANSACTION_COMPLETED, { variant: 'success', autoHideDuration: 10000 });
				console.log('data ruby: ' + data.events.OpenBox.returnValues.petId);
				if (onComplete) onComplete(data.events.OpenBox.returnValues.petId);
			})
			.on('error', (error, receipt) => {
				let errorTitle = '';
				let errorContent = '';
				let errorType = 0;
				if (receipt) {
					//error từ chain, lấy tx để debug
					errorTitle = 'Transaction Error!';
					errorContent = receipt.transactionHash;
					errorType = ERROR_TYPE_TRANSACTION;
					console.log(receipt);
					enqueueSnackbar([errorTitle, errorContent, errorType], { variant: 'error', persist: true });
				} else if (error) {
					//error từ ví hoặc cái gì khác
					errorTitle = 'There was an Error!';
					errorContent = error.message;

					enqueueSnackbar(errorContent, { variant: 'error', persist: true });
					console.log(error);
				}

				if (onError) onError();
			})
			.catch((error) => {
				const message = error.message;
				console.log(message);
			});
	}
};

export const handleResultOpenRubyBox = async (
	contractMethod,
	enqueueSnackbar,
	onComplete: Function = null,
	onError: Function = null,
	priceValue = null
) => {
	let param = { from: await getWalletAddress() };
	if (priceValue) param.value = priceValue;

	const gasLimit = await contractMethod.estimateGas(param).catch((error) => {
		enqueueSnackbar(['There was an Error!', error.message, 0], { variant: 'error', persist: true });
		if (onError) onError();
		//enqueueSnackbar(parseWeb3Error(error.message), { variant: 'error', persist: true });
	});
	if (gasLimit) {
		console.log('gasLimit ' + gasLimit);
		if (priceValue) param.gas = gasLimit;
		const result = contractMethod.send(param);
		// console.log(result)
		if (!result) return;
		result
			.on('transactionHash', () => {
				enqueueSnackbar(LANG_TRANSACTION_IS_PROCESSED, { variant: 'info', autoHideDuration: 10000 });
			})
			.on('receipt', (data) => {
				console.log('DONE');
				// console.log(data)
				enqueueSnackbar(LANG_TRANSACTION_COMPLETED, { variant: 'success', autoHideDuration: 10000 });
				console.log('data ruby: ' + data.events.OpenedBoxSpecial.returnValues.petId);
				if (onComplete) onComplete(data.events.OpenedBoxSpecial.returnValues.petId);
			})
			.on('error', (error, receipt) => {
				let errorTitle = '';
				let errorContent = '';
				let errorType = 0;
				if (receipt) {
					//error từ chain, lấy tx để debug
					errorTitle = 'Transaction Error!';
					errorContent = receipt.transactionHash;
					errorType = ERROR_TYPE_TRANSACTION;
					console.log(receipt);
					enqueueSnackbar([errorTitle, errorContent, errorType], { variant: 'error', persist: true });
				} else if (error) {
					//error từ ví hoặc cái gì khác
					errorTitle = 'There was an Error!';
					errorContent = error.message;

					enqueueSnackbar(errorContent, { variant: 'error', persist: true });
					console.log(error);
				}

				if (onError) onError();
			})
			.catch((error) => {
				const message = error.message;
				console.log(message);
			});
	}
};

export const handleResultOpenCottonBox = async (
	contractMethod,
	enqueueSnackbar: Function,
	onComplete: Function = null,
	onError: Function = null,
	priceValue = null
) => {
	let param = { from: await getWalletAddress() };
	if (priceValue) param.value = priceValue;

	const gasLimit = await contractMethod.estimateGas(param).catch((error) => {
		enqueueSnackbar(['There was an Error!', error.message, 0], { variant: 'error', persist: true });
		if (onError) onError();
		//enqueueSnackbar(parseWeb3Error(error.message), { variant: 'error', persist: true });
	});
	if (gasLimit) {
		console.log('gasLimit ' + gasLimit);
		if (priceValue) param.gas = gasLimit;
		const result = contractMethod.send(param);
		// console.log(result)
		if (!result) return;
		result
			.on('transactionHash', () => {
				enqueueSnackbar(LANG_TRANSACTION_IS_PROCESSED, { variant: 'info', autoHideDuration: 10000 });
			})
			.on('receipt', (data) => {
				console.log('DONE');
				// console.log(data)
				enqueueSnackbar(LANG_TRANSACTION_COMPLETED, { variant: 'success', autoHideDuration: 10000 });
				// console.log("data: " + data.events.OpenedBoxSpecial.returnValues.petId)
				if (onComplete) onComplete(data.events.OpenedBoxCoton.returnValues.petId);
			})
			.on('error', (error, receipt) => {
				let errorTitle = '';
				let errorContent = '';
				let errorType = 0;
				if (receipt) {
					//error từ chain, lấy tx để debug
					errorTitle = 'Transaction Error!';
					errorContent = receipt.transactionHash;
					errorType = ERROR_TYPE_TRANSACTION;
					console.log(receipt);
					enqueueSnackbar([errorTitle, errorContent, errorType], { variant: 'error', persist: true });
				} else if (error) {
					//error từ ví hoặc cái gì khác
					errorTitle = 'There was an Error!';
					errorContent = error.message;

					enqueueSnackbar(errorContent, { variant: 'error', persist: true });
					console.log(error);
				}

				if (onError) onError();
			})
			.catch((error) => {
				const message = error.message;
				console.log(message);
			});
	}
};

export const handleResultOpenSapphireBox = async (
	contractMethod,
	enqueueSnackbar: Function,
	onComplete: Function = null,
	onError: Function = null,
	priceValue = null
) => {
	let param = { from: await getWalletAddress() };
	if (priceValue) param.value = priceValue;

	const gasLimit = await contractMethod.estimateGas(param).catch((error) => {
		enqueueSnackbar(['There was an Error!', error.message, 0], { variant: 'error', persist: true });
		if (onError) onError();
		//enqueueSnackbar(parseWeb3Error(error.message), { variant: 'error', persist: true });
	});
	if (gasLimit) {
		console.log('gasLimit ' + gasLimit);
		if (priceValue) param.gas = gasLimit;
		const result = contractMethod.send(param);
		// console.log(result)
		if (!result) return;
		result
			.on('transactionHash', () => {
				enqueueSnackbar(LANG_TRANSACTION_IS_PROCESSED, { variant: 'info', autoHideDuration: 10000 });
			})
			.on('receipt', (data) => {
				console.log('DONE');
				// console.log(data)
				enqueueSnackbar(LANG_TRANSACTION_COMPLETED, { variant: 'success', autoHideDuration: 10000 });
				// console.log("data: " + data.events.OpenedBoxSpecial.returnValues.petId)
				if (onComplete) onComplete(data.events.OpenedBoxSpecial.returnValues.petId);
			})
			.on('error', (error, receipt) => {
				let errorTitle = '';
				let errorContent = '';
				let errorType = 0;
				if (receipt) {
					//error từ chain, lấy tx để debug
					errorTitle = 'Transaction Error!';
					errorContent = receipt.transactionHash;
					errorType = ERROR_TYPE_TRANSACTION;
					console.log(receipt);
					enqueueSnackbar([errorTitle, errorContent, errorType], { variant: 'error', persist: true });
				} else if (error) {
					//error từ ví hoặc cái gì khác
					errorTitle = 'There was an Error!';
					errorContent = error.message;

					enqueueSnackbar(errorContent, { variant: 'error', persist: true });
					console.log(error);
				}

				if (onError) onError();
			})
			.catch((error) => {
				const message = error.message;
				console.log(message);
			});
	}
};

export function updateURLParameter(url, param, paramVal) {
	let TheAnchor = null;
	let newAdditionalURL = '';
	let tempArray = url.split('?');
	let baseURL = tempArray[0];
	let additionalURL = tempArray[1];
	let temp = '';

	if (additionalURL) {
		let tmpAnchor = additionalURL.split('#');
		let TheParams = tmpAnchor[0];
		TheAnchor = tmpAnchor[1];
		if (TheAnchor) additionalURL = TheParams;

		tempArray = additionalURL.split('&');

		for (let i = 0; i < tempArray.length; i++) {
			if (tempArray[i].split('=')[0] !== param) {
				newAdditionalURL += temp + tempArray[i];
				temp = '&';
			}
		}
	} else {
		let tmpAnchor = baseURL.split('#');
		let TheParams = tmpAnchor[0];
		TheAnchor = tmpAnchor[1];

		if (TheParams) baseURL = TheParams;
	}

	if (TheAnchor) paramVal += '#' + TheAnchor;

	let rows_txt = temp + '' + param + '=' + paramVal;
	return baseURL + '?' + newAdditionalURL + rows_txt;
}
