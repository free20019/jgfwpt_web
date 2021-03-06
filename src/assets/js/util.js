import moment from 'moment'

export function formatCustomizeDate(date, format) {
	return moment(date).format(format);
}
export function formatDate(date) {
	return moment(date).format('YYYY-MM-DD');
}
export function formatDateTime(date) {
	return moment(date).format('YYYY-MM-DD HH-mm-ss');
}
export function formatMonth(date) {
	return moment(date).format('YYYY-MM');
}
export function formatYear(date) {
	return moment(date).format('YYYY');
}