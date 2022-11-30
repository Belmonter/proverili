import { bodyLock, bodyUnlock } from '../../functions.js';

const htmlEl = document.documentElement;

const popupBtn = document.querySelector('.filterBtn-mobile');
const popupsMobile = document.querySelectorAll('.mobile-popup');
const popupsClose = document.querySelectorAll('.head-mobilePopup__close');
const page = document.querySelector('.page');
const header = document.querySelector('.header');
const burgerWrapper = document.querySelector('.burger__wrapper');

const filterPopup = document.querySelector('.filter-popup');

popupBtn.addEventListener('click', function (e) {
	e.stopPropagation();
	filterPopup.classList.add('active');
	page.classList.add('filter-opacity');
	header.classList.add('filter-opacity');
	bodyLock();
});

popupsClose.forEach((el) => {
	el.addEventListener('click', function (e) {
		e.stopPropagation();
		popupsMobile.forEach((el) => {
			el.classList.remove('active');
		});
		page.classList.remove('filter-opacity');
		page.classList.remove('sort-opacity');
		page.classList.remove('counter-opacity');
		page.classList.remove('login-opacity');
		page.classList.remove('registration-opacity');
		header.classList.remove('filter-opacity');
		header.classList.remove('sort-opacity');
		header.classList.remove('counter-opacity');
		header.classList.remove('login-opacity');
		header.classList.remove('registration-opacity');
		burgerWrapper.classList.remove('opacity');
		burgerWrapper.classList.remove('registration-opacity');
		if (!htmlEl.classList.contains('menu-open')) {
			bodyUnlock();
		}
	});
});
