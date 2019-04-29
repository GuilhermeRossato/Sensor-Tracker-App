/* eslint no-unused-vars: off */

/**
 * Formats a date object into a string with format "yyyy-mm-dd dd:hh:ss"
 *
 * @param  {Date} m   The date object
 * @return {string}   The formatted string
 */
function formatDateString(m) {
	if (!m) {
		return "Invalid Date";
	}
	return (
		("0" + (m.getDate()+1)).slice(-2) + "/" +
        ("0" + m.getMonth()).slice(-2) + "/" +
        m.getFullYear() + " " +
        ("0" + m.getHours()).slice(-2) + ":" +
        ("0" + m.getMinutes()).slice(-2) + ":" +
        ("0" + m.getSeconds()).slice(-2)
	);
}
