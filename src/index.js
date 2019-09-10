import FormatInput from './components/formatInput.vue';
import 'core-js/fn/set'; // vue-runtime-helpers has es6 features `Set` in dist code

let installed = false;

export default function install(Vue, options) {
	if (installed) {
		return;
	}
	installed = true;

	Vue.component('FormatInput', FormatInput);
}