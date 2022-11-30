import { formQuizData, getSelectData, getStepValue } from './functions.js';
import { ApiService } from '../apiService.js';
import { listenInput } from '../formsFunctions.js';

const form = document.querySelector('.yzQuiz__form');
const apiService = new ApiService();
const stepNine = document.querySelector('.form-yzQuiz__stepNine');
const stepFinal = document.querySelector('.form-yzQuiz__final');

const firstStep = document.querySelectorAll('.yzQuizFirstStepRadio__btn');
const firstStepValue = getStepValue(firstStep);

const secondStep = document.getElementById('QuizItem-city');
const secondStepItems = secondStep.querySelectorAll('[item-active]');
const secondStepValues = getSelectData(secondStepItems);

const thirdStep = document.querySelectorAll('.yzQuizThirdStepRadio__btn');
const thirdStepValue = getStepValue(thirdStep);

const fourthStep = document.querySelectorAll('.yzQuizFourthStepRadio__btn');
const fourthStepValue = getStepValue(fourthStep);

const fifthStep = document.querySelectorAll('.yzQuizFifthStepRadio__btn');
const fifthStepValue = getStepValue(fifthStep);

const sixStep = document.querySelectorAll('.yzQuizSixStepRadio__btn');
const sixStepValue = getStepValue(sixStep);

const seventhStep = document.getElementById('QuizItem-specialization');
const seventhStepItems = seventhStep.querySelectorAll('[item-active]');
const seventhStepValues = getSelectData(seventhStepItems);

const eighthStep = document.querySelectorAll('.yzQuizEighthStepRadio__btn');
const eighthStepValue = getStepValue(eighthStep);

const stepName = document.getElementById('pageQuiz-name');
const stepPhone = document.getElementById('pageQuiz-phone');
const stepEmail = document.getElementById('pageQuiz-email');

stepName.addEventListener('input', (e) => listenInput(e, '.step-info__input'));
stepPhone.addEventListener('input', (e) => listenInput(e, '.step-info__input'));
stepEmail.addEventListener('input', (e) => listenInput(e, '.step-info__input'));

form.addEventListener('submit', function (e) {
	e.preventDefault();

	const stepNameValue = document.getElementById('pageQuiz-name').value;
	const stepPhoneValue = document.getElementById('pageQuiz-phone').value;
	const stepEmailValue = document.getElementById('pageQuiz-email').value;

	if (stepNameValue.length && stepPhoneValue.length && stepEmailValue.length) {
		const formData = formQuizData(
			firstStepValue,
			secondStepValues,
			thirdStepValue,
			fourthStepValue,
			fifthStepValue,
			sixStepValue,
			seventhStepValues,
			eighthStepValue,
			stepNameValue,
			stepPhoneValue,
			stepEmailValue
		);
		console.log(formData);

		// apiService.sendQuiz(formData).then((res) => {
		// 	if (res.result) {
		// 		stepNine.classList.remove('active');
		// 		stepFinal.classList.add('active');
		// 	}
		// });
	} else {
		!stepNameValue.length ? stepName.closest('.step-info__input').classList.add('error') : null;
		!stepPhoneValue.length ? stepPhone.closest('.step-info__input').classList.add('error') : null;
		!stepEmailValue.length ? stepEmail.closest('.step-info__input').classList.add('error') : null;
	}
});
