import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import api from './api';

export default function configureStore(reducers, epics) {
	const reducer = combineReducers(reducers);
	const epic = combineEpics(...epics);

	const middleware = applyMiddleware(
		createEpicMiddleware(epic, {
			dependencies: { api },
		}),
	);

	return createStore(reducer, middleware);
}
