import express from 'express';

import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

export default class OmniServer {
	constructor() {
		this.app = express();
		this.app.disable('x-powered-by');
	}

	start() {
		this.app.use(notFoundMiddleware);
		this.app.use(handleErrorMiddleware);

		this.app.listen(12831, () => {
			console.info('Omni app listening on port 12831');
		});
	}
}
