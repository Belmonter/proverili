import { activeRadioButton, nextStepAction, PrevStepAction } from './functions.js';

const radioBtns = document.querySelectorAll('.step__radioBtn');

const stepOne = document.querySelector('.tabs-pick__stepOne');
const stepTwo = document.querySelector('.tabs-pick__stepTwo');
const stepThree = document.querySelector('.tabs-pick__stepThree');
const stepFour = document.querySelector('.tabs-pick__stepFour');
const stepFive = document.querySelector('.tabs-pick__stepFive');
const stepSix = document.querySelector('.tabs-pick__stepSix');
const stepSeven = document.querySelector('.tabs-pick__stepSeven');
const stepEight = document.querySelector('.tabs-pick__stepEight');
const stepNine = document.querySelector('.tabs-pick__stepNine');
const steps = { stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix, stepSeven, stepEight, stepNine };

const stepOneNext = document.querySelector('.stepOne-pick__next');
const stepTwoNext = document.querySelector('.stepTwo-pick__next');
const stepThreeNext = document.querySelector('.stepThree-pick__next');
const stepFourNext = document.querySelector('.stepFour-pick__next');
const stepFiveNext = document.querySelector('.stepFive-pick__next');
const stepSixNext = document.querySelector('.stepSix-pick__next');
const stepSevenNext = document.querySelector('.stepSeven-pick__next');
const stepEightNext = document.querySelector('.stepEight-pick__next');

const stepTwoBack = document.querySelector('.stepTwo-pick__back');
const stepThreeBack = document.querySelector('.stepThree-pick__back');
const stepFourBack = document.querySelector('.stepFour-pick__back');
const stepFiveBack = document.querySelector('.stepFive-pick__back');
const stepSixBack = document.querySelector('.stepSix-pick__back');
const stepSevenBack = document.querySelector('.stepSeven-pick__back');
const stepEightBack = document.querySelector('.stepEight-pick__back');

radioBtns.forEach((radio) => {
	radio.addEventListener('click', activeRadioButton);
});

nextStepAction(stepOneNext, stepTwoNext, stepThreeNext, stepFourNext, stepFiveNext, stepSixNext, stepSevenNext, stepEightNext, steps);
PrevStepAction(stepTwoBack, stepThreeBack, stepFourBack, stepFiveBack, stepSixBack, stepSevenBack, stepEightBack, steps);
