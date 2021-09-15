function zeroPad(input) {
	if (input < 10) return "0" + input.toString();
	return input.toString();
}

function sqlDateTime(inputDate) {
	var year, month, day, hours, minutes, seconds, ms;
	year = inputDate.getUTCFullYear();
	month = inputDate.getUTCMonth() + 1;
	day = inputDate.getUTCDate(); 
	hours = inputDate.getUTCHours();
 	minutes = inputDate.getUTCMinutes();
	seconds = inputDate.getUTCSeconds();
	ms = inputDate.getUTCMilliseconds();

	var dateString = year.toString() + "-" + zeroPad(month)+ "-" + zeroPad(day) + " " + zeroPad(hours) + ":" + zeroPad(minutes) + ":" + zeroPad(seconds) + "." + ms;
	return dateString;
}

	
module.exports.sqlDateTime = sqlDateTime;