import { PATH } from './config/routes';

class SessionData {
	constructor() {
		this.userId = null;
		this.jwToken = null;
		this.myAddress = null;
		this.exchangeRate = 0;
		this.provider = null;
		this.emailActivated = 0;
	}

	setSessionData(userId, jwToken, myAddress, provider) {
		setCookie('token', jwToken);
		setCookie('userid', userId);
		setCookie('myaddress', myAddress);

		localStorage.setItem('provider', provider);
	}

	isLoggedIn() {
		return this.myAddress;
	}

	checkLogIn() {
		if (!this.isLoggedIn()) {
			console.log('Can login lai');
			window.location = PATH.HOME.path;
		}
	}

	updateAddress(address) {
		this.myAddress = address;
		setCookie('myaddress', address);
	}

	updateProvider(provider) {
		this.provider = provider;
		localStorage.setItem('provider', provider);
	}

	getSessionData() {
		this.jwToken = getCookie('token');
		this.userId = getCookie('userid');
		this.myAddress = getCookie('myaddress');
		this.provider = localStorage.getItem('provider');
	}

	logOut() {
		this.userId = null;
		this.jwToken = null;
		this.myAddress = null;
		this.provider = null;

		delete_cookie('token', '/');
		delete_cookie('userid', '/');
		delete_cookie('myaddress', '/');
		localStorage.removeItem('provider');

		window.location = PATH.HOME.path;
	}
}

const sessionData = new SessionData();

export default sessionData;

function delete_cookie(name, path = '', domain = '') {
	document.cookie =
		name +
		'=' +
		(path ? ';path=' + path : '') +
		(domain ? ';domain=' + domain : '') +
		';expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

function setCookie(name = '', value = '', days = 7) {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function getCookie(name) {
	const nameEQ = name + '=';
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
