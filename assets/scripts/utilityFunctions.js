/********************UTILITIES**********************/
/*exported randomIndex*/
/*eslint no-unused-vars: "error"*/
const randomIndex = upperBound => {
	if (typeof(upperBound) != "number"){
		return 0;
	}
	else{
		return Math.floor(Math.random() * Math.floor(upperBound));
	}
	
};

const capitalise = string => {
	if (typeof (string) != "string") {
		return "";
	}
	else{
		if (string.length == 1) {
			return string.charAt(0).toUpperCase();
		}
		else if (string.length == 0){
			return ""
		}
		else{
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		
	}
	
};

const numberString = number => {
	if (number < 10 && number > 0) {
		return `0${number}`;
	} else {
		return `${number}`;
	}
};

const tmdbDateFix = dateString => {
	if (dateString){
		let dateArray = dateString.split('-');
		return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
	}else{
		return ''
	}
	
};
