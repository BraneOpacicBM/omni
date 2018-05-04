import { combineReducers, createStore } from 'redux';

export default function configureStore(reducers) {
	const reducer = combineReducers(reducers);
	return createStore(reducer);
}
