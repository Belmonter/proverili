import { ApiService } from '../apiService.js';
import Cookies from 'js-cookie';
import { bodyLock, bodyLockToggle } from '../../functions.js';

const apiService = new ApiService();
let cityData = [];
const bigCities = [];
const priorityCities = [];
let yandexData;
let chosenCity;
const mainMenuCity = document.querySelector('.city-header');
const burgerMainMenuCity = document.querySelector('.burger__city');
const menuCity = document.querySelector('.city-menu');
const menuCityWrapper = document.querySelector('.city-menu__wrapper');
const searchInput = document.querySelector('.city-menu__search input');
const clearInputBtn = document.querySelector('.city-menu__icon-clear');
const searchResult = document.querySelector('.city-menu__search-wrapper');
const cityPopupName = document.querySelector('.city-geo__name');
const cityMenuName = document.querySelector('.city-header__city');
const cityPopup = document.querySelector('.geo-header');
const mobileCityPopup = document.querySelector('.mobileChoseCity-popup');
const acceptCityBtn = document.querySelector('.btns-geo__true');
const deniedCityBtn = document.querySelector('.btns-geo__false');
const arrowBack = document.querySelector('.city-menu__arrow');
const page = document.querySelector('.page');

ymaps.ready(showCityPopup);

function showCityPopup() {
	if (!Cookies.get('city-id') || !Cookies.get('city-name')) {
		ymaps.geolocation.get().then((res) => {
			let coordinates = res.geoObjects.position;
			coordinates = coordinates.reverse().join(',');
			apiService.getLocation(coordinates).then((res) => {
				chosenCity = res.response.GeoObjectCollection.featureMember[0].GeoObject.name;
				apiService.checkCity(res).then((res) => {
					if (res.length) {
						cityPopupName.textContent = chosenCity;
						cityPopupName.setAttribute('data-id', res[0].id);
						if (window.innerWidth <= 768) {
							mobileCityPopup.classList.add('active');
						} else {
							cityPopup.classList.add('active');
						}
						yandexData = res;
					}
				});
			});
		});
	} else {
		cityMenuName.textContent = Cookies.get('city-name');
	}
}

acceptCityBtn.addEventListener('click', (e) => setCityInfo(e, chosenCity, cityPopupName.dataset.id));

deniedCityBtn.addEventListener('click', (e) => openCityMenu(e, true));

mainMenuCity.addEventListener('click', openCityMenu);

burgerMainMenuCity.addEventListener('click', function (e) {
	e.stopPropagation();
	cityPopup.classList.remove('active');
	menuCity.classList.add('active');
	if (!cityData.length) {
		addLoader();
		apiService.getCities().then((res) => {
			cityData = res;
			removeLoader();
			renderPreview().then((fragment) => menuCityWrapper.append(fragment));
		});
	}
});

clearInputBtn.addEventListener('click', clearInput);

searchInput.addEventListener('input', function ({ target }) {
	const value = target.value;
	if (value) {
		clearInputBtn.classList.add('active');
		const fragment = document.createDocumentFragment();
		openCityBar();
		showSearchResults();
		renderSearchResults(value, fragment);
	} else {
		clearInputBtn.classList.remove('active');
		hideCityBar();
		hideSearchResults();
	}
});

arrowBack.addEventListener('click', function (e) {
	e.stopPropagation();
	menuCity.classList.remove('active');
});

async function renderPreview() {
	await sortData();

	const fragment = document.createDocumentFragment();
	const column_1 = document.createElement('div');
	const column_2 = document.createElement('div');
	const column_3 = document.createElement('div');
	const mainCity_1 = document.createElement('div');
	const mainCity_2 = document.createElement('div');
	const mainCity_3 = document.createElement('div');
	const priority_1 = document.createElement('div');
	const priority_2 = document.createElement('div');
	const priority_3 = document.createElement('div');

	column_1.setAttribute('class', 'city-menu__column');
	column_2.setAttribute('class', 'city-menu__column');
	column_3.setAttribute('class', 'city-menu__column');

	mainCity_1.setAttribute('class', 'city-menu__main');
	bigCities[0] ? (mainCity_1.textContent = bigCities[0].name) : null;
	mainCity_2.setAttribute('class', 'city-menu__main');
	bigCities[1] ? (mainCity_2.textContent = bigCities[1].name) : null;
	mainCity_3.setAttribute('class', 'city-menu__main');
	bigCities[2] ? (mainCity_3.textContent = bigCities[2].name) : null;

	bigCities[0] ? mainCity_1.addEventListener('click', (e) => setCityInfo(e, bigCities[0].name), bigCities[0].id) : null;
	bigCities[1] ? mainCity_2.addEventListener('click', (e) => setCityInfo(e, bigCities[1].name), bigCities[1].id) : null;
	bigCities[2] ? mainCity_3.addEventListener('click', (e) => setCityInfo(e, bigCities[2].name), bigCities[2].id) : null;

	priority_1.setAttribute('class', 'city-menu__priority');
	priority_2.setAttribute('class', 'city-menu__priority');
	priority_3.setAttribute('class', 'city-menu__priority');

	priorityCities.forEach(({ name, url }, i) => {
		if (window.innerWidth > 500) {
			if (i <= 6) {
				const city = document.createElement('p');
				city.textContent = name;
				priority_1.append(city);
				city.addEventListener('click', (e) => setCityInfo(e, name, url));
			}
			if (i > 6 && i <= 13) {
				const city = document.createElement('p');
				city.textContent = name;
				priority_2.append(city);
				city.addEventListener('click', (e) => setCityInfo(e, name, url));
			}
			if (i > 13 && i <= 20) {
				const city = document.createElement('p');
				city.textContent = name;
				priority_3.append(city);
				city.addEventListener('click', (e) => setCityInfo(e, name, url));
			}
		} else {
			if (i <= 10) {
				const city = document.createElement('p');
				city.textContent = name;
				priority_1.append(city);
				city.addEventListener('click', (e) => setCityInfo(e, name, url));
			}
			if (i > 10) {
				const city = document.createElement('p');
				city.textContent = name;
				priority_2.append(city);
				city.addEventListener('click', (e) => setCityInfo(e, name, url));
			}
		}
	});

	column_1.append(mainCity_1);
	column_2.append(mainCity_2);
	column_3.append(mainCity_3);

	column_1.append(priority_1);
	column_2.append(priority_2);
	column_3.append(priority_3);

	if (window.innerWidth > 500) {
		fragment.append(column_1);
		fragment.append(column_2);
		fragment.append(column_3);
	} else {
		fragment.append(column_1);
		fragment.append(column_2);
	}

	return fragment;
}

function renderSearchResults(searchString, fragment) {
	cityData.forEach(({ id, name, url }) => {
		if (name.toLowerCase().match(searchString.toLowerCase())) {
			fragment.append(createSearchUrl(id, name, url, searchString));
		}
	});
	if (fragment.childElementCount) {
		searchResult.append(fragment);
	} else {
		searchResult.innerHTML =
			'<div class="city-menu__search-empty"><p>К сожалению, ничего не найдено :(</p><p>Попробуйте скорректировать запрос</p></div>';
	}
}

function createSearchUrl(id, name, url, searchString) {
	clearSearchResults();
	const searchLink = document.createElement('p');
	searchLink.setAttribute('class', 'city-menu__search-item');
	searchLink.addEventListener('click', (e) => setCityInfo(e, name, id));

	searchLink.innerHTML = highlightSearchString(name, searchString);

	return searchLink;
}

function sortData() {
	for (let i = 0; i < cityData.length; i++) {
		if (cityData[i].big === 1) {
			bigCities.push({ name: cityData[i].name, url: cityData[i].url, id: cityData[i].id });
			continue;
		}
		if (cityData[i].priority === 1) {
			priorityCities.push({ name: cityData[i].name, url: cityData[i].url, id: cityData[i].id });
		}
	}
}

function addLoader() {
	searchInput.setAttribute('disabled', '');
	menuCityWrapper.innerHTML = '<div class="preloader absolute"><img src="img/icons/Preloader.svg" alt="loader icon"></div>';
}

function removeLoader() {
	searchInput.removeAttribute('disabled');
	document.querySelector('.preloader').style.display = 'none';
}

function clearInput(e) {
	e.stopPropagation();
	searchInput.value = '';
	clearInputBtn.classList.remove('active');
	hideSearchResults();
}

function openCityBar() {
	clearInputBtn.classList.add('active');
}

function hideCityBar() {
	clearInputBtn.classList.remove('active');
}

function hideSearchResults() {
	menuCityWrapper.classList.remove('hide');
	searchResult.classList.remove('active');
}

function showSearchResults() {
	menuCityWrapper.classList.add('hide');
	searchResult.classList.add('active');
}

function clearSearchResults() {
	searchResult.innerHTML = '';
}

function openCityMenu(e, chose) {
	e.stopPropagation();
	chose ? mobileCityPopup.classList.remove('active') : null;
	if (window.innerWidth < 630) {
		cityPopup.classList.remove('active');
		menuCity.classList.add('active');
		bodyLock();
		if (!cityData.length) {
			addLoader();
			apiService.getCities().then((res) => {
				cityData = res;
				removeLoader();
				renderPreview().then((fragment) => menuCityWrapper.append(fragment));
			});
		}
	} else {
		cityPopup.classList.remove('active');
		menuCity.classList.toggle('active');
		page.classList.toggle('page-opacity');
		bodyLockToggle();
		if (!cityData.length) {
			addLoader();
			apiService.getCities().then((res) => {
				cityData = res;
				removeLoader();
				renderPreview().then((fragment) => menuCityWrapper.append(fragment));
			});
		}
	}
}

function highlightSearchString(str, searchString) {
	let word = str.toLowerCase().replace(searchString, `<span>${searchString}</span>`);

	const firstLetterInd = word.indexOf(str.toLowerCase()[0]);
	word = word.replace(word[firstLetterInd], str[0]);

	return word;
}

function setCityInfo(e, name, id) {
	e.stopPropagation();
	Cookies.set('city-id', id, { expires: 365 });
	Cookies.set('city-name', name, { expires: 365 });
	apiService.sendChoosenCity(yandexData, id).then(({ url }) => (document.location.href = url));
}
