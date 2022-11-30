const collapseBtn = document.querySelector('.collapse-tabs');
const collapseBtnText = document.querySelector('.collapse-tabs__text');
const bottomFilterMenu = document.querySelector('.items-tabs-bottom__wrapper');
const tags = document.querySelector('.tags-tabs');

collapseBtn.addEventListener('click', function () {
	bottomFilterMenu.classList.toggle('active');
	this.classList.toggle('active');
	if (this.classList.contains('active')) {
		collapseBtnText.textContent = 'Свернуть';
		tags.classList.remove('mt0');
	} else {
		collapseBtnText.textContent = 'Развернуть';
		tags.classList.add('mt0');
	}
});

if (window.innerWidth <= 940) {
	bottomFilterMenu.classList.remove('active');
}
