import { Omni } from '@ocm/core';

import TestForm from './components/TestForm';

const o = new Omni();

o.use(omni => {
	omni.addRoute({
		path: '/testform',
		component: TestForm,
	});
});

o.start();
