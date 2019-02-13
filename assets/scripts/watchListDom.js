/********************WATCH LIST DOM*******************/
const watchListDom = {
	load: () => {
		watchList.load();
		watchListDom.renderDataLists();
		watchListDom.render(watchList.contents);
		watchListDom.renderTags();
	},
	add: (obj, render = true) => {
		let added = watchList.add(obj);
		if (added) {
			if (render) {
				watchListDom.render(watchList.contents);
			}
		} else {
			showWarning(`item is already in watchlist did not add. click to close`);
		}
	},
	remove: id => {
		watchList.remove(id);
		watchListDom.render(watchList.contents);
	},
	filter: (filterBy, value) => {
		let icons = {
			movie: `<i class="fas fa-film"></i>`,
			tv: `<i class="fas fa-tv"></i>`,
		};
		let filterList = watchList.filter(filterBy, value);

		if (filterList.length == 0) {
			let htmlString = '';
			if (filterBy == 'type') {
				let stringFix = '';
				switch (value) {
					case 'movie':
						stringFix = `${capitalise(value)}s`;
						break;
					case 'tv':
						stringFix = 'Tv Shows';
						break;
				}
				$('#view-title').html(`<h6>${stringFix}</h6>`);
				htmlString = `<div class="no-results text-center">
                <h1>${icons[value]}</h1>
                <h5>Currently you have no ${stringFix} in your list</h5>
                <p>Click the add button to the right to start adding some ${value}s</p>
                </div>`;
			} else {
				htmlString = `
                <div class="no-results text-center">
                <h5>Tags: ${value}, no longer has any contents</h5>
                </div>`;
			}
			$('#watch-list').html(htmlString);
		} else {
			watchListDom.render(filterList);
		}
	},
	addTag: (name, id) => {
		watchList.addTag(name, id);
		watchListDom.renderTags();
		watchList.updateLocalStorage();
	},
	removeTag: key => {
		watchList.removeTag(key);
		watchListDom.renderTags();
		watchList.updateLocalStorage();
	},
	render: (list, isRecommendation = false) => {
		if (list.length >= 1) {
			let index = 0;
			$('#watch-list').html('');
			list.forEach(element => {
				element.id = 'card-' + index;
				$('#watch-list').append(element.card(isRecommendation));
				element.updateCardTags();
				index++;
			});
		} else {
			$('#watch-list').html(
				`<div class="no-results text-center">
                <h1><i class="fas fa-asterisk"></i></h1>
                <h5>Currently you have no items in your list</h5>
                <p>Click the add button to the right to start adding movies, 
                tv shows and games to your to watch list</p> 
                </div>`
			);
		}
		watchListDom.renderTags();
	},
	renderTags: () => {
		$('#category-list').html('');
		if (Object.keys(watchList.tags).length != 0) {
			Object.entries(watchList.tags).forEach(element => {
				let tagsItem = $(`<li>${element[0]}</li>`).on('click', () => {
					performFilter('tags', element[0]);
				});
				$('#category-list').append(tagsItem);
			});
		}
		let addNew = $("<li class='add-new'>Add or Edit Tags</li>");
		addNew.on('click', () => {
			makePopUp('manageFilters');
		});
		$('#category-list').append(addNew);
		watchList.contents.forEach(element => {
			element.updateCardTags();
		});
	},
	renderDataLists: () => {
		$('#movie-genres-list').html('');
		$('#tv-genres-list').html('');
		$('#tags-list-list').html('');
		watchList.details.movieGenres.forEach(element => {
			$('#movie-genres-list').append(`<option value="${element.id}">${element.name}</option>`);
		});
		watchList.details.tvGenres.forEach(element => {
			$('#tv-genres-list').append(`
            <option value="${element.id}">${element.name}</option>`);
		});
		Object.keys(watchList.tags).forEach(element => {
			$('#tags-list').append(`
            <option value="${element}"></option>
            `);
		});
	},
	resetAll: () => {
		watchList.resetAll();
		watchListDom.render(watchList.contents);
		watchListDom.renderTags();
	},
};

//run the app
watchListDom.load();
watchListDom.render(watchList.contents);
if (!watchList.returningUser) {
	makePopUp('help');
}