/************Classes*************/

//Movie, TV, Game and Book Classes are defined in this file.
//Each class contains methods to generate the HTML for the cards, item previews and search results

class watchItem {
	/*
    Watch Item is the base class that goes on to form the movie and TV Objects
    Watch Item has a constructor method for adding common information to the item
    It also has methods to generate the HTML for the cards, search results and previews
    */
	constructor(object) {
		this.icon = object.icon;
		this.dbid = object.dbid;
		this.type = object.type;
		this.title = object.title;
		this.thumb = object.thumb;
		this.lrgImage = object.lrgImage;
		if (object.longDescription == undefined) {
			this.longDescription = 'no description given';
			this.shortDescription = 'no description given';
		} else {
			this.longDescription = object.longDescription;
			if (object.longDescription.length <= 200) {
				this.shortDescription = object.longDescription;
			} else {
				this.shortDescription = `${object.longDescription.substring(0, 200)}...`;
			}
		}
		this.year = object.year;
		this.genre = object.genre;
		this.note = object.note;
		this.searchItem = this.searchItem.bind(this);
		this.itemPreview = this.itemPreview.bind(this);
		this.updateTags = this.updateTags.bind(this);
		this.updateCardTags = this.updateCardTags.bind(this);
	}

	searchItem(actorSearch) {
		//search item generates the html that is displayed when the user searches for TV or a Movie
		//it takes in a state parameter called actor search, to record where the search result was generated from
		// if actor search is true, it will pass a different location to the item preview method, to allow the back 
		//button to work correctly

		let wrapper = $(`<div class="result row pt-2 mx-0"></div>`);
		let imgWrapper = $(`<div class="col-3 col-offset-2 "></div>`);
		let textWrapper = $(`<div class="col-7"></div>`);
		let genreHtml = $(`<p class="my-0 d-flex flex-wrap"></p>`);
		this.genre.forEach(element => {
			genreHtml.append(`<span class="mr-2 mb-1 collection-tag">${element.name}</span>`);
		});

		imgWrapper.append(
			`<img src=${this.thumb} class="result-thumb mx-auto d-block" alt=${this.title.substring(0, 50)} />`
		);
		textWrapper.append(
			`<h6 class="result-title"><strong class="heading">${this.title.substring(0, 40)}</strong> - ${
				this.year
			}</h6>`,
			genreHtml
		);
		wrapper.on('click', () => {
			let location = "search";
			if (actorSearch){
				location = "actorSearch"
			}
			buttonControls.preview(this, location)
			
		});
		let buttonWrapper = $('<div class="col-2 px-0"></div>');
		let addButton = $(`<div class="add d-flex justify-content-center align-items-center mr-2"> 
                            <i class="fas fa-plus my-0"></i>
							</div>`)
			.on('click', () => {
				buttonControls.add(this, "search");
			});
		buttonWrapper.append(addButton);
		wrapper.append(imgWrapper, textWrapper, buttonWrapper);
		return wrapper;
	}

	itemPreview(location) {
		/* item preview generates the HTML that is displayed when a user clicks the more information button on a card
        or on a search result, and displays full information on a movie card.
    
        The parameter location is used to determine what controls appear on the card.
        if the preview location is a recommendation, search result, it is not already in the list and therefore should
        display controls to add it to the list or to return to the previous location
    
		If the location is a card in the users list controls are displayed to like, dislike or delete the movie from 
		the list
    
		this location parameter also determines the functionality of the back button: for search results the back button
		returns to the search and for list items the back button just closes the popup and returns to the list
        */


		let wrapper = $(`<div class="row mx-0 preview"></div>`);
		let previewHeader = $(`<header class="col-12 prev-head"></header>`);
		let titleContainer = $(`<div class="row mx-0 p-2"></div>`);
		
		//create the header content
		
		let titleContent = $(
			`<h3>${this.icon}<strong class="mx-2 heading">${this.title}</strong> <small class="ml-3">(${
				this.year
			})</small></h3>`
		);
		let genreContainer = $(`<div class="genres row mx-0 p-2 mb-0"></div>`);
		genreContainer.append(`<div class="d-inline-block"><strong>Genres:</strong></div>`);
		this.genre.forEach(element => {
			genreContainer.append(`<div class="ml-2 d-inline-block">${element.name}</div>`);
		});
		titleContainer.append(titleContent);
		previewHeader.append(titleContainer, genreContainer);
		wrapper.append(previewHeader, $(`<hr>`));

		//start creating the body element
		
		let previewBody = $(`<main class="col-12 mx-0"></main>`);
		let imageRow = $(`<div class="row"></div>`)
		let imageWrapper = $(`<div class="col-12 col-sm-4 d-flex justify-content-center img-wrapper"></div>`);
		imageWrapper.append(` <img class="p-2 pl-2" src=${this.lrgImage} alt=${this.title} />`);
		imageRow.append(imageWrapper);
		let previewMainContentContainer = $(`<div class="content col-12 col-sm-8"></div>`);
		
		//adding controls and their event listeners
		
		let controlsContainer = $(`<div class="controls d-flex justify-content-around align-items-center"></div>`)
			.append(`<div class="rating">
                    <div class= "d-flex flex-column">
                    <div><strong>rating</strong></div>
                    <div><strong class="heading">${this.rating}%</strong></div>
                    </div>
                    </div>`);
		let addBtn = $(
			`<div class="d-flex justify-content-center align-items-center btn-add-to-list btn-default">
				<i class="fas fa-plus my-0"></i>
			</div>`
		).on('click', () => {
			buttonControls.add(this, "preview");
		});
		let likeBtn = $(
			`<div class="d-flex justify-content-center align-items-center btn-thumbs-up btn-success">
				<i class="fas fa-thumbs-up"></i>
			</div>`
		).on('click', () => {
			buttonControls.like(this, "preview");
		});
		let dislikeBtn = $(
			`<div class="d-flex justify-content-center align-items-center btn-thumbs-down btn-danger">
				<i class="fas fa-thumbs-down"></i>
			</div>`
		).on('click', () => {
			buttonControls.dislike(this, "preview");
		});
		let deleteBtn = $(
			`<div class="d-flex justify-content-center align-items-center btn-delete btn-default">
				<i class="fas fa-trash-alt"></i>
			</div>`
		).on('click', () => {
			buttonControls.delete(this, "preview");
		});
		let backbutton = `<i class="fas fa-times"></i>`;
		let backBtn = $(
			`<div class="d-flex justify-content-center align-items-center btn-back btn-default">${backbutton}</div>`
		).on('click', () => {
			buttonControls.back(this, location)
		});

		//conditionally create the controls

		if (location == 'search' || location == 'recommendation' || location == 'actorSearch') {
			controlsContainer.append(addBtn, backBtn);
		} else {
			controlsContainer.append(likeBtn, dislikeBtn, deleteBtn, backBtn);
		}

		let previewDescription = $(`
            <p><strong class="heading">Description:</strong></p>
			<div id="desc-box">
				<p>${this.longDescription}</p>
			</div>
			`);

		previewMainContentContainer.append(controlsContainer, previewDescription);
		imageRow.append(previewMainContentContainer)
		//empty div for adding movie or tv info
		
		let additionalInfo = $(`<section class="col-12 additional-info">`);
		previewBody.append(imageRow, additionalInfo);
		
		// populate dropdown box with tags
		let options = $(`<datalist id="tags-list"></datalist>`)
		Object.keys(watchList.tags).forEach(element =>{
			options.append(`<option value="${element}"></option>`)
		})
		// start of the tags and notes section 
		let collectionSpan = $(`<span class="ml-2 collection-tag"></span>`)
			.append(`<input class="add-tag" list="tags-list" placeholder="add new"></input>`, options)
		let tagsContainer = $(`<div class=" d-flex flex-wrap preview-tags"></div>`)
			.on('keydown', 'input', e => {
				if ($('.add-tag').val().length >= 10) {
					$('.add-tag').css('width', `${120 + ($('.add-tag').val().length - 9) * 9}px`);
				}
				if (e.keyCode == 13) {
					if ($('.add-tag').val().length >= 1){
						watchListDom.addTag($('.add-tag').val(), this.dbid);
						let newInput = $(
							`<input list="tags-list" placeholder="add new"></input>
							<datalist id="tags-list"></datalist>`
						).addClass('add-tag');
						let newSpan = $(`<span class="collection-tag"></span>`).append(newInput);
						$('.preview-tags')
							.html('')
							.append(newSpan)
							.append(this.updateTags());
						this.updateCardTags();
						watchListDom.renderDataLists();
						watchList.updateLocalStorage();
					}
					else {
						$(".add-tag").effect("shake");
					}		
				}
			})
			.focusin(() => {
				$('.help').toggleClass('d-none');
			})
			.focusout(() => {
				$('.help').toggleClass('d-none');
			})
			.append(
				collectionSpan,                           
				this.updateTags()
			);
		
		let noteArea = $(
			`<textarea id="notes" class="notes-area" placeholder="Any Additional notes about this ${
				this.type
			}" rows="5">${this.note}</textarea>`
		).on('input', e => {
			this.note = $(e.target).val();
			watchList.updateLocalStorage();
		});
		let quickAdd = $(`<div class="btn btn-default text-center my-2 w-100"></div>`)
		if (location == 'search' || location == 'recommendation' || location == 'actorSearch') {
			quickAdd.html("Add Item To List")
			quickAdd.on("click", ()=> {
				buttonControls.add(this, "preview");
			})
		}
		else {
			quickAdd.html("Update Note")
			quickAdd.on("click", ()=> {
				closePopUp();
			})
		}
		let tagsAndComments = $(`<section class="col-12"></section>`).append(
			`<hr><p><strong class="heading">Tags</strong></p>`,
			tagsContainer,
			`<p class="d-none help"><small>press enter to add your new tag</small></p>`,
			noteArea,
			quickAdd
		);


		wrapper.append(previewBody, tagsAndComments);
		wrapper.append('<hr>');
		let castSection = $('<section></section>').append(
			`<div class="row mx-0 px-1"><p><strong>Top Billed Cast</strong></div>`
		);
		let castContainer = $(`<div class="row mx-0 px-1"></div>`);
		if (this.cast) {
			this.cast.forEach(element => {
				let actorpic = 'https://image.tmdb.org/t/p/w185';
				if (element.profile_path) {
					actorpic += element.profile_path;
				} 
				else {
					actorpic = './assets/images/no-profile.jpeg';
				}
				castContainer.append(
					$(
						`<div class="col-6 col-md-3 actor-thumb">
                			<div class="img-container">
                    			<img src="${actorpic}" alt="${element.name}">
                			</div>
                			<p class="text-center"><small>${element.name}</small></p>
            			</div>`
					)
				);
			});
		} 
		else {
			castContainer.append(`<p>No Cast Identified</p>`);
		}
		castSection.append(castContainer);
		wrapper.append(castSection);
		return wrapper;
	}

	card(recommendation) {
		/*
        Card generates the HTML Movie cards that are displayed in the watchlist, or when the user creates lists of recommendations.
    
        The parameter recommendation records true if the card is generated by a recommendation, and false if not.
    
        If the card is a recommendation it shows controls to add the object to the list, if it is false it provides controls to like, dislike or delete the item
    
        The parameter recommendation records true if the card is generated by a recommendation, and false if not.
        */
		let newCard = $(`<article id=${this.id} class="card"></article>`);
		let cardInner = $(`<div class="card-inner"></div>`);
		let cardImage = $(`<div class="card-bg"></div>`);
		cardImage.css('background-image', `url("${this.lrgImage}")`);
		cardInner.append(cardImage);
		let cardInfo = $(`<div class="card-info p-2"></div>`);
		let cardHeader = $(`<header class="card-head"></header>`);
		let cardTitle = $(
			`<div class="row mx-0"><h5 class="text-left">${this.icon}<span class="heading mx-2">${
				this.title
			}</span><span class="year"> - ${this.year} </span></h5></div>`
		);
		cardHeader.append(cardTitle);
		let shortDescription = $(`
                                    <p><strong class="heading">Description</strong></p>
                                    <p><small>${this.shortDescription}</small></p>
                                    <hr>
                                `);
		let tagsSubHeading = $(`<p><strong class="heading">Tags:</strong></p>`);
		let tagsArea = $(`<div id="collections-${this.id}" class="d-flex flex-wrap"></div>`);
		let findOutMore = $(`<div class="btn btn-more-info text-center mt-2">more info</div>`);

		findOutMore.on('click', e => {
			buttonControls.preview(this, "card");
		});

		//if a card is not a recommendation it is in the list - meaning it needs like dislike and delete controls
		if (!recommendation) {
			let buttonWrapper = $('<div class="d-flex justify-content-around"></div>');
			let deleteButton = $(
				`<div class="d-flex justify-content-center align-items-center btn-actions btn-default">
					<i class="fas fa-trash-alt"></i>
				</div>`
			);
			let thumbUpButton = $(
				`<div class="d-flex justify-content-center align-items-center btn-actions btn-success">
					<i class="fas fa-thumbs-up"></i>
				</div>`
			).on('click', () => {
				buttonControls.like(this)
			});
			let thumbDownButton = $(
				`<div class="d-flex justify-content-center align-items-center btn-actions btn-danger">
					<i class="fas fa-thumbs-down"></i>
				</div>`
			).on('click', () => {
				buttonControls.dislike(this)
			});
			deleteButton.on('click', () => {
				buttonControls.delete(this)
			});
			buttonWrapper.append(thumbUpButton, deleteButton, thumbDownButton);
			cardInfo.append(
				cardHeader,
				shortDescription,
				tagsSubHeading,
				tagsArea,
				findOutMore,
				buttonWrapper
			);
		//if it is a recommendation it only needs an additional like button
		} else {
			let quickAdd = $(`<div class="btn btn-more-info text-center mt-3">add to list</div>`);
			quickAdd.on('click', () => {
				
				buttonControls.add(this, recommendation)
			});
			cardInfo.append(cardHeader, shortDescription, findOutMore, quickAdd);
		}
		cardInner.append(cardInfo);
		newCard.append(cardInner);
		return newCard;
	}

	//methods updates tags and builds a new html string of tags.
	updateTags() {
		let htmlString = '';
		Object.entries(watchList.tags).forEach(element => {
			if (element[1].includes(this.dbid)) {
				htmlString += `<span class="ml-2 collection-tag">${element[0]}</span>`;
			}
		});
		return htmlString;
	}
	//renders the tags to the cards
	updateCardTags() {
		let tagHTMLstring = this.updateTags();
		if (tagHTMLstring.length <= 0) {
			tagHTMLstring = `<span class="collection-tag mr-1 mb-1">no collections</span>`;
		}
		$(`#collections-${this.id}`).html(tagHTMLstring);
	}
}

//movie subclass stores the additional information to populate the movie preview items
class movie extends watchItem {
	constructor(object) {
		super(object);
		this.type = 'movie';
		this.icon = `<i class="fas fa-film m-1"></i>`;
		this.director = object.director;
		this.rating = object.rating;
		this.cast = object.cast;
		this.genre = object.genre;
		this.card = this.card.bind(this);
		this.getRecommendations = this.getRecommendations.bind(this);
	}

	card(location) {
		let cardContents = super.card(location);
		let director = $(
			`<div class="row mx-0"><p class="text-right"><small><strong class="mr-2">Directed By:</strong>${
				this.director
			}</p></small></div>`
		);
		cardContents.find('.card-head').append(director);
		return cardContents;
	}

	// when you like a movie item, this function randomly selects recommendations, based on the genre of the movie and 
	// one of the 4 top billed actors
	getRecommendations(location) {
		if (location == 'card') {
			makePopUp();
		}
		let randomGenre = this.genre[randomIndex(this.genre.length)];
		let randomActor = this.cast[randomIndex(this.cast.length)];
		$('#add-or-edit-container').html(
			`<div class="p-2">
				<p class="text-center">
					<strong>Because you liked ${ this.title } you might also like </strong>
				</p>
        		<p class="text-center">Because you liked ${ randomActor.name }</p>
				<div id="actor-rec" class="d-flex justify-content-center">
					<img src="./assets/images/loading.gif" alt="loader">
        		</div>
        		<p class="text-center">Because you liked a ${ randomGenre.name } movie</p>
				<div id="genre-rec" class="d-flex justify-content-center"">
					<img src="./assets/images/loading.gif" alt="loader">
        		</div>
        	</div>`
        );
		let noButton = $(`<div class="btn btn-default text-center">No Thanks</div>`);
		noButton.on('click', () => {
			closePopUp();
		});
		tmdb.getObjects(
			{
				listType: 'recommendations',
				recType: `${this.type} actor`,
				id: randomActor.id,
				type: this.type,
			},
			movie => {
				$('#actor-rec').html("")
				$('#actor-rec').append(movie[0].card('recommendation'));
			}
		);

		tmdb.getObjects(
			{ listType: 'recommendations', recType: `${this.type} genre`, id: randomGenre.id, type: this.type },
			movie => {
				$('#genre-rec').html("")
				$('#genre-rec').append(movie[0].card('recommendation'));
			}
		);
		let buttonWrapper = $(`<div class="d-flex justify-content-center mb-5"></div>`).append(noButton);

		$('#add-or-edit-container').append(buttonWrapper);
	}
}


//sub class stores further information unique to tv shows - including information about episodes.
class tv extends watchItem {
	constructor(object) {
		super(object);
		this.type = 'tv';
		this.icon = `<i class="fas fa-tv m-1"></i>`;
		this.rating = object.rating;
		this.cast = object.cast;
		this.genre = object.genre;
		this.lastEpisode = object.lastEpisode;
		this.nextEpisode = object.nextEpisode;
		this.seasons = object.seasons;
		this.epTracker = object.epTracker;
		this.searchItem = this.searchItem.bind(this);
		this.itemPreview = this.itemPreview.bind(this);
		this.card = this.card.bind(this);
		this.getRecommendations = this.getRecommendations.bind(this);
		this.updateTags = this.updateTags.bind(this);
	}


	itemPreview(location) {
		let preview = super.itemPreview(location);
		let seasonList = $(`<div id="seasons" class="d-flex flex-wrap"></div>`);
		let episodeList = $(`<div id="episodes" class="d-flex flex-wrap"></div>`);
		let sIndex = 0;
		let firstSeason = 0;
		if(this.epTracker[0].name == "Season 1"){
			 firstSeason = 1;
		}
		
		//loop through the seasons to create the season tracker
		this.epTracker.forEach(season => {
			//seasons are later identified using their id - i.e. s-1 refers to season 1
			let epButton = $(`<span id="s-${firstSeason}" class="mx-2 season-button">${season.name}</span>`)
			if (this.epTracker[sIndex].episodes.every(e =>{return e.watched})){
				epButton.addClass("watched")
			}
			//season button event handler
			epButton.on('click', e => {
					$('#episodes').html('');
					$(e.target).addClass('selected');
					$(e.target)
						.siblings()
						.removeClass('selected');
				//fix for shows with no 0 season
				let targetVal = e.target.id.split('-')[1]
				if (firstSeason != sIndex){
					targetVal -= 1
				}


				this.epTracker[targetVal].episodes.forEach(episode => {
					let state = '';
					if (episode.watched) {
						state = 'watched';
					}
					//episode objects are identified in the same way as seasons. using the span id's
					//for example s-1-e-2 represents season 1 episode 2
					let episodeButon = $(`
                    		<span id="S-${e.target.id.split('-')[1]}-E-${episode.episode}" 
							class="mx-2 season-button ${state}">E-${episode.episode}</span>`
					)
						.on('click', e => {
							$(e.target).addClass('selected');
							$(e.target)
								.siblings()
								.removeClass('selected');
							$('.ep-details').html('fetching episode information...');
							let series = e.target.id.split('-');
							//this function is defined below the TV object.
							showEpisode(this, series[1], series[3]);
							watchList.updateLocalStorage();
						});
					$('#episodes').append(episodeButon);
				});
				}
			);
			seasonList.append(epButton);
			sIndex += 1;
			firstSeason += 1;
		});

		let collapseTracker = $(`
        <hr>
        <div class="d-flex justify-content-around">
            <p class="heading">Episode Tracker</p>
			<div class="btn btn-default right" data-toggle="collapse" 
			href="#ep-tracker" role="button" aria-expanded="false" 
			aria-controls="ep-tracker">
                <i class="fas fa-angle-right"></i>
            </div>
        </div>
        <div class="collapse " id="ep-tracker">
            <div id="ep-tracker-content">
            </div>
		</div>`
		).on('click', e => {
			if (
				$(e.target)
					.closest('div')
					.hasClass('right')
			) {
				$(e.target)
					.closest('div')
					.switchClass('right', 'down', 500);
			} 
			else {
				$(e.target)
					.closest('.btn')
					.switchClass('down', 'right', 500);
			}
		});
		collapseTracker
			.find('#ep-tracker-content')
			.append(
				`<p><strong>Seasons</strong></p>`,
				seasonList,
				`<p class="mt-3"><strong>Episodes</strong></p>`,
				episodeList,
				`<div class="ep-details"></div>`
			);
		preview.find('.additional-info').append(collapseTracker);
		return preview;
	}
	//modifies the .card to display the next episode, if there is one.
	card(location) {
		let cardContents = super.card(location);
		if (this.nextEpisode) {
			//text in <small> should take the format "S01E01 - 12/12/12"
			let nextEpisode = $(`<div class= "row d-block mx-0 mb-0 text-right" >
                <p class="text-right mb-0"><small>
                <strong class="mr-2">Next Episode:</strong>
                ${this.nextEpisode.name}</p></small>
				<p>
					<small>
						S${ this.nextEpisode.season_number }
						E${ numberString(this.nextEpisode.episode_number	)} -
						${ tmdbDateFix(this.nextEpisode.air_date) } 
					</small>
				</p>
				</div >`
				);
			cardContents.find('.card-head').append(nextEpisode);
		}
		return cardContents;
	}
	//Gets two recommendations using the discover End point ot the TMDB API
	getRecommendations(location) {
		if (location == 'card') {
			makePopUp();
		}
		$('#add-or-edit-container').html(`<div class="p-2"><p class="text-center"><strong>Because you liked ${
			this.title
		} you might also like </strong></p>
		<div id="actor-rec" class="d-flex justify-content-center">
			<img src="./assets/images/loading.gif" alt="loader">
        </div>
		<div id="genre-rec" class="d-flex justify-content-center">
			<img src="./assets/images/loading.gif" alt="loader">
        </div>
        </div>
        `);
		let noButton = $(`<div class="btn btn-default text-center">No Thanks</div>`);
		noButton.on('click', () => {
			closePopUp();
		});
		tmdb.getObjects(
			{ listType: 'recommendations', recType: `tv recommendations`, id: this.dbid, type: this.type },
			movie => {
				$('#actor-rec').html("");
				$('#genre-rec').html("");
				let recOneIndex = randomIndex(movie.length);
				let recTwoIndex = randomIndex(movie.length);
				if (recOneIndex == recTwoIndex) {
					recTwoIndex -= 1;
				}
				$('#actor-rec').append(movie[recOneIndex].card('recommendation'));
				$('#genre-rec').append(movie[recTwoIndex].card('recommendation'));
			}
		);

		let buttonWrapper = $(`<div class="d-flex justify-content-center mb-5"></div>`).append(noButton);

		$('#add-or-edit-container').append(buttonWrapper);
	}
}

//callback function to get information about each episode of a show, called by the item preview above.
showEpisode = (object, season, episode) => {
	tmdb.getEpisodeName(object.dbid, season, episode, episodeDetails => {
		if (object.epTracker[0].name == "Season 1"){
			season -= 1
		}
		$('.ep-details').html('');
		$('.ep-details').append(`
				<p class="mt-2 mb-0 text-center heading">
					<strong>${episodeDetails.name}</strong>
				</p>
				<p class="text-right">
					<small>first aired: ${tmdbDateFix(episodeDetails.air_date)}</small>
				</p>
				<p class="desc-box">${episodeDetails.overview}</p>
			`);
		let buttonText = 'Mark as Watched';
		if (object.epTracker[season].episodes[episode - 1].watched) {
			buttonText = 'Unmark as Watched';
		}
		let confirmButton = $(`
				<div id="confirm-button" class="btn-default w-23 mx-auto text-center">
					${buttonText}
				</div>`
		)
			.on('click', () => {
				if (object.epTracker[season].episodes[episode - 1].watched) {
					object.epTracker[season].episodes[episode - 1].watched = false;
					$(`#S-${season}-E-${episode}`).removeClass('watched');
					$('#confirm-button').html('Mark as Watched');
					if (!object.epTracker[season].episodes.every(e => { return e.watched })) {
						$(`#s-${season}`).removeClass("watched")
					}

				} else {
					object.epTracker[season].episodes[episode - 1].watched = true;
					$(`#S-${season}-E-${episode}`).addClass('watched');
					$('#confirm-button').html('Unmark as Watched');
					if (object.epTracker[season].episodes.every(e => { return e.watched })) {
						$(`#s-${season}`).addClass("watched")
					}
				}
				watchList.updateLocalStorage();
			});
		$('.ep-details').append(confirmButton);
	});
}


//button controls are used to perform the actions by the various buttons rendered by the watchList classes.
//each button takes the object that called it and the location that it was called from

buttonControls = {
	add: (object, location) => {
		closePopUp();
		if (location != "preview"){
			let fullDetailsPromise = tmdb.getDetails({ id: object.dbid, type: object.type })
			fullDetailsPromise.then(details => {
				let newItem = tmdb[`make${capitalise(object.type)}Object`](details)
				if (location == "recommendation-card") {
					watchList.add(newItem);
					makePopUp("add", newItem.title)
				}else{
					watchListDom.add(newItem);
				}
				
			});
		}
		else{
			watchListDom.add(object);
		}
	},

	delete: (object) => {
		watchListDom.remove(object.id.split('-')[1], object.dbid);
		watchListDom.render(watchList.contents);
		closePopUp();
	},

	preview: (object, location) => {
		if (location == "card"){
			makePopUp()
		}
		if (object.cast){
			$('#results').html(object.itemPreview('card'))
		}
		else{
			let fullDetailsPromise = tmdb.getDetails({ id: object.dbid, type: object.type })
			fullDetailsPromise.then(details => {
				let fullItem = tmdb[`make${capitalise(object.type)}Object`](details)
				if (location != "actorSearch") {
					$('#results').html(fullItem.itemPreview('search'))
				} else {
					$('#results').html(fullItem.itemPreview('actorSearch'));
				}
			})
			$('#results').html(`
				<div class="d-flex flex-column justify-content-center align-items-center">
				<img src="./assets/images/loading.gif"></img>
				<p>Getting item preview</p>
				</div>
			`);

		}
		watchListDom.renderDataLists();

		$('#search-box')
			.addClass('d-none')
			.removeClass('d-flex');
	},

	like: (object) => {
		watchList.addLike(object);
		watchListDom.render(watchList.contents);
		object.getRecommendations('card');
	},

	dislike: (object) => {
		watchList.addDislike(object);
		watchListDom.render(watchList.contents);
		closePopUp();
	},

	back: (object, location) => {
		let pageNumber = $('#results').attr('data-page');
		$('#search-box')
			.removeClass('d-none')
			.addClass('d-flex');
		if (location == 'search' || location == 'actorSearch') {
			$('#results').html('');
			if (location == 'search') {
				searches[object.type]($('#search-box input').val(), pageNumber);
			} else {
				searches.actorMovies({
					id: $('#results').attr('data-actorid'),
					name: $('#search-box input[type=text]').val(),
					page: pageNumber,
				});
			}
		} else {
			closePopUp();
		}
	}

}

