/********************UTILITIES**********************/
/*exported randomIndex*/
/*eslint no-unused-vars: "error"*/
const randomIndex = upperBound => {
	return Math.floor(Math.random() * Math.floor(upperBound));
};

const capitalise = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const numberString = number => {
	if (number < 10 && number > 0) {
		return `0${number}`;
	} else {
		return number;
	}
};

const tmdbDateFix = dateString => {
	let dateArray = dateString.split('-');
	return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
};
