import { formQuizData, getSelectData, getStepValue } from './functions.js';
import { ApiService } from '../apiService.js';
import { listenInput } from '../formsFunctions.js';

const form = document.querySelector('.tabs-pick__form');
const apiService = new ApiService();
const stepNine = document.querySelector('.tabs-pick__stepNine');
const stepFinal = document.querySelector('.tabs-pick__final');

const firstStep = document.querySelectorAll('.firstStepRadio__btn');
const firstStepValue = getStepValue(firstStep);

const secondStep = document.getElementById('pick-city');
const secondStepItems = secondStep.querySelectorAll('[item-active]');
const secondStepValues = getSelectData(secondStepItems);

const thirdStep = document.querySelectorAll('.thirdStepRadio__btn');
const thirdStepValue = getStepValue(thirdStep);

const fourthStep = document.querySelectorAll('.fourthStepRadio__btn');
const fourthStepValue = getStepValue(fourthStep);

const fifthStep = document.querySelectorAll('.fifthStepRadio__btn');
const fifthStepValue = getStepValue(fifthStep);

const sixStep = document.querySelectorAll('.SixStepRadio__btn');
const sixStepValue = getStepValue(sixStep);

const seventhStep = document.getElementById('pick-specialization');
const seventhStepItems = seventhStep.querySelectorAll('[item-active]');
const seventhStepValues = getSelectData(seventhStepItems);

const eighthStep = document.querySelectorAll('.eighthStepRadio__btn');
const eighthStepValue = getStepValue(eighthStep);

const stepName = document.getElementById('tabs-pick-name');
const stepPhone = document.getElementById('tabs-pick-phone');
const stepEmail = document.getElementById('tabs-pick-email');

form.addEventListener('submit', function (e) {
	e.preventDefault();

	const stepNameValue = document.getElementById('tabs-pick-name').value;
	const stepPhoneValue = document.getElementById('tabs-pick-phone').value;
	const stepEmailValue = document.getElementById('tabs-pick-email').value;

	stepName.addEventListener('input', (e) => listenInput(e, '.step-info__input'));
	stepPhone.addEventListener('input', (e) => listenInput(e, '.step-info__input'));
	stepEmail.addEventListener('input', (e) => listenInput(e, '.step-info__input'));

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
			stepPhone,
			stepEmail
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
