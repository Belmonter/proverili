import noUiSlider from 'nouislider';
import { getFilterValues } from './sendFilter.js';
import { ApiService } from '../apiService.js';

const rangeWrapper = document.querySelector('.slider-tabs-bottom__wrapper');
const rangeSlider = document.getElementById('range_slider');
const inputFrom = document.querySelector('.slider-tabs-bottom__input.from');
const inputTo = document.querySelector('.slider-tabs-bottom__input.to');
const inputs = [inputFrom, inputTo];
const fromNumber = Number(rangeSlider.dataset.from);
const toNumber = Number(rangeSlider.dataset.to);
const stepNumber = Number(rangeSlider.dataset.step);

const apiService = new ApiService();

noUiSlider.create(rangeSlider, {
	start: [fromNumber, toNumber],
	connect: true,
	step: stepNumber,
	range: {
		min: fromNumber,
		max: toNumber,
	},
	format: wNumb({
		decimals: 0,
		thousand: ' ',
	}),
});

rangeSlider.noUiSlider.on('update', (values, handle) => {
	inputs[handle].value = values[handle];
});

rangeSlider.noUiSlider.on('change', () => {
	const show = document.querySelector('.items-tabs-top__btn');
	const showText = show.querySelector('p');
	apiService.getYz(getFilterValues()).then((res) => {
		show.classList.remove('load');
		showText.textContent = `Показать (${res.total})`;
	});
});

inputTo.addEventListener('change', function () {
	rangeSlider.noUiSlider.set([null, this.value]);
});

inputFrom.addEventListener('change', function () {
	rangeSlider.noUiSlider.set([this.value, null]);
});

rangeSlider.noUiSlider.on('end', function () {
	rangeWrapper.classList.remove('active');
});

inputTo.addEventListener('input', function () {
	this.value = this.value.replace(/[^\d.]/g, '');
});

inputFrom.addEventListener('input', function () {
	this.value = this.value.replace(/[^\d.]/g, '');
});
