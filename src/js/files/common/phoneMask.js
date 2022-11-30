document.addEventListener('DOMContentLoaded', function () {
	const phoneInputs = document.querySelectorAll('input[data-tel-input]');

	let phoneMaskPlaceholder = "+7 (___) ___-__-__";

	var setPhoneMask = function (e) {
		var el = e.target,
			clearVal = el.dataset.phoneClear,
			pattern = el.dataset.phonePattern,
			matrix_def = phoneMaskPlaceholder,
			matrix = pattern ? pattern : matrix_def,
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = e.target.value.replace(/\D/g, "");



		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = '';
				return;
			}
		}
		if (def.length >= val.length)
			val = def;
		e.target.value = matrix.replace(/./g, function (a) {
			return (/[_\d]/.test(a) && i < val.length) ? val.charAt(i++) : i >= val.length ? "" : a
		});
	}
	for (let elem of phoneInputs) {
		elem.setAttribute('placeholder', phoneMaskPlaceholder);
		for (let ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, setPhoneMask);
		}
	}

	//
	// const getInputNumbersValue = function (input) {
	// 	// Return stripped input value — just numbers
	// 	return input.value.replace(/\D/g, '');
	// };
	//
	// const onPhonePaste = function (e) {
	// 	const input = e.target,
	// 		inputNumbersValue = getInputNumbersValue(input);
	// 	const pasted = e.clipboardData || window.clipboardData;
	// 	if (pasted) {
	// 		const pastedText = pasted.getData('Text');
	// 		if (/\D/g.test(pastedText)) {
	// 			// Attempt to paste non-numeric symbol — remove all non-numeric symbols,
	// 			// formatting will be in onPhoneInput handler
	// 			input.value = inputNumbersValue;
	// 		}
	// 	}
	// };
	//
	// let onPhoneInput = function (e) {
	// 	let input = e.target,
	// 		inputNumbersValue = getInputNumbersValue(input),
	// 		selectionStart = input.selectionStart,
	// 		formattedInputValue = '';
	//
	// 	if (!inputNumbersValue) {
	// 		return (input.value = '');
	// 	}
	//
	// 	if (input.value.length != selectionStart) {
	// 		// Editing in the middle of input, not last symbol
	// 		if (e.data && /\D/g.test(e.data)) {
	// 			// Attempt to input non-numeric symbol
	// 			input.value = inputNumbersValue;
	// 		}
	// 		return;
	// 	}
	//
	// 	// if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
	// 	// 	if (inputNumbersValue[0] == '9')
	// 	// 		inputNumbersValue = '7' + inputNumbersValue;
	// 		// let firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
	// 		let firstSymbols = '+7';
	// 		formattedInputValue = input.value = firstSymbols + ' ';
	// 		if (inputNumbersValue.length > 1) {
	// 			formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
	// 		}
	// 		if (inputNumbersValue.length >= 5) {
	// 			formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
	// 		}
	// 		if (inputNumbersValue.length >= 8) {
	// 			formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
	// 		}
	// 		if (inputNumbersValue.length >= 10) {
	// 			formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
	// 		}
	// 	// } else {
	// 	// 	formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
	// 	// }
	// 	// formattedInputValue = '+7' + inputNumbersValue;
	// 	input.value = formattedInputValue;
	// };
	// let onPhoneKeyDown = function (e) {
	// 	// Clear input after remove last symbol
	// 	let inputValue = e.target.value.replace(/\D/g, '');
	// 	if (e.keyCode == 8 && inputValue.length == 1) {
	// 		e.target.value = '';
	// 	}
	// };
	// for (let phoneInput of phoneInputs) {
	// 	phoneInput.setAttribute('placeholder', '+7 (___) ___-__-__');
	// 	phoneInput.addEventListener('keydown', onPhoneKeyDown);
	// 	phoneInput.addEventListener('input', onPhoneInput, false);
	// 	phoneInput.addEventListener('paste', onPhonePaste, false);
	// }
});
