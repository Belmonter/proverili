export function listenInput(e, wrapperClassName) {
	if (e.target.value.length) {
		e.target.closest(wrapperClassName).classList.remove('error');
	}
}

export function comparePasswords(e, first, last) {
	if (first.value === last.value) {
		last.closest('.form-popup__input').classList.remove('passwordError');
	} else {
		last.closest('.form-popup__input').classList.add('passwordError');
	}
}
