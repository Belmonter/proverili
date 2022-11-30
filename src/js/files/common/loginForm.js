import { ApiService } from './apiService.js';
import { listenInput } from './formsFunctions.js';

const apiService = new ApiService();

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');

emailInput.addEventListener('input', listenInput);
passwordInput.addEventListener('input', listenInput);

loginForm.addEventListener('submit', function (e) {
	e.preventDefault();
	if (emailInput.value.length && passwordInput.value.length) {
		const formData = new FormData(this);
		apiService.login(formData).then((res) => {
			if (res.result) {
				location.reload();
			}
		});
	} else {
		!emailInput.value.length ? emailInput.closest('.form-popup__input').classList.add('error') : null;
		!passwordInput.value.length ? passwordInput.closest('.form-popup__input').classList.add('error') : null;
	}
});
