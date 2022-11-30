import { Select } from './select.js';

const addItemBtn = document.querySelector('.form-popup__add');
const wrapper = document.querySelector('.form-popup__wrapper');
let counter = 1;

addItemBtn.addEventListener('click', addNewCounterHTML);

function addNewCounterHTML() {
	counter++;
	wrapper.insertAdjacentHTML(
		'beforeend',
		`
		<div class='form-popup__count count-form'>
			<div class='count-form__select' data-select id='count-${counter}'>
				<select>
					<option value='6' selected data-placeholder>Математика</option>
				</select>
			</div>
			<div class='count-form__counter'>
				<input name='counter-number-${counter}' placeholder='Балл'>
			</div>
		</div>
	`
	);
	const select = document.getElementById(`count-${counter}`);
	new Select(select);
}
