/*********************************SEARCH*************************************/

//Code for rendering search results in the app

let searches = {
	//paginate movies
	movie: (terms, page) => {
		let searchPage = Math.ceil(page / 2);
		tmdb.getObjects({ type: 'movie', terms: terms, page: searchPage, listType: 'search' }, movies => {
			if (page % 2 != 0) {
				movies = movies.slice(0, 9);
			} else {
				movies = movies.slice(10, 19);
			}
			$(`#results`).html('');
			if (movies.length == 0) {
				$(`#results`).append(`<p>no results found please change your search criteria</p>`);
			} else {
				let resultsContainer = $(`<div></div>`);
				movies.forEach(element => {
					resultsContainer.append(element.searchItem());
				});
				$(`#results`).append(resultsContainer);
				$(`#results`).append(paginationControls(page, terms, 'movie'));
			}
		});
		$(`#results`).html(`
            <div class="no-results text-center">
            <img src="./assets/images/loading.gif" alt="loader">
            <p>searching movies....</p>
            </div>`);
	},

	tv: (terms, page) => {
		$(`#results`).html(`
            <div class="no-results text-center">
            <img src="./assets/images/loading.gif" alt="loader">
            <p>searching......</p>
            </div>`);
		let searchPage = Math.ceil(page / 2);
		tmdb.getObjects({ type: 'tv', terms: terms, page: searchPage, listType: 'search' }, shows => {
			if (page % 2 != 0) {
				shows = shows.slice(0, 9);
			} else {
				shows = shows.slice(10, 19);
			}
			$(`#results`).html('');
			if (shows.length == 0) {
				$(`#results`).append(`<p>no results found please change your search criteria</p>`);
			} else {
				let resultsContainer = $(`<div></div>`);
				shows.forEach(element => {
					resultsContainer.append(element.searchItem());
				});
				$(`#results`).append(resultsContainer);
				$(`#results`).append(paginationControls(page, terms, 'tv'));
			}
		});
	},
	person: (terms, page) => {
		$(`#results`).html(`
            <div class="no-results text-center">
            <img src="./assets/images/loading.gif" alt="loader">
            <p>searching......</p>
            </div>`);
		let searchPage = Math.ceil(page / 2);
		tmdb.getSearchResults({ type: 'person', terms: terms, page: searchPage, listType: 'search' }).then(person => {
			person = person.results;
			if (page % 2 != 0) {
				person = person.slice(0, 9);
			} else {
				person = person.slice(10, 19);
			}
			$(`#results`).html('');
			if (person.length == 0) {
				$(`#results`).append(`<p>no results found please change your search criteria</p>`);
			} else {
				let resultsContainer = $(`<div></div>`);
				person.forEach(element => {
					let searchItem = searches
						.personSearchItem({ name: element.name, id: element.id, profile_path: element.profile_path })
						.on('click', () => {
							searches.actorMovies({ id: element.id, name: element.name, page: 1 });
						});
					resultsContainer.append(searchItem);
				});
				$(`#results`).append(resultsContainer);
				$(`#results`).append(paginationControls(page, terms, 'person'));
			}
		});
	},

	actorMovies: object => {
		$(`#results`).html('');
		$(`#results`).html(`
                    <div class="no-results text-center">
                        <img src="./assets/images/loading.gif" alt="loader">
                        <p>searching......</p>
                    </div>`);
		let resultsContainer = $(`<div></div>`);
		$('#search-box input[type=text]').val(object.name);
		tmdb.getObjects(
			{
				listType: 'recommendations',
				recType: `movie actor`,
				id: object.id,
				type: 'movie',
				page: object.page,
			},
			movies => {
				$(`#results`).html('');
				$('#results').attr('data-actorid', object.id);
				movies.forEach(movie => {
					resultsContainer.append(movie.searchItem(true));
				});
				$(`#results`).append(resultsContainer);
				$(`#results`).append(paginationControls(1, { id: object.id, name: object.name }, 'actor-movies'));
			}
		);
	},

	personSearchItem: object => {
		let actorpic = `https://image.tmdb.org/t/p/w185${object.profile_path}`;
		if (!object.profile_path) {
			actorpic = `./assets/images/no-profile.jpeg`;
		}
		let wrapper = $(`<div class="result row pt-2 mx-0 "></div>`);
		let imgWrapper = $(`<div class="col-3 col-offset-2 "></div>`);
		let textWrapper = $(`<div class="col-7 mt-3"></div>`);
		imgWrapper.append(`<img src=${actorpic} class="result-thumb mx-auto d-block" alt=${object.name} />`);
		textWrapper.append(`<h6 class="result-title"><strong class="heading">${object.name}</strong></h6>`);
		wrapper.append(imgWrapper, textWrapper);
		return wrapper;
	},
};

function paginationControls(page, terms, type) {
	let incr = 1;
	let pageButtons = $(`<div class="d-flex justify-content-around mt-2"></div>`);
	let back = $(`<div class="result-btn">prev</div>`).on('click', () => {
		let newPage = (p => {
			return p - incr;
		})(page);
		$('#results').attr('data-page', newPage);
		if (newPage > 0) {
			if (type == 'actor-movies') {
				searches.actorMovies({ id: terms.id, name: terms.name, page: newPage });
			} else {
				searches[type](terms, newPage);
			}
		}
	});
	let next = $(`<div class="result-btn">next</div>`).on('click', () => {
		let newPage = (p => {
			return p + incr;
		})(page);
		$('#results').attr('data-page', newPage);
		if (type == 'actor-movies') {
			searches.actorMovies({ id: terms.id, name: terms.name, page: newPage });
		} else {
			searches[type](terms, newPage);
		}
	});
	pageButtons.append(back, next);
	return pageButtons;
}
