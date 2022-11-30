import { bodyLock } from '../../functions.js';
import { getFilterValues } from '../filters/sendFilter.js';
import { ApiService } from '../apiService.js';

export function activateDescktopSort(sortBtn, sortPopup, sortCheckbox, sortText) {


	let apiService = new ApiService();

	sortBtn.addEventListener('click', function (e) {
		e.stopPropagation();
		sortBtn.classList.toggle('active');
		sortPopup.classList.toggle('active');
	});

	sortCheckbox.forEach((el) => {
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			sortText.textContent = this.querySelector('label').textContent;
			sortPopup.classList.remove('active');
			sortBtn.classList.remove('active');
			// console.log(el);
			// apiService.getYz(getFilterValues()).then((res) => {
			// 	console.log(res);
			// });
		});
	});
}

export function activateMobileSort(mobileSortBtn, mobilePopup, sortPopup, sortCheckbox, sortText) {
	const page = document.querySelector('.page');
	const header = document.querySelector('header');
	mobileSortBtn.addEventListener('click', function (e) {
		e.stopPropagation();
		mobilePopup.classList.add('active');
		page.classList.add('sort-opacity');
		header.classList.add('sort-opacity');
		bodyLock();
	});

	sortCheckbox.forEach((el) => {
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			sortText.textContent = this.querySelector('label').textContent;
			sortPopup.classList.remove('active');
			mobileSortBtn.classList.remove('active');
		});
	});
}

export function showMobileCounter(mobilePopup) {
	const page = document.querySelector('.page');
	const header = document.querySelector('header');
	mobilePopup.classList.add('active');
	page.classList.add('counter-opacity');
	header.classList.add('counter-opacity');
	bodyLock();
}

export function showMobileLogin(e, loginPopup, page, header) {
	e.stopPropagation();
	loginPopup.classList.add('active');
	page.classList.add('login-opacity');
	header.classList.add('login-opacity');
	bodyLock();
	if (document.documentElement.classList.contains('menu-open')) {
		document.querySelector('.burger__wrapper').classList.add('opacity');
	}
}

export function checkPopupsOpen() {
	const popups = document.querySelectorAll('.mobile-popup');
	let result = false;
	for (let i = 0; i < popups.length; i++) {
		result = popups[i].classList.contains('active');
		if (result) break;
	}
	return result;
}

export function showRegistration(e, registrationPopup, loginPopup, page, header) {
	e.stopPropagation();
	const burgerWrapper = document.querySelector('.burger__wrapper');
	const title = loginPopup.querySelector('.head-mobilePopup__title');
	title.textContent = 'Войти';
	loginPopup.classList.remove('active');
	page.classList.remove('login-opacity');
	header.classList.remove('login-opacity');
	burgerWrapper.classList.remove('opacity');

	registrationPopup.classList.add('active');
	page.classList.add('registration-opacity');
	header.classList.add('registration-opacity');
	burgerWrapper.classList.add('registration-opacity');
	if (document.documentElement.classList.contains('menu-open')) {
		document.querySelector('.burger__wrapper').classList.add('opacity');
	}
}
