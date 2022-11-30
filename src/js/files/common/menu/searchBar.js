import { ApiService } from '../apiService.js';
import debounce from 'lodash.debounce';
import { bodyLock, bodyUnlock, menuOpen } from '../../functions.js';

const searchIcon = document.querySelector('.search-header__search');
const searchBar = document.querySelector('.university-search');
const searchBarCloseBtn = document.querySelector('.university-search__close');
const searchBarBack = document.querySelector('.university-search-icon__arrow');
const searchInput = document.querySelector('.university-search__input input');
const searchInputClose = document.querySelector('.university-search-icon__close');
const searchContent = document.querySelector('.university-search__content');
const searchWrapper = document.querySelector('.university-search__wrapper');
const page = document.querySelector('.page');
const headerRightMenu = document.querySelector('.right-header');
const apiService = new ApiService();
const debouncedCheckInputValue = debounce(checkInputValue, 500);

const cityChoosePopup = document.querySelector('.geo-header');

let openMenu = false;
export let openChoseCity = false;

searchIcon.addEventListener('click', openSearchBar);

searchBarCloseBtn.addEventListener('click', closeSearchBar);

searchBarBack.addEventListener('click', closeSearchBar);

searchInputClose.addEventListener('click', function (e) {
	e.stopPropagation();
	searchInput.value = '';
	searchWrapper.classList.remove('active');
	removeInputDelButton();
	clearSearchResults();
});

searchInput.addEventListener('input', ({ target }) => {
	if (target.value) {
		addInputDelButton();
		if (target.value.length >= 3) {
			searchWrapper.classList.add('active');
		} else {
			searchWrapper.classList.remove('active');
		}
	} else {
		removeInputDelButton();
	}
});

searchInput.addEventListener('input', debouncedCheckInputValue);

function hideOnWindowClick(e) {
	e.stopPropagation();
	if (e.target !== searchIcon && !e.composedPath().includes(searchBar)) closeSearchBar(e);
}

function checkInputValue({ target }) {
	const value = target.value;
	searchContent.innerHTML = '<div class="preloader"><img src="img/icons/Preloader.svg" alt="loader icon"></div>';
	value.length >= 3 ? getSearchData(value) : clearSearchResults();
}

function clearSearchResults() {
	searchContent.innerHTML = '';
}

function getSearchData(value) {
	apiService.getSearchItems(value).then((res) => {
		clearSearchResults();
		if (res.length) {
			res.forEach(({ title, icon, items }) => searchContent.append(createSearchItem(title, icon, items, value)));
		} else {
			clearSearchResults();
			searchContent.insertAdjacentHTML(
				'beforeend',
				'<div class="university-search__empty"><p>К сожалению, ничего не найдено :(</p><p>Попробуйте скорректировать запрос</p></div>'
			);
		}
	});
}

function createSearchItem(title, icon, items, searchString) {
	const fragment = document.createDocumentFragment();

	const item = document.createElement('div');
	item.setAttribute('class', 'university-search__item item-university-search');

	const itemHead = document.createElement('div');
	itemHead.setAttribute('class', 'item-university-search__head');

	const itemIconWrapper = document.createElement('div');
	itemIconWrapper.setAttribute('class', 'item-university-search__icon -ibg_contain');

	const itemImg = document.createElement('img');
	itemImg.setAttribute('src', icon);

	const itemTitle = document.createElement('div');
	itemTitle.setAttribute('class', 'item-university-search__title');
	itemTitle.textContent = title;

	const itemList = document.createElement('div');
	itemList.setAttribute('class', 'item-university-search__list');

	const listItems = document.createDocumentFragment();
	items.forEach(({ name, url }) => {
		const formattedName = highlightSearchString(name, searchString);
		const itemWrapper = document.createElement('div');
		itemWrapper.setAttribute('class', 'item-university-search__item');
		const itemLink = document.createElement('a');
		itemLink.setAttribute('href', url);
		itemLink.setAttribute('target', '_blank');
		itemLink.innerHTML = formattedName;
		listItems.append(itemLink);
	});

	itemList.append(listItems);
	itemIconWrapper.append(itemImg);
	itemHead.append(itemIconWrapper);
	itemHead.append(itemTitle);
	item.append(itemHead);
	item.append(itemList);
	fragment.append(item);

	return fragment;
}

function openSearchBar(e) {
	e.stopPropagation();
	const isCityChooseOpen = document.querySelector('.geo-header').classList.contains('active');
	const menuIsOpen = document.documentElement.classList.contains('menu-open');
	page.classList.add('search-opacity');
	document.addEventListener('click', hideOnWindowClick);
	if (window.innerWidth > 900) {
		searchBar.classList.add('active');
		searchInput.focus();
		bodyLock();
	}
	if (window.innerWidth <= 900 && menuIsOpen) {
		if (isCityChooseOpen) cityChoosePopup.classList.remove('active');
		document.documentElement.classList.remove('menu-open');
		openMenu = true;
		openChoseCity = true;
		page.style.display = 'none';
		headerRightMenu.style.display = 'none';
		searchBar.classList.add('active');
		searchInput.focus();
	}
	if (window.innerWidth <= 900 && !menuIsOpen) {
		if (isCityChooseOpen) {
			cityChoosePopup.classList.remove('active');
			openChoseCity = true;
		}
		page.style.display = 'none';
		headerRightMenu.style.display = 'none';
		searchBar.classList.add('active');
		searchInput.focus();
		bodyLock();
	}
}

function closeSearchBar(e) {
	e.stopPropagation();
	document.removeEventListener('click', hideOnWindowClick);
	searchBar.classList.remove('active');
	if (window.innerWidth <= 900 && document.querySelector('html').classList.contains('menu-open')) {
		headerRightMenu.style.display = 'flex';
		openChoseCity ? cityChoosePopup.classList.add('active') : null;
	}
	openMenu ? menuOpen() : bodyUnlock();
	openChoseCity ? cityChoosePopup.classList.add('active') : null;
	headerRightMenu.style.display = 'flex';
	page.style.display = 'block';
	page.classList.remove('search-opacity');
	openMenu = false;
}

function addInputDelButton() {
	searchInputClose.classList.add('active');
}

function removeInputDelButton() {
	searchInputClose.classList.remove('active');
}

function highlightSearchString(str, searchString) {
	let word = str.toLowerCase().replace(searchString, `<span>${searchString}</span>`);

	const firstLetterInd = word.indexOf(str.toLowerCase()[0]);
	word = word.replace(word[firstLetterInd], str[0]);

	return word;
}
