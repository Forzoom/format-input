import FormatInput from './components/formatInput.vue';

let installed = false;

export default function install(Vue, options) {
	if (installed) {
		return;
	}
	installed = true;

	Vue.use('FormatInput', FormatInput);
}