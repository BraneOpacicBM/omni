import { of } from 'rxjs/observable/of';
import { catchError, ignoreElements, switchMap, tap } from 'rxjs/operators';

import { login, loginError } from '../actions/login';

export function loginEpic(action$, store, { api }) {
	return action$.ofType(login.type).pipe(
		switchMap(({ email, password }) => (
			api('/auth/password', {
				method: 'POST',
				body: { email, password },
			}).pipe(
				tap(({ response }) => {
					document.cookie = `omni_token=${response.token};path=/`;
					window.location = '/';
				}),
				ignoreElements(),
				catchError(({ response }) => of(loginError({ error: response.error }))),
			)
		)),
	);
}
