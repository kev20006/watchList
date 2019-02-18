/****************************DRAWER MENU********************************/
//animates the drawer menu handles drawer menu events
/*******************************************max length in git hub*********************************************************************/
let menuActive = false;

$(document).on('click', e => {
	if ($(e.target).attr('id') == 'toggle-menu') {
		if (!menuActive) {
			menuActive = true;
			$('#menu').animate(
				{
					left: '+=240',
				},
				500
			);
		} else {
			menuActive = false;
			closeDrawerMenu();
		}
	} else if (menuActive) {
		if (e.target.closest('aside') == null) {
			closeDrawerMenu();
		}
	}
});

function performFilter(filterBy, value) {
	if (value == 'all') {
		$('#view-title').html(`<h6>All Items</h6>`);
		watchListDom.render(watchList.contents);
	} else {
		watchListDom.filter(filterBy, value);
	}
	menuActive = false;
	closeDrawerMenu();
}

$('#category-list .add-new').on('click', () => {
	makePopUp('manageFilters');
});

$('#tv-by-genre').on('click', () => {
	$('#tv-genre-search').slideToggle('slow');
	$('#tv-genre-search')
		.siblings('p')
		.slideUp();
});

$('#movie-by-genre').on('click', () => {
	$('#movie-genre-search').slideToggle('slow');
	$('#movie-genre-search')
		.siblings('p')
		.slideUp();
});

$('#movie-genres-list').on('change', () => {
	recommendations.recommendationsList({
		id: $('#movie-genres-list').val(),
		type: 'movie',
		recType: 'movie genre',
		page: 1,
	});
});

$('#tv-genres-list').on('change', () => {
	recommendations.recommendationsList({ id: $('#tv-genres-list').val(), type: 'tv', recType: 'tv genre', page: 1 });
});

function closeDrawerMenu() {
	menuActive = false;
	$('#menu').animate(
		{
			left: '-=240',
		},
		500
	);
}

