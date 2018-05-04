import configureStore from '../../app/utils/configureStore';

export default function createStoreMiddleware(reducers) {
	return (req, res, next) => {
		req.store = configureStore(reducers);
		next();
	};
}
