import { getFilterValues } from './sendFilter.js';
import { ApiService } from '../apiService.js';

const apiService = new ApiService();

const filterForm = document.getElementById('filter-form');
const mobileFilter = document.getElementById('popup-filter');
const resetBtn = document.querySelector('.reset-tabs');

resetBtn.addEventListener('click', function () {
	const selects = filterForm.querySelectorAll('[data-select]');
	const mobileSelects = mobileFilter.querySelectorAll('[data-select]');
	const rangeSlider = document.getElementById('range_slider');
	const rangeFrom = Number(rangeSlider.dataset.from);
	const rangeTo = Number(rangeSlider.dataset.to);
	const filterTags = document.querySelectorAll('.tags-tabs__item');

	rangeSlider.noUiSlider.set([rangeFrom, rangeTo]);

	if (selects.length) {
		selects.forEach((select) => resetSelects(select));
	} else {
		mobileSelects.forEach((select) => resetSelects(select));
	}

	filterTags.forEach((tag) => {
		tag.classList.remove('active');
	});

	apiService.getYz(getFilterValues()).then((res) => {
		const show = document.querySelector('.items-tabs-top__btn');
		const showText = show.querySelector('p');
		show.classList.remove('load');
		showText.textContent = `Показать (${res.total})`;
	});
});

function resetSelects(select) {
	const multi = select.hasAttribute('multi');
	const placeholder = select.getAttribute('input-placeholder');
	const input = select.querySelector('.select__input');
	const counter = select.querySelector('.select__counter');
	const checkboxInputs = document.querySelectorAll('.checkbox__input');
	const values = select.querySelectorAll('.select-values__item');

	input.setAttribute('placeholder', placeholder);

	values.forEach((el) => {
		const order = el.getAttribute('data-order');
		el.classList.remove('active');
		el.removeAttribute('item-active');
		el.style.order = `${order}`;
	});

	if (multi) {
		counter.dataset.counter = '-1';
		counter.textContent = '';
	}

	checkboxInputs.forEach((checkbox) => {
		checkbox.checked = false;
	});
}
