/****************************************WATCHLIST******************************/
//This file creates loads and manages all the watchlist data
//including analytical data, the current watch lists, tags assigned to each movie.

const watchList = {
	/** Initialise for first use **/
	details: {
		tvGenres: [],
		movieGenres: [],
	},
	analytics: {
		movie: {
			likes: 0,
			dislikes: 0,
			genres: {},
			lastFive: [],
		},
		tv: {
			likes: 0,
			dislikes: 0,
			genres: {},
			lastFive: [],
		},
	},
	contents: [],
	tags: {},
	returningUser: false,
	/** Load Data From Local Storage**/
	load: () => {
		if (window.localStorage.getItem('watchListData')) {
			let prevData = JSON.parse(window.localStorage.getItem('watchListData'));
			if (prevData.list.contents) {
				prevData.list.contents.forEach(item => {
					switch (item.type) {
						case 'movie':
							watchList.add(
								new movie({
									dbid: item.dbid,
									title: item.title,
									thumb: item.thumb,
									lrgImage: item.lrgImage,
									longDescription: item.longDescription,
									year: item.year,
									genre: item.genre,
									note: item.note,
									director: item.director,
									rating: item.rating,
									cast: item.cast,
								})
							);
							break;
						case 'tv':
							watchList.add(
								new tv({
									dbid: item.dbid,
									title: item.title,
									thumb: item.thumb,
									lrgImage: item.lrgImage,
									longDescription: item.longDescription,
									year: item.year,
									genre: item.genre,
									note: item.note,
									rating: item.rating,
									cast: item.cast,
									lastEpisode: item.lastEpisode,
									nextEpisode: item.nextEpisode,
									seasons: item.seasons,
									epTracker: item.epTracker,
								})
							);
							break;
					}
				});
			}
			if (prevData.list.tags) {
				watchList.tags = prevData.list.tags;
			}
			// Garbage collection - remove any tags that no longer have any movies
			Object.keys(watchList.tags).forEach( key => {
				watchList.tags[key].length == 0 && delete watchList.tags[key]
			})

			if (prevData.list.analytics) {
				if (prevData.list.analytics.movie) {
					watchList.analytics.movie = prevData.list.analytics.movie;
				}
				if (prevData.list.analytics.tv) {
					watchList.analytics.tv = prevData.list.analytics.tv;
				}
			}
			if (prevData.list.details.movieGenres.length > 1 && prevData.list.details.tvGenres.length > 1) {
				watchList.details.movieGenres = prevData.list.details.movieGenres;
				watchList.details.tvGenres = prevData.list.details.tvGenres;
			} else {
				let movieGenresPromise = tmdb.getGenres('movie');
				let tvGenresPromise = tmdb.getGenres('tv');
				Promise.all([movieGenresPromise, tvGenresPromise]).then((data) => {
					watchList.details.movieGenres = data[0].genres;
					watchList.details.tvGenres = data[1].genres;
					watchListDom.renderDataLists();
				});
			}

			if (prevData.list.returningUser) {
				watchList.returningUser = prevData.list.returningUser;
			}
			watchList.updateLocalStorage();
		}
	},

	//add an item to the watch-list
	add: obj => {
		let matchFound = false;
		watchList.contents.forEach(item => {
			if (item.dbid == obj.dbid) {
				matchFound = true;
			}
		});
		if (matchFound) {
			return false;
		} else {
			watchList.contents.push(obj);
			watchList.updateLocalStorage();
			return true;
		}
	},

	//remove an item from the watchlist
	remove: id => {
		if (id >= 0 && id < watchList.contents.length){
			watchList.contents.splice(id, 1);
			watchList.updateLocalStorage();
		}
	},

	//filter the watchlist - by wither type or by tags
	//fitlerBy parameter store the type of filter, either type or tags
	//value parameter stores what to filter by i.e. "movies", "tv" or the name of
	//a specific tag
	filter: (filterBy, value) => {
		let filterList = {};
		if (filterBy == 'type') {
			filterList = watchList.contents.filter(element => {
				return element[filterBy] == value;
			});
		} else {
			filterList = watchList.contents.filter(element => {
				if (watchList.tags[value].includes(element.dbid)) return true;
			});
		}
		return filterList;
	},
	addTag: (name, id = undefined) => {
		if (!Object.keys(watchList.tags).includes(name)) {
			if (id == undefined) {
				watchList.tags[name] = [];
			} else {
				watchList.tags[name] = [id];
			}
		} else {
			watchList.tags[name].push(id);
		}
	},
	removeTag: key => {
		delete watchList.tags[key];
	},

	addLike: (object) => {
		watchList.analytics[object.type].likes++;
		if (object.genre && object.genre.length >= 1){
			object.genre.forEach(element => {
				if (watchList.analytics[object.type].genres[element.name]) {
					watchList.analytics[object.type].genres[element.name] += 1;
				} else {
					watchList.analytics[object.type].genres[element.name] = 1;
				}
			});

		}

		if (watchList.analytics[object.type].lastFive.length >= 5) {
			watchList.analytics[object.type].lastFive = watchList.analytics[object.type].lastFive.slice(-4);
		}
		watchList.analytics[object.type].lastFive.push({
			id: object.dbid,
			title: object.title,
		});
		watchList.remove(object.id.split('-')[1]);
		watchList.updateLocalStorage();
	},
	addDislike: (object) => {
		watchList.analytics[object.type].dislikes++;
		watchList.remove(object.id.split('-')[1]);
		watchList.updateLocalStorage();
	},
	updateLocalStorage: () => {
		window.localStorage.setItem('watchListData', JSON.stringify({ list: watchList }));
	},
	resetAll: () => {
		watchList.analytics = {
			movie: {
				likes: 0,
				dislikes: 0,
				genres: {},
				lastFive: [],
			},
			tv: {
				likes: 0,
				dislikes: 0,
				genres: {},
				lastFive: [],
			},
			game: {
				likes: 0,
				dislikes: 0,
				genres: {},
				lastFive: [],
			},
			book: {
				likes: 0,
				dislikes: 0,
				genres: {},
				lastFive: [],
			},
		};
		watchList.details.movieGenres = [];
		watchList.details.tvGenres = [];
		watchList.contents = [];
		watchList.tags = {};
		watchList.returningUser = false;
		watchList.updateLocalStorage();
	},
};
