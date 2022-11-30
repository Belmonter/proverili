import { ApiService } from '../apiService.js';
import { bodyUnlock } from '../../functions.js';

const filterForm = document.getElementById('filter-form');
const page = document.querySelector('.page');
const header = document.querySelector('.header');
const mobilePopupFilter = document.getElementById('popup-filter');

filterForm.addEventListener('submit', function (e) {
	e.preventDefault();
	mobilePopupFilter.classList.remove('active');
	page.classList.remove('filter-opacity');
	header.classList.remove('filter-opacity');
	bodyUnlock();
	sendForm();
});

function fillFormItem(item) {
	const result = [];
	if (item.length) {
		item.forEach((el) => {
			const id = el.querySelector('input').getAttribute('data-id');
			result.push(id);
		});
	}
	if (result.length) {
		return result;
	}
}

function renderYz(items) {
	const { first, last } = items;
	document.getElementById('first').innerHTML = first;
	document.getElementById('last').innerHTML = last;
	document.querySelector('.yzQuiz__wrapper').classList.remove('hide');
}

export function sendForm(nextPage) {
	const preloader = document.getElementById('preloader-yz');
	const totalBtn = document.querySelector('.items-tabs-top__btn');
	const totalText = totalBtn.querySelector('p');
	const totalText2 = document.querySelector('.items-tabs-bottom__btn');
	const apiService = new ApiService();
	const noResults = document.querySelector('.yzNoResults');
	const yzShow = document.querySelector('.yz__show');

	preloader.classList.remove('hide');

	if (nextPage) {
		apiService.getYz(getFilterValues(), nextPage).then((res) => setData(res, preloader, totalText, totalText2, yzShow, noResults));
	} else {
		apiService.getYz(getFilterValues()).then((res) => setData(res, preloader, totalText, totalText2, yzShow, noResults));
	}
}

function setData(res, preloader, totalText, totalText2, yzShow, noResults) {
	if (res.items) {
		preloader.classList.add('hide');
		totalText.textContent = `Показать (${res.total})`;
		totalText2.textContent = `Показать (${res.total})`;
		if (res.next_count) {
			res.next_count >= 10 ? (yzShow.textContent = `Показать еще (10)`) : (yzShow.textContent = `Показать еще (${res.next_count})`);
			yzShow.classList.remove('hide');
			yzShow.setAttribute('next-url', `${res.next_url}`);
			renderYz(res.items);
		} else {
			yzShow.classList.add('hide');
		}
	} else {
		preloader.classList.add('hide');
		noResults.classList.add('active');
		yzShow.classList.add('hide');
	}
}

export function getFilterValues() {
	// const formData = {};
	// let fromPrice = document.querySelector('.from').value;
	// let toPrice = document.querySelector('.to').value;
	// fromPrice = fromPrice.replace(' ', '');
	// toPrice = toPrice.replace(' ', '');
	//
	// const tagItems = document.querySelectorAll('.tags-tabs__item');
	// const tags = [];
	// tagItems.forEach((el) => {
	// 	if (el.classList.contains('active')) {
	// 		tags.push(el.getAttribute('data-name'));
	// 	}
	// });
	//
	// const citySelect = document.getElementById('filter-city');
	// const educationFormSelect = document.getElementById('filter-education');
	// const educationDirectionSelect = document.getElementById('filter-direction');
	// const specializationSelect = document.getElementById('filter-specialization');
	// const professionsSelect = document.getElementById('filter-profession');
	// const egSelect = document.getElementById('filter-ege');
	//
	// const cityItems = citySelect.querySelectorAll('[item-active]');
	// const educationFormItems = educationFormSelect.querySelectorAll('[item-active]');
	// const educationDirectionItems = educationDirectionSelect.querySelectorAll('[item-active]');
	// const specializationItems = specializationSelect.querySelectorAll('[item-active]');
	// const professionsItems = professionsSelect.querySelectorAll('[item-active]');
	// const egItems = egSelect.querySelectorAll('[item-active]');
	//
	// const cities = fillFormItem(cityItems);
	// const educationForm = fillFormItem(educationFormItems);
	// const educationDirection = fillFormItem(educationDirectionItems);
	// const specialization = fillFormItem(specializationItems);
	// const professions = fillFormItem(professionsItems);
	// const eg = fillFormItem(egItems);
	// const price = [fromPrice, toPrice];
	//
	// cities ? (formData.cities = cities) : null;
	// educationForm ? (formData.educationForm = educationForm) : null;
	// educationDirection ? (formData.educationDirection = educationDirection) : null;
	// specialization ? (formData.specialization = specialization) : null;
	// price ? (formData.price = price) : null;
	// professions ? (formData.professions = professions) : null;
	// eg ? (formData.eg = eg) : null;
	// price ? (formData.price = price) : null;
	// tags.length ? (formData.tags = tags) : null;

	let originalData = new FormData(filterForm);
	let mobileOriginalData = new FormData(mobilePopupFilter);
	for (let pair of mobileOriginalData.entries()) {
		originalData.append(pair[0], pair[1]);
	}

	let originalClearData = new FormData();

	originalData.append('order', document.querySelector('.sort-popup__btn input[name="sort"]:checked').value);

	let sliderPricesInputs = filterForm.querySelector('.slider-prices');
	let sliderPrices = filterForm.querySelector('.slider-tabs-bottom__range');
	if(sliderPricesInputs && sliderPrices) {
		let priceFrom = sliderPricesInputs.querySelector('.from')
		let priceTo = sliderPricesInputs.querySelector('.to')

		if(priceFrom && sliderPrices.dataset.from == (priceFrom.value).replace(/[^0-9]/g, '')) {
			originalData.delete(priceFrom.getAttribute('name'));
		}
		if(priceTo && sliderPrices.dataset.to == (priceTo.value).replace(/[^0-9]/g, '')) {
			originalData.delete(priceTo.getAttribute('name'));
		}
	}

	originalData.forEach((val, key) => {
		if(val.length > 0) {
			originalClearData.append(key, val);
		}
	});

	const queryFilterString = new URLSearchParams(originalClearData).toString();
	if(queryFilterString.length > 0)
		history.pushState(null, '', window.location.origin + '?' + queryFilterString);
	else
		history.pushState(null, '', window.location.origin);

	return originalClearData;
}

// sendForm();
