import { nextStepAction, PrevStepAction } from './functions.js';

const stepOne = document.querySelector('.form-yzQuiz__stepOne');
const stepTwo = document.querySelector('.form-yzQuiz__stepTwo');
const stepThree = document.querySelector('.form-yzQuiz__stepThree');
const stepFour = document.querySelector('.form-yzQuiz__stepFour');
const stepFive = document.querySelector('.form-yzQuiz__stepFive');
const stepSix = document.querySelector('.form-yzQuiz__stepSix');
const stepSeven = document.querySelector('.form-yzQuiz__stepSeven');
const stepEight = document.querySelector('.form-yzQuiz__stepEight');
const stepNine = document.querySelector('.form-yzQuiz__stepNine');
const steps = { stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix, stepSeven, stepEight, stepNine };

const stepOneNext = document.querySelector('.yzQuizOne__next');
const stepTwoNext = document.querySelector('.yzQuizTwo__next');
const stepThreeNext = document.querySelector('.yzQuizThree__next');
const stepFourNext = document.querySelector('.yzQuizFour__next');
const stepFiveNext = document.querySelector('.yzQuizFive__next');
const stepSixNext = document.querySelector('.yzQuizSix__next');
const stepSevenNext = document.querySelector('.yzQuizSeven__next');
const stepEightNext = document.querySelector('.yzQuizEight__next');

const stepTwoBack = document.querySelector('.yzQuizTwo__back');
const stepThreeBack = document.querySelector('.yzQuizThree__back');
const stepFourBack = document.querySelector('.yzQuizFour__back');
const stepFiveBack = document.querySelector('.yzQuizFive__back');
const stepSixBack = document.querySelector('.yzQuizSix__back');
const stepSevenBack = document.querySelector('.yzQuizSeven__back');
const stepEightBack = document.querySelector('.yzQuizEight__back');

nextStepAction(stepOneNext, stepTwoNext, stepThreeNext, stepFourNext, stepFiveNext, stepSixNext, stepSevenNext, stepEightNext, steps);
PrevStepAction(stepTwoBack, stepThreeBack, stepFourBack, stepFiveBack, stepSixBack, stepSevenBack, stepEightBack, steps);
