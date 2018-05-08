export default function createAction(label) {
	const type = `omni/${label}`;
	const actionCreator = payload => ({ type, ...payload });
	actionCreator.type = type;
	return actionCreator;
}
