//recommendations.js contains the code that generates the the results of browsing for items.


/*recommendationsList takes in an object with the following properties as an argument
	type: where type is either movie or tv,
	recType: Which is the type of recommendations. i.e. movies by genre or top movies. A full list of options can
	be seen in the getUrl() method of the TMDB object.
	page: the current page of search, stating at 1
	id: the database id of the object being searched. 

*/
const recommendations = {
	recommendationsList: object => {
		if (object.page == 1) {
			closeDrawerMenu();
		}
		$('#watch-list').html(`<div class="no-results text-center">
                <img src="./assets/images/loading.gif">
                <p>fetching your recommendations</p> 
                </div>
            `);
		tmdb.getObjects(
			{
				type: object.type,
				listType: 'recommendations',
				recType: object.recType,
				page: object.page,
				id: object.id,
			},
			movieObjectArray => {
				watchListDom.render(movieObjectArray, "recommendation-card");
				if (movieObjectArray.length == 20) {
					$('#watch-list').append(
						`<div id="next-twenty" 
                        class="d-flex button-wrapper  
                        w-100">
                        </div>`
					);
					let moreButton = $(
						`<div class="btn btn-default ml-auto my-5"> 
                            Next 20 <i class="fas fa-arrow-right ml-2"></i>
                        </div>`
					).on('click', () => {
						document.body.scrollTop = 0; // For Safari
						document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
						recommendations.recommendationsList({
							type: object.type,
							recType: object.recType,
							page: object.page + 1,
							id: object.id,
						});
					});
					let prevButton = $(
						`<div class="btn btn-default my-5"> 
                            <i class="fas fa-arrow-left"></i> <span class="ml-2">prev 20</span>
                        </div>`
					).on('click', () => {
						document.body.scrollTop = 0; // For Safari
						document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
						recommendations.recommendationsList({
							type: object.type,
							recType: object.recType,
							page: object.page - 1,
							id: object.id,
						});
					});
					if (object.page > 1) {
						$('#next-twenty').append(prevButton, moreButton);
					} 
					else {
						$('#next-twenty').append(moreButton);
					}
				}
			}
		);
	},
};
