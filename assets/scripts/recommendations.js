/*************************Recommendations**************************/
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
				$('#watch-list').append(
					`<div id="next-twenty" class="card py-5"></div>
                    `
				);
				if (movieObjectArray.length == 20) {
					$('#watch-list').append(
						`<div id="next-twenty" 
                        class="button-wrapper d-flex flex-wrap 
                        justify-content-center">
                        </div>`
					);
					let moreButton = $(
						`<div class="btn btn-default my-5"> 
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
						$('#next-twenty').append(moreButton, prevButton);
					} else {
						$('#next-twenty').append(moreButton);
					}
				}
			}
		);
	},
};
