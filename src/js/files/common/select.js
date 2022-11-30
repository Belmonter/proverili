import { ApiService } from './apiService.js';
import { getFilterValues } from './filters/sendFilter.js';

export class Select {
	constructor(select, options = {}) {
		this.options = Object.assign({}, options);

		this.select = select;
		this.selectOriginal = select.getElementsByTagName('select')[0];
		this.labelName = select.dataset.label;
		this.ajax = select.hasAttribute('data-ajax');
		this.ajaxLoaded = false;
		this.inputPlaceholder = select.getAttribute('input-placeholder');
		this.firstCheckedItem = '';
		this.multiSelect = this.selectOriginal.hasAttribute('multiple');
		// this.multiSelect = select.hasAttribute('multi');
		this.ajaxMethod = select.dataset.method;
		// this.id = select.getAttribute('id');
		this.id = 'id' + Math.random().toString(16).slice(2);
		this.filter = select.hasAttribute('data-filter');

		this.apiService = new ApiService();

		this.preloader = document.createElement('div');
		this.preloader.setAttribute('class', 'preloader');
		this.preloaderIcon = document.createElement('img');
		this.preloaderIcon.setAttribute('src', 'img/icons/Preloader.svg');
		this.preloaderIcon.setAttribute('alt', 'preloader');
		this.preloader.append(this.preloaderIcon);
		this.renderSelect();
	}

	renderSelect() {
		const originalSelect = this.select.querySelector('select');
		originalSelect.style.display = 'none';

		const selectWrapper = document.createElement('div');
		selectWrapper.setAttribute('class', 'select__wrapper');
		if (this.labelName) {
			selectWrapper.setAttribute('class', 'select__wrapper');
		} else {
			selectWrapper.setAttribute('class', 'select__wrapper no-label');
		}

		const inputWrapper = document.createElement('div');
		inputWrapper.setAttribute('class', 'select__input-wrapper');
		if (this.labelName) {
			inputWrapper.setAttribute('class', 'select__input-wrapper');
		} else {
			inputWrapper.setAttribute('class', 'select__input-wrapper no-label');
		}

		const valuesBlock = document.createElement('div');
		valuesBlock.classList.add('select__itemsWrapper');
		const valuesWrapper = document.createElement('div');
		valuesWrapper.setAttribute('class', 'select__values select-values');
		valuesBlock.append(valuesWrapper);
		if (this.ajax) {
			valuesWrapper.append(this.preloader);
		}

		const checkedItems = document.createElement('div');
		checkedItems.setAttribute('class', 'select-values__checked');

		const input = this.createInput();

		this.renderValues(valuesWrapper, input);

		inputWrapper.append(input);
		inputWrapper.append(this.createSelectArrow());
		selectWrapper.append(inputWrapper);
		selectWrapper.append(valuesBlock);
		this.multiSelect ? this.checkLastActiveItem(selectWrapper) : null;

		selectWrapper.addEventListener('click', (e) => {
			e.stopPropagation();
			if (e.composedPath().includes(selectWrapper)) {
				if (selectWrapper.classList.contains('active')) {
					selectWrapper.classList.remove('active');
				} else {
					this.openSelect(selectWrapper, valuesWrapper, input);
				}
			}
		});

		this.select.append(selectWrapper);
	}

	createInput() {
		const label = document.createElement('label');
		label.setAttribute('class', 'select__label');
		label.textContent = this.labelName ? this.labelName : '';

		const input = document.createElement('input');
		input.setAttribute('class', 'select__input');
		input.setAttribute('type', 'text');
		input.setAttribute('placeholder', this.inputPlaceholder);
		if (!this.select.hasAttribute('data-search')) {
			input.setAttribute('disabled', '');
		} else {
			input.addEventListener('input', (e) => this.searchSelectValues(e, input));
			input.addEventListener('paste', (e) => this.searchSelectValues(e, input));
		}

		const counter = document.createElement('div');
		counter.setAttribute('class', 'select__counter');
		counter.setAttribute('data-counter', '-1');

		label.append(input);
		label.append(counter);
		return label;
	}

	renderValues(valuesWrapper, selectInput) {
		if (!this.ajax) {
			this.renderSelectHTMLValues(valuesWrapper, selectInput);
		}
	}

	searchSelectValues(e, input) {
		e.stopPropagation();
		const value = e.target.value;
		const selectWrapper = input.closest('.select__wrapper');
		const items = selectWrapper.querySelectorAll('.select-values__item');
		if (value) {
			items.forEach((item) => {
				if (!item.hasAttribute('item-active')) {
					item.style.display = 'none';
				}
			});
			items.forEach((item) => {
				const text = item.querySelector('.checkbox__text').textContent;
				if (text.toLowerCase().match(value.toLowerCase()) && !item.hasAttribute('item-active')) {
					item.style.display = 'flex';
				} else {
					if (!item.hasAttribute('item-active')) {
						item.style.display = 'none';
					}
				}
			});
		} else {
			items.forEach((item) => {
				item.style.display = 'flex';
			});
		}
	}

	createSelectArrow() {
		const selectArrowWrapper = document.createElement('div');
		selectArrowWrapper.setAttribute('class', 'select__arrow');

		const arrowImg = document.createElement('img');
		arrowImg.setAttribute('src', 'img/icons/SelectArrowDown.svg');

		selectArrowWrapper.append(arrowImg);
		return selectArrowWrapper;
	}

	getValues(select, selectInput) {
		const values = [];
		select.querySelectorAll('option').forEach((el) => {
			if (el.value === '') return;
			const selectCounter = selectInput.querySelector('.select__counter');
			let countNumber = Number(selectCounter.dataset.counter);
			const name = el.textContent;
			const id = el.getAttribute('value');
			const selected = el.hasAttribute('selected');
			const placeholder = el.hasAttribute('data-placeholder');
			if (selected) {
				countNumber++;
				selectCounter.setAttribute('data-counter', `${countNumber}`);
				if (countNumber > 0) {
					selectCounter.textContent = `+${countNumber}`;
					selectCounter.setAttribute('data-counter', `${countNumber}`);
				}
			}
			values.push({
				name,
				id,
				selected,
				placeholder,
			});
		});
		return values;
	}

	checkBoxClickHandler(e, itemWrapper) {
		e.stopPropagation();
		const selectWrapper = itemWrapper.closest('.select__wrapper');
		const selectInput = selectWrapper.querySelector('input');
		const input = itemWrapper.querySelector('input');
		const item = input.closest('.select-values__item');
		const counter = selectWrapper.querySelector('.select__counter');
		let countNumber = Number(counter.dataset.counter);
		if (this.multiSelect) {
			if (input.checked) {
				countNumber++;
				counter.setAttribute('data-counter', countNumber);

				itemWrapper.setAttribute('item-active', '');
				item.style.order = '0';
				selectInput.value = '';
				if (countNumber > 0) {
					counter.textContent = `+${countNumber}`;
					counter.setAttribute('data-counter', countNumber);
				}
			} else {
				countNumber--;
				counter.setAttribute('data-counter', countNumber);
				countNumber < 1 ? (counter.textContent = '') : (counter.textContent = `+${countNumber}`);
				itemWrapper.removeAttribute('item-active');
				item.style.order = `${item.dataset.order}`;
			}
			this.checkLastActiveItem(selectWrapper);
			this.setMultiCheckPlaceholder(selectWrapper);
			this.setSelectedOriginalSelect(input);

			if (this.filter) {
				const show = document.querySelector('.items-tabs-top__btn');
				const showText = show.querySelector('p');
				this.apiService.getYz(getFilterValues()).then((res) => {
					show.classList.remove('load');
					showText.textContent = `Показать (${res.total})`;
				});
			}
		} else {
			input.checked ? itemWrapper.setAttribute('item-active', '') : itemWrapper.removeAttribute('item-active');
			this.setSingleCheckPlaceholder(selectWrapper, input);
			this.setSelectedOriginalSelect(input);

			if (this.filter) {
				const show = document.querySelector('.items-tabs-top__btn');
				const showText = show.querySelector('p');
				this.apiService.getYz(getFilterValues()).then((res) => {
					show.classList.remove('load');
					showText.textContent = `Показать (${res.total})`;
				});
			}
		}

		if (this.options.events && this.options.events.change) this.options.events.change.call(this, this);
	}

	setSelectedOriginalSelect(input) {
		if (!this.multiSelect) {
			this.selectOriginal.querySelectorAll('option').forEach((el) => {
				el.removeAttribute('selected');
			});
		}
		const originalOption = this.selectOriginal.querySelector('option[value="' + input.dataset.id + '"]');
		if (originalOption) {
			if (input.checked) originalOption.setAttribute('selected', 'selected');
			else originalOption.removeAttribute('selected');
		}
	}

	checkLastActiveItem(selectWrapper) {
		const checked = selectWrapper.querySelectorAll('[item-active]');
		const values = selectWrapper.querySelectorAll('.select-values__item');
		values.forEach((el) => {
			el.classList.remove('active');
		});
		checked.forEach((el, i) => {
			if (values.length === checked.length) {
				el.classList.remove('active');
			} else if (i === checked.length - 1) {
				el.classList.add('active');
			}
		});
	}

	setMultiCheckPlaceholder(selectWrapper) {
		const checkedItems = selectWrapper.querySelectorAll('[item-active]');
		const input = selectWrapper.querySelector('.select__input');

		if (!checkedItems.length) {
			input.placeholder = this.inputPlaceholder;
			this.firstCheckedItem = '';
			const placeholder = selectWrapper.querySelector('[data-placeholder]');
			placeholder.removeAttribute('data-placeholder');
		}

		checkedItems.forEach((el) => {
			const placeholder = selectWrapper.querySelectorAll('[data-placeholder]');
			if (checkedItems.length === 1) {
				placeholder.forEach((el) => {
					el.removeAttribute('data-placeholder');
				});
				el.setAttribute('data-placeholder', '');
				input.placeholder = el.querySelector('.checkbox__text').textContent;
				this.firstCheckedItem = el.querySelector('.checkbox__text').textContent;
			} else if (checkedItems.length > 1) {
				let counter = 0;
				checkedItems.forEach((el) => {
					const text = el.querySelector('.checkbox__text').textContent;
					if (text === this.firstCheckedItem) {
						counter++;
					}
				});
				if (counter === 0) {
					input.placeholder = checkedItems[0].querySelector('.checkbox__text').textContent;
					this.firstCheckedItem = checkedItems[0].querySelector('.checkbox__text').textContent;
				}
			}
		});
	}

	setSingleCheckPlaceholder(selectWrapper, checkboxInput) {
		const input = selectWrapper.querySelector('.select__input');
		const values = selectWrapper.querySelectorAll('.select-values__item');
		const checkboxInputs = selectWrapper.querySelectorAll('.checkbox__input');
		const currentItem = checkboxInput.closest('.select-values__item');

		checkboxInputs.forEach((el) => {
			if (el !== checkboxInput) {
				el.checked = false;
			}
		});
		values.forEach((el) => {
			el.removeAttribute('item-active');
		});
		if (checkboxInput.checked) {
			currentItem.setAttribute('item-active', '');
			input.placeholder = currentItem.querySelector('.checkbox__text').textContent;
		} else {
			input.placeholder = this.inputPlaceholder;
		}
	}

	openSelect(selectWrapper, valuesWrapper, selectInput) {
		const selects = document.querySelectorAll('.select__wrapper');
		if (this.ajax && !this.ajaxLoaded) {
			this.renderAjaxSelectValues(valuesWrapper, selectInput).then(() => {
				this.preloader.classList.add('hide');
				this.ajaxLoaded = true;
			});
		}
		if (selects.length > 1) selects.forEach((select) => select.classList.remove('active'));
		selectWrapper.classList.add('active');
	}

	renderSelectHTMLValues(valuesWrapper, selectInput) {
		const values = this.getValues(this.select, selectInput);

		values.forEach((el, i) => {
			const { name, id, selected, placeholder } = el;
			const itemWrapper = document.createElement('div');
			selected ? itemWrapper.setAttribute('item-active', '') : null;
			itemWrapper.setAttribute('data-order', `${i + 1}`);

			if (this.multiSelect) {
				itemWrapper.setAttribute('class', `select-values__item ${selected ? 'active' : ''}`);
			} else {
				itemWrapper.setAttribute('class', `select-values__item`);
			}

			itemWrapper.style.order = `${itemWrapper.classList.contains('active') ? '0' : i + 1}`;

			const checkbox = document.createElement('div');
			checkbox.setAttribute('class', 'checkbox');

			const input = document.createElement('input');
			input.setAttribute('class', 'checkbox__input');
			input.setAttribute('id', `${this.id}-${id}`);
			input.setAttribute('data-id', `${id}`);
			input.setAttribute('type', 'checkbox');
			selected ? input.setAttribute('checked', '') : null;

			if (placeholder) {
				selectInput.children[0].placeholder = name;
				selectInput.children[0].setAttribute('data-placeholder', '');
			}

			const label = document.createElement('label');
			label.setAttribute('class', 'checkbox__label');
			label.setAttribute('for', `${this.id}-${id}`);

			const text = document.createElement('span');
			text.setAttribute('class', 'checkbox__text');
			text.textContent = name;

			label.append(text);
			checkbox.append(input);
			checkbox.append(label);
			itemWrapper.append(checkbox);

			itemWrapper.addEventListener('input', (e) => this.checkBoxClickHandler(e, itemWrapper));

			valuesWrapper.append(itemWrapper);
		});

		const select = this.select;
		setTimeout(() => {
			const wrapper = select.querySelector('.select__wrapper');
			if (wrapper.querySelectorAll('[item-active]').length > 0) {
				if (this.multiSelect) {
					this.setMultiCheckPlaceholder(wrapper);
				} else {
					this.setSingleCheckPlaceholder(wrapper, wrapper.querySelector('[item-active] input'));
				}
			}
		}, 10);
	}

	async renderAjaxSelectValues(valuesWrapper) {
		let counter = 0;

		let result;

		if (window.selectAjax && window.selectAjax[this.ajaxMethod]) {
			result = window.selectAjax[this.ajaxMethod];
		} else {
			result = await fetch(`${this.apiService.getUrl()}references/${this.ajaxMethod}`, { method: 'POST' }).then((res) => res.json());
		}

		this.selectOriginal.innerHTML = '';

		this.selectOriginal.add(new Option());

		for (const resultKey in result) {
			const itemWrapper = document.createElement('div');
			itemWrapper.setAttribute('data-order', `${counter + 1}`);
			itemWrapper.style.order = `${itemWrapper.classList.contains('active') ? '0' : counter + 1}`;
			itemWrapper.setAttribute('class', `select-values__item`);

			const checkbox = document.createElement('div');
			checkbox.setAttribute('class', 'checkbox');

			const input = document.createElement('input');
			input.setAttribute('class', 'checkbox__input');
			input.setAttribute('id', `${this.id}${resultKey}`);
			input.setAttribute('data-id', `${resultKey}`);
			input.setAttribute('type', 'checkbox');

			const label = document.createElement('label');
			label.setAttribute('class', 'checkbox__label');
			label.setAttribute('for', `${this.id}${resultKey}`);

			const text = document.createElement('span');
			text.setAttribute('class', 'checkbox__text');
			text.textContent = result[resultKey];

			label.append(text);
			checkbox.append(input);
			checkbox.append(label);
			itemWrapper.append(checkbox);

			itemWrapper.addEventListener('input', (e) => this.checkBoxClickHandler(e, itemWrapper));

			valuesWrapper.append(itemWrapper);

			this.selectOriginal.add(new Option(result[resultKey], resultKey));

			counter++;
		}

		if (!window.selectAjax) {
			window.selectAjax = {};
		}
		window.selectAjax[this.ajaxMethod] = result;
	}
}
