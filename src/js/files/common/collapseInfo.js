const collapseInfoBtn = document.querySelector('.education-yz-about__more');
const infoBlock = document.querySelector('.education-yz-about__desc');
const infoBtnText = collapseInfoBtn.querySelector('p');

const collapsePopularBtn = document.querySelector('.popular-yz-about__more');
const popularBlock = document.querySelector('.popular-yz-about__wrapper');
const popularBtnText = collapsePopularBtn.querySelector('p');

collapseInfoBtn.addEventListener('click', function () {
	this.classList.toggle('open');
	infoBlock.classList.toggle('open');
	if (collapseInfoBtn.classList.contains('open')) {
		infoBtnText.textContent = 'Свернуть';
	} else {
		infoBtnText.textContent = 'Показать еще';
	}
});

collapsePopularBtn.addEventListener('click', function () {
	this.classList.toggle('open');
	popularBlock.classList.toggle('open');
	if (collapsePopularBtn.classList.contains('open')) {
		popularBtnText.textContent = 'Свернуть';
	} else {
		popularBtnText.textContent = 'Показать еще';
	}
});
