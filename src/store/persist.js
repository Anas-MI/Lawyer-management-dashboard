import {get} from 'lodash'

export function getPersistedState(path) {
	try {
		const serializedState = localStorage.getItem(`Case.${path}`);
		return serializedState === null ? undefined : JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
}

export function persist(state, path) {
	try {
		const value = get(state, path);
		const serializedState = JSON.stringify(value);
		localStorage.setItem(`Case.${path}`, serializedState);
	} catch {
		// ignore write errors
	}
}
