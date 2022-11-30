
export class Quiz {
    constructor(quizBlock) {
        this.quizBlock = quizBlock;
        this.quizForm = this.quizBlock.querySelector('form');
        this.quizSteps = this.quizBlock.querySelectorAll('.quiz-form__step:not(.quiz-form__step-final)');
        this.quizStepFinal = this.quizBlock.querySelector('.quiz-form__step-final');
        this.quizSubmitBtn = this.quizForm.querySelector('button.quiz-form__step-btn[type="submit"]');

        this.init();
    }

    init() {
        this.prepareStatusSteps();
    }



    prepareStatusSteps() {
        this.quizSteps.forEach((step, index) => {
            let stepNumber = document.createElement('div');
            stepNumber.classList.add('quiz-form__step-number');
            stepNumber.textContent = 'Шаг ' + (index + 1) + '/' + this.quizSteps.length;
            step.querySelector('.quiz-form__step-head').insertAdjacentElement('afterbegin', stepNumber);

            let nextStepBtn = step.querySelector('.quiz-form__step-next');
            if(nextStepBtn) {
                nextStepBtn.classList.add('disabled');
                this.addEventToRadioBtns(step, nextStepBtn);
                this.addEventToNextBtn(step, nextStepBtn);
            }

            this.addEventToBackBtn(step);
        });
        this.addEventToSubmitBtn();
    }

    addEventToSubmitBtn() {
        let quizSubmitBtn = this.quizSubmitBtn;
        this.quizForm.addEventListener('submit', function(e){
            e.preventDefault();

            let originalData = new FormData(e.target);
            let originalClearData = new FormData();

            originalData.forEach((val, key) => {
                if(val.length > 0) {
                    originalClearData.append(key, val);
                }
            });

            // Доделать отправку этих данных
            // И если все хорошо перекидываем на слайд с подтверждением

            console.log(quizSubmitBtn);

            quizSubmitBtn.closest('.quiz-form__step').classList.remove('active');
            quizSubmitBtn.closest('.quiz-form__step').nextElementSibling.classList.add('active');


            return false;
        });
    }

    addEventToBackBtn(step) {

        let backStepBtn = step.querySelector('.quiz-form__step-back');
        if(backStepBtn) {
            backStepBtn.addEventListener('click', function(e) {
                e.stopPropagation();

                step.classList.remove('active');
                step.previousElementSibling.classList.add('active');
            })
        }

    }

    addEventToNextBtn(step, nextStepBtn) {
        nextStepBtn.addEventListener('click', function(e) {
            e.stopPropagation();

            if(this.classList.contains('disabled')) {
                return false;
            }
            step.classList.remove('active');
            // console.log(step, step.nextSibling, step.nextSibling.classList);
            step.nextElementSibling.classList.add('active');
        })
    }

    addEventToRadioBtns(step, nextStepBtn) {
        let radioBtns = step.querySelectorAll('.quiz-form__step-radio input[type="radio"]');
        if(radioBtns.length > 0) {
            radioBtns.forEach((item) => {
                item.addEventListener('change', function(e) {
                    e.stopPropagation();
                    if(step.querySelectorAll('.quiz-form__step-radio input[type="radio"]:checked').length > 0) {
                        nextStepBtn.classList.remove('disabled');
                    }
                });
            });
        }
    }
}