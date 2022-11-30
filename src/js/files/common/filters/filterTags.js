import { getFilterValues } from './sendFilter.js';
import { ApiService } from '../apiService.js';

const filterTags = document.querySelectorAll('.tags-tabs__item');
const apiService = new ApiService();

filterTags.forEach((el) => {
	const show = document.querySelector('.items-tabs-top__btn');
	const showText = show.querySelector('p');
	el.addEventListener('click', function () {
		this.classList.toggle('active');
		this.querySelector('input').checked = !this.querySelector('input').checked;
		apiService.getYz(getFilterValues()).then((res) => {
			showText.textContent = `Показать (${res.total})`;
		});
	});
});
