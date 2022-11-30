export function activeRadioButton() {
	const wrapper = this.closest('.step__radioBtns');
	const radioBtns = wrapper.querySelectorAll('.step__radioBtn');
	const radioInput = this.querySelector('input');
	radioBtns.forEach((radio) => {
		radio.classList.remove('active');
	});
	this.classList.add('active');
	radioInput.checked = true;
}

export function activeStep(nextStep, prevStep) {
	nextStep.classList.add('active');
	prevStep.classList.remove('active');
}

export function nextStepAction(
	stepOneNext,
	stepTwoNext,
	stepThreeNext,
	stepFourNext,
	stepFiveNext,
	stepSixNext,
	stepSevenNext,
	stepEightNext,
	steps
) {
	stepOneNext.addEventListener('click', () => activeStep(steps.stepTwo, steps.stepOne));
	stepTwoNext.addEventListener('click', () => activeStep(steps.stepThree, steps.stepTwo));
	stepThreeNext.addEventListener('click', () => activeStep(steps.stepFour, steps.stepThree));
	stepFourNext.addEventListener('click', () => activeStep(steps.stepFive, steps.stepFour));
	stepFiveNext.addEventListener('click', () => activeStep(steps.stepSix, steps.stepFive));
	stepSixNext.addEventListener('click', () => activeStep(steps.stepSeven, steps.stepSix));
	stepSevenNext.addEventListener('click', () => activeStep(steps.stepEight, steps.stepSeven));
	stepEightNext.addEventListener('click', () => activeStep(steps.stepNine, steps.stepEight));
}

export function PrevStepAction(stepTwoBack, stepThreeBack, stepFourBack, stepFiveBack, stepSixBack, stepSevenBack, stepEightBack, steps) {
	stepTwoBack.addEventListener('click', () => activeStep(steps.stepOne, steps.stepTwo));
	stepThreeBack.addEventListener('click', () => activeStep(steps.stepTwo, steps.stepThree));
	stepFourBack.addEventListener('click', () => activeStep(steps.stepThree, steps.stepFour));
	stepFiveBack.addEventListener('click', () => activeStep(steps.stepFour, steps.stepFive));
	stepSixBack.addEventListener('click', () => activeStep(steps.stepFive, steps.stepSix));
	stepSevenBack.addEventListener('click', () => activeStep(steps.stepSix, steps.stepSeven));
	stepEightBack.addEventListener('click', () => activeStep(steps.stepSeven, steps.stepEight));
}

export function getSelectData(item) {
	const result = [];
	if (item.length) {
		item.forEach((el) => {
			const id = el.querySelector('input').getAttribute('data-id');
			result.push(id);
		});
	}
	if (result.length) {
		return result;
	}
}

export function getStepValue(step) {
	let result = '';
	step.forEach((el) => {
		const input = el.querySelector('input');
		const label = el.querySelector('label');
		input.checked ? (result = label.textContent) : null;
	});
	return result;
}

export function formQuizData(
	firstStepValue,
	secondStepValues,
	thirdStepValue,
	fourthStepValue,
	fifthStepValue,
	sixStepValue,
	seventhStepValues,
	eighthStepValue,
	stepName,
	stepPhone,
	stepEmail
) {
	const formData = [];

	formData.firstStep = firstStepValue;
	secondStepValues ? (formData.secondStep = secondStepValues) : null;
	formData.thirdStep = thirdStepValue;
	formData.fourthStep = fourthStepValue;
	formData.fifthStep = fifthStepValue;
	formData.sixStep = sixStepValue;
	seventhStepValues ? (formData.seventhStep = seventhStepValues) : null;
	formData.eighthStep = eighthStepValue;
	formData.stepName = stepName;
	formData.stepPhone = stepPhone;
	formData.stepEmail = stepEmail;

	return formData;
}
