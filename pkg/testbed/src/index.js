import { Omni } from '@ocm/core';
import authPasswordPlugin from '@ocm/auth-password';

import TestForm from './components/TestForm';

const o = new Omni();

o.use(authPasswordPlugin);

o.use(omni => {
	omni.addRoute({
		path: '/testform',
		component: TestForm,
	});
});

o.start();
