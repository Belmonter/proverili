import { activateDescktopSort, activateMobileSort, showMobileLogin, showRegistration } from './functions.js';
import { flsModules } from '../../modules.js';
import { bodyLock } from '../../functions.js';

const page = document.querySelector('.page');
const header = document.querySelector('.header');

const sortBtn = document.querySelector('.filter-yz');
const sortCheckbox = document.querySelectorAll('.sort-popup__btn');
const mobileSortBtn = document.querySelector('.mobile-tabs__sortBtn');
const mobilePopup = document.getElementById('popup-mobileSort');
const sortText = document.querySelector('.filter-yz__text');
const sortPopup = document.querySelector('.sort-popup');

const bottomFilterMenu = document.querySelector('.items-tabs-bottom');

const loginBtn = document.querySelector('.login-header__btn');
const loginPopup = document.querySelector('.mobileLogin-popup');

const registrationBtn = document.getElementById('register-btn');
const registrationPopup = document.getElementById('popup-mobileRegistration');

window.onresize = function (e) {
	e.stopPropagation();
	const counterBtns = document.querySelectorAll('.call-yz');

	if (e.target.innerWidth <= 900) {
		if (counterBtns) {
			counterBtns.forEach((el) => {
				el.removeAttribute('data-popup');
			});
		}
	} else {
		if (counterBtns) {
			counterBtns.forEach((el) => {
				el.setAttribute('data-popup', '#popup-count');
			});
		}
	}

	if (e.target.innerWidth <= 940) {
		bottomFilterMenu.classList.remove('active');
	}

	if (e.target.innerWidth > 940) {
		activateDescktopSort(sortBtn, sortPopup, sortCheckbox, sortText);
	} else {
		activateMobileSort(mobileSortBtn, mobilePopup, sortPopup, sortCheckbox, sortText);
	}

	if (e.target.innerWidth <= 900) {
		loginBtn.removeAttribute('data-popup');
		loginBtn.addEventListener('click', mobileLogin);

		registrationBtn.removeEventListener('click', desctopRegistration);
		registrationBtn.addEventListener('click', mobileRegistration);
	} else {
		loginBtn.setAttribute('data-popup', '#popup-login');
		loginBtn.removeEventListener('click', mobileLogin);

		registrationBtn.removeEventListener('click', mobileRegistration);
		registrationBtn.addEventListener('click', desctopRegistration);
	}
};

if (window.innerWidth <= 900) {
	const counterBtns = document.querySelectorAll('.call-yz');
	counterBtns.forEach((el) => {
		el.removeAttribute('data-popup');
	});
} else {
	const counterBtns = document.querySelectorAll('.call-yz');
	counterBtns.forEach((el) => {
		el.setAttribute('data-popup', '#popup-count');
	});
}

if (window.innerWidth <= 940) {
	bottomFilterMenu.classList.remove('active');
}

if (window.innerWidth > 940) {
	activateDescktopSort(sortBtn, sortPopup, sortCheckbox, sortText);
} else {
	activateMobileSort(mobileSortBtn, mobilePopup, sortPopup, sortCheckbox, sortText);
}

if (window.innerWidth <= 900) {
	loginBtn.removeAttribute('data-popup');
	loginBtn.addEventListener('click', mobileLogin);

	registrationBtn.removeEventListener('click', desctopRegistration);
	registrationBtn.addEventListener('click', mobileRegistration);
} else {
	loginBtn.setAttribute('data-popup', '#popup-login');
	loginBtn.removeEventListener('click', mobileLogin);

	registrationBtn.removeEventListener('click', mobileRegistration);
	registrationBtn.addEventListener('click', desctopRegistration);
}

function mobileLogin(e) {
	showMobileLogin(e, loginPopup, page, header);
}

function mobileRegistration(e) {
	showRegistration(e, registrationPopup, loginPopup, page, header);
}

function desctopRegistration() {
	flsModules.popup.open('#popup-registration');
	bodyLock();
}
