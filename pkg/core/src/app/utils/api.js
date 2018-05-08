import { ajax } from 'rxjs/observable/dom/ajax';
import xhr2 from 'xhr2';

const apiUrl = 'http://localhost:12830';

const XHR2 = typeof XMLHttpRequest !== 'undefined'
	? XMLHttpRequest
	: xhr2;

export default function api(endpoint, options = {}) {
	return ajax({
		createXHR: () => new XHR2(),
		url: `${apiUrl}${endpoint}`,
		...options,
		crossDomain: true,
	});
}
