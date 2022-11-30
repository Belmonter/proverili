import { bodyLock, bodyUnlock } from '../../functions.js';

const subMenuItems = document.querySelectorAll('[data-submenu]');
const content = document.querySelector('.page');
const mainMenuItems = document.querySelectorAll('[data-menu]');
const headerLeft = document.querySelector('.header__left');
const headerRight = document.querySelector('.header__right');
const consultationMobileBtn = document.querySelector('.search-header__consultation');
let headConsultation = false;

// DESKTOP LOGIC
if (window.innerWidth > 900) {
	document.addEventListener('mouseover', function (e) {
		const menuItems = document.querySelectorAll('.menu__item');
		menuItems.forEach((el) => {
			el.classList.remove('menu-item-active');
		});
		content.classList.remove('opacity');

		subMenuItems.forEach((menu) => {
			menu.classList.remove('sub-menu-open');
			const parentMenu = getSubMenuParentMenu(menu);
			const subMenuMenus = menu.querySelectorAll('.items-high__item');
			if (e.composedPath().includes(parentMenu) || e.composedPath().includes(menu)) {
				content.classList.add('opacity');
				menu.classList.add('sub-menu-open');
				activeSubMenu(subMenuMenus);
				parentMenu.classList.add('menu-item-active');
			}
		});
	});
	// MOBILE LOGIC
} else {
	mobileRemoveSubmenuActive();
	backToMenu();
	setClickOnSubMenu();
	mainMenuItems.forEach((menu) => {
		menu.addEventListener('click', function (e) {
			e.stopPropagation();
			const menuName = this.dataset.menu;
			const menuTitle = menu.querySelector('.menu__link').textContent;
			setMobileTitle(menuTitle, menuName);
			mobileActiveSubMenu(menuName);
			if (menuName !== 'item-consultation') {
			}
		});
	});
	consultationMobileBtn.addEventListener('click', function (e) {
		e.stopPropagation();
		setMobileTitle('Консультация', 'item-consultation');
		mobileActiveSubMenu('item-consultation');
		content.style.display = 'none';
		bodyLock();
		headConsultation = true;
	});
}

// MOBILE LOGIC

function mobileActiveSubMenu(menuName) {
	subMenuItems.forEach((menu) => {
		const submenuName = menu.dataset.submenu;
		if (menuName === submenuName) {
			menu.classList.add('sub-menu-open');
			hideMainMenu();
		}
	});
}

function mobileRemoveSubmenuActive() {
	document.querySelectorAll('.items-high__item').forEach((el) => {
		el.classList.remove('active-sub-item');
	});
}

function hideMainMenu() {
	headerLeft.style.display = 'none';
	headerRight.style.display = 'none';
}

export function showMainMenu() {
	headerLeft.style.display = 'flex';
	headerRight.style.display = 'flex';
}

function setMobileTitle(menuTitle, menuName) {
	document.querySelector(`[data-back='${menuName}'] p`).textContent = menuTitle;
}

function backToMenu() {
	const backs = document.querySelectorAll('[data-back]');
	const subBacks = document.querySelectorAll('[data-subback]');
	backs.forEach((el) => {
		const menuName = el.dataset.back;
		const submenu = document.querySelector(`[data-submenu='${menuName}']`);
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			if (headConsultation) {
				submenu.classList.remove('sub-menu-open');
				showMainMenu();
				bodyUnlock();
				content.style.display = 'block';
				headConsultation = false;
			} else {
				submenu.classList.remove('sub-menu-open');
				showMainMenu();
			}
		});
	});
	subBacks.forEach((el) => {
		el.addEventListener('click', function (e) {
			if (e.target.tagName === 'A') return;
			e.stopPropagation();
			const parentMenu = el.closest('.items-high__item');
			parentMenu.classList.remove('active-sub-item');
		});
	});
}

function setClickOnSubMenu() {
	const submenus = document.querySelectorAll('.items-high__item');
	submenus.forEach((el) => {
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			el.classList.add('active-sub-item');
			const menuItem = el.querySelector('p').textContent;
			const menuTitle = el.querySelector('[data-subback] p');
			menuTitle.textContent = menuItem;
		});
	});
}

// DESKTOP LOGIC

function getSubMenuParentMenu(subMenu) {
	const subMenuName = subMenu.dataset.submenu;
	return document.querySelector(`[data-menu=${subMenuName}]`);
}

function activeSubMenu(menuItems) {
	menuItems.forEach((item) => {
		item.addEventListener('mouseover', function () {
			clearActiveMenuItems(menuItems);
			item.classList.add('active-sub-item');
		});
	});
}

function clearActiveMenuItems(menuItems) {
	menuItems.forEach((item) => {
		item.classList.remove('active-sub-item');
	});
}
