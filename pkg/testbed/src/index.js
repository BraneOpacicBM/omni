import { Omni } from '@ocm/core';
import authPlugin from '@ocm/auth';
import authPasswordPlugin from '@ocm/auth-password';

import TestForm from './components/TestForm';

const o = new Omni();

o.use(authPlugin);
o.use(authPasswordPlugin);

o.use(omni => {
	omni.addRoute({
		path: '/testform',
		component: TestForm,
	});
});

o.start();
