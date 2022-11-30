import { checkPopupsOpen, showMobileCounter } from './mobile/functions.js';
import { bodyLock, bodyUnlock } from '../functions.js';
import { openChoseCity } from './menu/searchBar.js';

const htmlEl = document.documentElement;

document.addEventListener('click', function (e) {
	e.stopPropagation();
	const burgerIsOpen = htmlEl.classList.contains('menu-open');
	const bodyIsLocked = htmlEl.classList.contains('lock');

	const menuCity = document.querySelector('.city-menu');
	const cityChoosePopup = document.querySelector('.geo-header');

	const mobilePopupFilter = document.getElementById('popup-filter');
	const mobilePopupSort = document.getElementById('popup-mobileSort');
	const mobilePopupCounter = document.getElementById('popup-mobileCounter');
	const mobilePopupLogin = document.getElementById('popup-mobileLogin');
	const mobilePopupRegistration = document.getElementById('popup-mobileRegistration');

	const mobileEyeButtons = document.querySelectorAll('.score-yz__number svg');

	const searchBar = document.querySelector('.university-search');

	const page = document.querySelector('.page');
	const header = document.querySelector('.header');
	const burgerWrapper = document.querySelector('.burger__wrapper');

	const yzQuestion = document.querySelectorAll('.year-item-price__icon');
	const selects = document.querySelectorAll('.select__wrapper');

	const counterBtns = document.querySelectorAll('.call-yz');
	const mobileCounterPopup = document.getElementById('popup-mobileCounter');

	const like = document.querySelectorAll('.head-yz-right__like');
	const compare = document.querySelectorAll('.head-yz-right__compare');

	for (let i = 0; i < like.length; i++) {
		const use = like[i].querySelector('use');
		if (e.target === use || e.target === like[i]) {
			const like = use.getAttribute('xlink:href');
			if (like === 'img/sprite/icons.svg#svg-heart') {
				use.setAttribute('xlink:href', 'img/sprite/icons.svg#svg-read_heart');
			} else {
				use.setAttribute('xlink:href', 'img/sprite/icons.svg#svg-heart');
			}
			break;
		}
	}

	for (let i = 0; i < compare.length; i++) {
		const use = compare[i].querySelector('use');
		if (e.target === use || e.target === compare[i]) {
			const compare = use.getAttribute('xlink:href');
			if (compare === 'img/sprite/icons.svg#svg-Compare') {
				use.setAttribute('xlink:href', 'img/sprite/icons.svg#svg-Compare_checked');
			} else {
				use.setAttribute('xlink:href', 'img/sprite/icons.svg#svg-Compare');
			}
			break;
		}
	}

	selects.forEach((el) => {
		if (!e.composedPath().includes(el)) {
			el.classList.remove('active');
		}
	});

	yzQuestion.forEach((el) => {
		if (e.composedPath().includes(el)) {
			const popup = el.nextElementSibling;
			popup.classList.toggle('active');
		}
	});

	if (!e.composedPath().includes(menuCity)) {
		menuCity.classList.remove('active');
		page.classList.remove('page-opacity');
		if (bodyIsLocked && !burgerIsOpen && !checkPopupsOpen() && !searchMenuIsOpen()) {
			bodyUnlock();
		}
	}

	if (!e.composedPath().includes(searchBar)) {
		page.classList.remove('search-opacity');
		openChoseCity ? cityChoosePopup.classList.add('active') : null;
		if (bodyIsLocked && !burgerIsOpen && !checkPopupsOpen() && !searchMenuIsOpen()) {
			bodyUnlock();
		}
	}

	if (!e.composedPath().includes(mobilePopupFilter)) {
		mobilePopupFilter.classList.remove('active');
		page.classList.remove('filter-opacity');
		header.classList.remove('filter-opacity');
		if (bodyIsLocked && !burgerIsOpen && !checkPopupsOpen() && !searchMenuIsOpen()) {
			bodyUnlock();
		}
	}

	if (!e.composedPath().includes(mobilePopupRegistration)) {
		mobilePopupRegistration.classList.remove('active');
		page.classList.remove('registration-opacity');
		header.classList.remove('registration-opacity');
		burgerWrapper.classList.remove('registration-opacity');
		if (bodyIsLocked && !burgerIsOpen && !checkPopupsOpen() && !searchMenuIsOpen()) {
			bodyUnlock();
		}
	}

	if (!e.composedPath().includes(mobilePopupSort)) {
		mobilePopupSort.classList.remove('active');
		page.classList.remove('sort-opacity');
		header.classList.remove('sort-opacity');
		if (bodyIsLocked && !burgerIsOpen && !checkPopupsOpen() && !searchMenuIsOpen()) {
			bodyUnlock();
		}
	}

	if (!e.composedPath().includes(mobilePopupCounter)) {
		mobilePopupCounter.classList.remove('active');
		page.classList.remove('counter-opacity');
		header.classList.remove('counter-opacity');
		if (bodyIsLocked && !burgerIsOpen && !checkPopupsOpen() && !searchMenuIsOpen()) {
			bodyUnlock();
		}
	}

	if (!e.composedPath().includes(mobilePopupLogin)) {
		const title = mobilePopupLogin.querySelector('.head-mobilePopup__title');
		title.textContent = 'Войти';
		mobilePopupLogin.classList.remove('active');
		page.classList.remove('login-opacity');
		header.classList.remove('login-opacity');
		burgerWrapper.classList.remove('opacity');
		if (!burgerIsOpen && bodyIsLocked && !checkPopupsOpen() && !searchMenuIsOpen()) {
			bodyUnlock();
		}
	}

	for (let i = 0; i < mobileEyeButtons.length; i++) {
		if (e.composedPath().includes(mobileEyeButtons[i])) {
			const title = mobilePopupLogin.querySelector('.head-mobilePopup__title');
			title.textContent = 'Войдите, чтобы посмотреть результат';
			mobilePopupLogin.classList.add('active');
			page.classList.add('login-opacity');
			header.classList.add('login-opacity');
			bodyLock();
			break;
		}
	}

	counterBtns.forEach((el) => {
		if (e.composedPath().includes(el) && window.innerWidth <= 900) {
			showMobileCounter(mobileCounterPopup);
		}
	});
});

function searchMenuIsOpen() {
	return document.querySelector('.university-search').classList.contains('active');
}
