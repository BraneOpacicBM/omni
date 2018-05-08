import configureStore from '../../app/utils/configureStore';

export default function createStoreMiddleware(reducers, epics) {
	return (req, res, next) => {
		req.store = configureStore(reducers, epics);
		next();
	};
}
