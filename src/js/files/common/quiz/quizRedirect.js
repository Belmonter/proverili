import { showMainMenu } from '../menu/menu.js';
import { menuClose } from '../../functions.js';

const consultationQuiz = document.querySelector('.quiz-consultation');
const menuQuizes = document.querySelectorAll('.quiz-top');
const mainQuiz = document.querySelector('.yzQuiz');
const docHTML = document.documentElement;
const page = document.querySelector('.page');

menuQuizes.forEach((el) => {
	el.addEventListener('click', function (e) {
		e.stopPropagation();
		if (docHTML.classList.contains('menu-open')) {
			showMainMenu();
		}
		this.closest('.sub-menu-open').classList.remove('sub-menu-open');
		menuClose();
		mainQuiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});

consultationQuiz.addEventListener('click', function () {
	if (docHTML.classList.contains('menu-open')) {
		this.closest('.sub-menu-open').classList.remove('sub-menu-open');
		page.styles.display = 'block';
		showMainMenu();
	}
	this.closest('.sub-menu-open').classList.remove('sub-menu-open');
	showMainMenu();
	page.style.display = 'block';
});
