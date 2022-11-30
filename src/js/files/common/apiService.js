export class ApiService {
	url = 'https://studika.ru/api/';
	yandexUrl = 'https://geocode-maps.yandex.ru/1.x/?apikey=2e2cb5bc-956c-42ec-aa73-70a1c344a962&format=json&kind=locality&results=1&geocode=';

	getUrl() {
		return this.url;
	}

	async getSearchItems(searchString) {
		const result = await fetch(`${this.url}getSuggestions?query=${searchString}`, { method: 'POST' });
		return await result.json();
	}

	async getCities() {
		const result = await fetch(`${this.url}getCities`, { method: 'POST' });
		return await result.json();
	}

	async getLocation(coordinates) {
		const result = await fetch(`${this.yandexUrl}${coordinates}`);
		return result.json();
	}

	async checkCity(yandexData) {
		const result = await fetch(`${this.url}checkCity?yandex=${JSON.stringify(yandexData)}`, { method: 'POST' });
		return result.json();
	}

	async sendChoosenCity(yandexData, id) {
		let body = { yandexData, id };
		body = JSON.stringify(body);
		const result = await fetch(`${this.url}setGeoCity`, { method: 'POST', body });
		return result.json();
	}

	async getYz(form, nextPage) {
		// const body = JSON.stringify(form);
		const body = form;
		// const headers = { 'Content-Type': 'application/json' };
		if (nextPage) {
			const result = await fetch(`${nextPage}`, { method: 'POST', headers, body });
			return result.json();
		} else {
			const result = await fetch(`${this.url}educationals/getItems`, { method: 'POST', body });
			return result.json();
		}
	}

	async login(form) {
		const body = '';
		const headers = { 'Content-Type': 'application/json' };
		const result = await fetch(``, { method: 'POST', headers, body });
		return result.json();
	}

	async registerUser(form) {
		const body = '';
		const headers = { 'Content-Type': 'application/json' };
		const result = await fetch(``, { method: 'POST', headers, body });
		return result.json();
	}

	async showMoreYz() {
		const body = '';
		const headers = { 'Content-Type': 'application/json' };
		const result = await fetch(``, { method: 'POST', headers, body });
		return result.json();
	}

	async sendQuiz(form) {
		const body = JSON.stringify(form);
		const headers = { 'Content-Type': 'application/json' };
		const result = await fetch(``, { method: 'POST', headers, body });
		return result.json();
	}
}
