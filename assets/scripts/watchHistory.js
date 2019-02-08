/*************************WATCH HISTORY**************************** */
const watchHistory = {
	render() {
		closeDrawerMenu();
		$('#watch-list').html('');
		$('#watch-list').append(
			watchHistory.getCurrentListStatsHTML(),
			watchHistory.historyCard('movie'),
			watchHistory.historyCard('tv')
		);
	},
	getCurrentListStatsHTML: () => {
		let noOfMovies = 0;
		let noOfTV = 0;
		let genres = {};
		watchList.contents.forEach(element => {
			if (element.type == 'movie') {
				noOfMovies += 1;
			} else {
				noOfTV += 1;
			}
			element.genre.forEach(item => {
				if (!genres[item.name]) {
					genres[item.name] = [element];
				} else {
					genres[item.name].push(element);
				}
			});
		});

		let htmlOutput = $(`<article class="card info-card p-3">
                            <header class="mb-2">
                            <h3 class="heading">Current List</h3>
                            </header>
                            <hr>
                            <main>
                            <div class="row mx-0 "><p>You have <strong>${noOfMovies +
								noOfTV}</strong> items in your list</P>
                            <div class= "row breakdown">
                                <div class="col-12">
                                    <p><strong>Movies:</strong><span class="ml-4">${noOfMovies}</span></p>
                                </div>
                                <div class="col-12">
                                    <p><strong>TV Shows:</strong><span class="ml-4">${noOfTV}</span></p>
                                </div>
                            </div>
                            <hr>
                            <div id="list-genres" class= "row genres">
                               <div class="col-12"><p class="heading"> Genres: </p> </div>
                            </div>
                            </main>
                            </article>
        `);
		Object.keys(genres).forEach(element => {
			let genreHeader = $(`
                <div class="col-12 mx-0">
                    <div class="col-12 genre d-flex justify-content-between my-1">
                            <p>
                                <strong>${element}</strong> : <span>${genres[element].length}</span>
                            </p>
                        <div class="btn btn-default right" type="button" data-toggle="collapse" 
                        data-target="#${element.replace(
							/[^A-Za-z0-9]+/g,
							'-'
						)}-items" aria-expanded="false" aria-controls="${element.replace(/[^A-Za-z0-9]+/g, '-')}-items">
                                <i class="fas fa-angle-right"></i>
                        </div>
                    </div>
                    <div class="collapse" id="${element.replace(/[^A-Za-z0-9]+/g, '-')}-items">
                    </div>
                </div>`).on('click', e => {
				if (
					$(e.target)
						.closest('div')
						.hasClass('right')
				) {
					$(e.target)
						.closest('div')
						.switchClass('right', 'down', 500);
				} else {
					$(e.target)
						.closest('.btn')
						.switchClass('down', 'right', 500);
				}
			});
			htmlOutput.find('#list-genres').append(genreHeader);
			genres[element].forEach(item => {
				let overviewItem = $(
					`<div class="col-12 d-flex align-items-center overview-item">
                    <div class="row px-0 mx-0 w-100 my-2">
                        <div class="col-4 px-0">
                            <img width=100% src="${item.thumb}" alt="${item.title}">
                        </div>
                        <div class="col px-0 text-center">
                            <p> <strong>${item.title}</strong></p>
                            <p> ${item.year} </p>
                        </div>
                    <div>
                </div>`
				).on('click', () => {
					makePopUp(item.type);
					$('#search-box')
						.addClass('d-none')
						.removeClass('d-flex');
					$('#results').html(item.itemPreview('recommendation'));
				});
				htmlOutput.find(`#${element.replace(/[^A-Za-z0-9]+/g, '-')}-items`).append(overviewItem);
			});
		});

		return htmlOutput;
	},
	historyCard: type => {
		let history = $(`
            <article class="card info-card p-3">
                <header class="mb-2">
                    <h3 class="heading">${capitalise(type)} History</h3>
                    <hr>
                </header>
                <section>
                    <p>You have watched <strong>${watchList.analytics[type].likes +
						watchList.analytics.movie.dislikes}</strong> movies on Watch List</p>
                    <p><strong>Likes:</strong> <span class="ml-4">${watchList.analytics[type].likes}</span></p>
                    <p><strong>Dislike:</strong> <span class="ml-4">${watchList.analytics[type].dislikes}</span></p>
                    </hr>
                </section>
            </article>
                `);
		let lastFiveTable = $(`
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Last 5 ${capitalise(type)}</th>
                    </tr>
            </thead>
            </table>
            `);
		let tableBody = $('<tbody></tbody>');
		watchList.analytics[type].lastFive.forEach(element => {
			let tableRow = $(`<tr><td>${element.title}</td></tr>`).on('click', () => {
				makePopUp();
				$('#search-box')
					.addClass('d-none')
					.removeClass('d-flex');
				$('#results').html(`
                        <div class="no-results text-center">
                            <img src="./assets/images/loading.gif" alt="loader">
                            <p>fetching preview......</p>
                        </div>`);
				let movie = tmdb.getDetails({ type: type, id: element.id });
				movie.then(movieDetails => {
					$('#results').html('');
					$('#results').html(
						tmdb[`make${capitalise(type)}Object`](movieDetails).itemPreview('recommendation')
					);
				});
			});
			tableBody.append(tableRow);
		});
		lastFiveTable.append(tableBody);
		history.append(lastFiveTable);
		return history;
	},
	tvHistory: () => {
		return `<article class="card info-card p-3">
                            <header class="mb-2">
                            <h3 class="heading">TV History</h3>
                            </header>`;
	},
};