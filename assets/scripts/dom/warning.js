//render a yellow alert display that renders on top of all content.
//Takes an HTML string as a parameter and renders that string in the warning.
//if the warning html string contains a span element, a countdown timer will be rendered in the span.
function showWarning(warningHTML) {
	$('#maxReq-Waring').html(warningHTML);

	$('#maxReq-Waring').removeClass('d-none');
	let refresh = 8;
	$('#maxReq-Waring span').html(refresh);
	let countdown = setInterval(() => {
		refresh--;
		$('#maxReq-Waring span').html(refresh);
		if (refresh == 0) {
			clearInterval(countdown);
			$('#maxReq-Waring').addClass('d-none');
		}
	}, 1000);
}


