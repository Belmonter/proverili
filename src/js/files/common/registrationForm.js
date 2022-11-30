import { comparePasswords, listenInput } from './formsFunctions.js';
import { ApiService } from './apiService.js';
import { getSelectData } from './quiz/functions.js';

const apiService = new ApiService();

const registrationForm = document.getElementById('registration-form');
const nameInput = document.getElementById('registration-name');
const emailInput = document.getElementById('registration-email');
const phoneInput = document.getElementById('registration-phone');
const passwordInput = document.getElementById('registration-password');
const RepeatPasswordInput = document.getElementById('registration-repeat-password');

nameInput.addEventListener('input', (e) => listenInput(e, '.form-popup__input'));
emailInput.addEventListener('input', (e) => listenInput(e, '.form-popup__input'));
phoneInput.addEventListener('input', (e) => listenInput(e, '.form-popup__input'));
passwordInput.addEventListener('input', (e) => listenInput(e, '.form-popup__input'));
RepeatPasswordInput.addEventListener('input', (e) => comparePasswords(e, passwordInput, RepeatPasswordInput));

registrationForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(this);
	if (
		nameInput.value.length &&
		emailInput.value.length &&
		phoneInput.value.length &&
		passwordInput.value.length &&
		RepeatPasswordInput.value === passwordInput.value
	) {
		formRegistrationData(formData);
		// apiService.registerUser().then((res) => {
		// 	if (res.result) {
		// 		location.reload();
		// 	}
		// });
	} else {
		!nameInput.value.length ? nameInput.closest('.form-popup__input').classList.add('error') : null;
		!emailInput.value.length ? emailInput.closest('.form-popup__input').classList.add('error') : null;
		!phoneInput.value.length ? phoneInput.closest('.form-popup__input').classList.add('error') : null;
		!passwordInput.value.length ? passwordInput.closest('.form-popup__input').classList.add('error') : null;
		RepeatPasswordInput.value !== passwordInput.value ? passwordInput.closest('.form-popup__input').classList.add('passwordError') : null;
	}
});

function formRegistrationData(formData) {
	const city = document.getElementById('reg-city');
	const cityItems = city.querySelectorAll('[item-active]');
	const cityValues = getSelectData(cityItems);
	formData.append('city', cityValues);

	const forWhom = document.getElementById('reg-forWhom');
	const forWhomItems = forWhom.querySelectorAll('[item-active]');
	const forWhomValues = getSelectData(forWhomItems);
	formData.append('forWhom', forWhomValues);

	const where = document.getElementById('reg-where');
	const whereItems = where.querySelectorAll('[item-active]');
	const whereValues = getSelectData(whereItems);
	formData.append('where', whereValues);

	const form = document.getElementById('reg-form');
	const formItems = form.querySelectorAll('[item-active]');
	const formValues = getSelectData(formItems);
	formData.append('form', formValues);

	const plans = document.getElementById('reg-plans');
	const plansItems = plans.querySelectorAll('[item-active]');
	const plansValues = getSelectData(plansItems);
	formData.append('plans', plansValues);

	const specialisation = document.getElementById('reg-specialisation');
	const specialisationItems = specialisation.querySelectorAll('[item-active]');
	const specialisationValues = getSelectData(specialisationItems);
	formData.append('specialisation', specialisationValues);

	const choose = document.getElementById('reg-choose');
	const chooseItems = choose.querySelectorAll('[item-active]');
	const chooseValues = getSelectData(chooseItems);
	formData.append('choose', chooseValues);

	for (let pair of formData.entries()) {
		console.log(pair[0] + ', ' + pair[1]);
	}
}
