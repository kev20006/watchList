/********************UTILITIES**********************/


/* Used to randomly select items from an array */
const randomIndex = upperBound => {
	if (typeof(upperBound) != "number"){
		return 0;
	}
	else{
		return Math.floor(Math.random() * Math.floor(upperBound));
	}
	
};


/* Used to convert a string to initial caps */
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

/* Used to add leading 0's to single digit numbers */
const numberString = number => {
	if (number < 10 && number > 0) {
		return `0${number}`;
	} else {
		return `${number}`;
	}
};


/*TMDB stores dates in the format yyyy-mm-dd - function to convert them to the 
format dd/mm/yyyy */
const tmdbDateFix = dateString => {
	if (dateString){
		let dateArray = dateString.split('-');
		return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
	}else{
		return ''
	}
	
};
