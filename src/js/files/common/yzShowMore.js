import { sendForm } from './filters/sendFilter.js';

const moreBtn = document.querySelector('.yz__show');

moreBtn.addEventListener('click', function (e) {
	const url = this.getAttribute('next-url');
	sendForm(url);
});
