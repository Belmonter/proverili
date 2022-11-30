import { Select } from './select.js';
import { Quiz } from "./quiz/quiz.js";

const selects = document.querySelectorAll('[data-select]');
const quizSelects = document.querySelectorAll('[quiz-select]');

selects.forEach((select) => {
	new Select(select);
});

quizSelects.forEach((select) => {
	new Select(select, {
		events: {
			'change': function(select) {
				let nextStepBtn = select.selectOriginal.closest('.quiz-form__step').querySelector('.quiz-form__step-next');
				if(select.selectOriginal.querySelectorAll('option:checked').length > 0) {
					nextStepBtn.classList.remove('disabled');
				} else {
					nextStepBtn.classList.add('disabled');
				}
			}
		}
	});
});

const allQuiz = document.querySelectorAll('.quiz-container');
allQuiz.forEach((quiz) => {
	new Quiz(quiz);
});

// window.addEventListener('resize', fixHeight);
//
// function fixHeight() {
// 	let vh = window.innerHeight * 0.01;
//
// 	document.documentElement.style.setProperty('--vh', `${vh}px`);
// }

// fixHeight();
