import express from 'express';

export default class OmniServer {
	constructor() {
		this.app = express();
		this.app.disable('x-powered-by');
	}

	start() {
		this.app.listen(12831, () => {
			console.info('Omni app listening on port 12831');
		});
	}
}
