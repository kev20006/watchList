describe('Testing the functionality, of the watchlist methods', () => {
    describe('Adding New Items',()=>{
        watchList.resetAll()
        it('When i add 1 item the list should have a length of 1 ', () => {
            let movie1 = {
                title: "Harry Potter and the Chamber of Secrets",
                dbid: 0,
                type: "movie",
            }
            watchList.add(movie1);
            expect(watchList.contents.length).toBe(1);
        })
        it('When i add 2 item the list should have a length of 2 ', () => {
            let movie2 = {
                title: "Harry Potter and the Goblet of Fire",
                dbid: 1,
                type: "movie",
            }
            watchList.add(movie2);
            expect(watchList.contents.length).toBe(2);
        })
        it('When i add the same item twice to the list, the list should have a length of 1 ', () => {
            let movie3 = {
                title: "Harry Potter and the Chamber of Secrets",
                dbid: 0,
                type: "movie",
            }
            watchList.add(movie3);
            expect(watchList.contents.length).toBe(2);
        })

    })
    describe("deleting items", ()=>{
        it(`given an index value it should delete the element at that index reducing the list by 1`, ()=>{
            watchList.remove(0);
            expect(watchList.contents.length).toBe(1);
        })
        it(`given no index, the list should not change`,() => {
            watchList.remove();
            expect(watchList.contents.length).toBe(1);
        })
        it(`given an invalid index the list should not chance (negative number)`, () => {
            watchList.remove(-12);
            expect(watchList.contents.length).toBe(1);
        })
        it(`given an invalid index the list should not chance (outofbounds)`, () => {
            watchList.remove(100);
            expect(watchList.contents.length).toBe(1);
        })

    })

    describe("adding tags", () => { 
        it('should be able to add empty custom collections', () => {
            watchList.addTag("test 1");
            expect(watchList.collections["test 1"].length).toBe(0);
        })
        it('should be able to add custom collections with content', () => {
            watchList.addTag("test 2", 0);
            expect(watchList.collections["test 2"].length).toBe(1);
        })
        it('should be able to add more items to a custom collection', () => {
            watchList.addTag("test 2", 1);
            expect(watchList.collections["test 2"].length).toBe(2);
        })
    })

    describe("filter Items", ()=> {
        describe('should be able to sort by type', () => {
            beforeEach(function () {
                watchList.contents = [];
                watchList.add({
                    title: "Harry Potter and the Goblet of Fire",
                    dbid: 1,
                    type: "movie"
                });
                watchList.add({
                    title: "Harry Potter and the chamber of secrets",
                    dbid: 0,
                    type: "movie"
                });
                watchList.add({
                    title: "The Wire",
                    dbid: 2,
                    type: "tv"
                });
                watchList.add({
                    title: "Vera",
                    dbid: 3,
                    type: "tv"
                });
            });
            it('should be able to filter to show only movies', () => {
                let newList = watchList.filter("type" ,"movie")
                expect(newList.length).toBe(2);

            })
            it('should be able to filter to show only tv shows', () => {
                let newList = watchList.filter("type", "tv")
                expect(newList.length).toBe(2);
            })
        })
        describe('should be able to sort by tags', () => {
            it(`should be able to filter the list to show the items listed in a tag`,()=>{
                watchList.addTag("Wizards", 1);
                watchList.addTag("Wizards", 0);
                let newList = watchList.filter("tags", "Wizards");
                expect(newList.length).toBe(2);
            }); 
        })
    });
    
    describe('Like/Dislike items', () => {
        beforeEach(function () {
            watchList.resetAll();
            watchList.add({
                title: "Harry Potter and the Goblet of Fire",
                dbid: 1,
                type: "movie",
                genre: [{ name: "family" }, { name: "drama"}, {name: "adventure"}],
                id: "card-0"
            });
            watchList.add({
                title: "Harry Potter and the chamber of secrets",
                dbid: 0,
                type: "movie",
                genre: [{ name: "family" }, { name: "drama" }, { name: "adventure" }],
                id: "card-1"
            });
            watchList.add({
                title: "The Wire",
                dbid: 2,
                type: "tv",
                genre: ["crime", "drama"],
                id: "card-2"
            });
            watchList.add({
                title: "Vera",
                dbid: 3,
                type: "tv",
                genre: ["crime", "drama"],
                id: "card-3"
            });
            watchList.add({
                title: "Movie with no genres",
                dbid: 4,
                type: "movie",
                id: "card-4"
            });
            watchList.add({
                title: "Movie with blank genres",
                dbid: 5,
                type: "movie",
                id: "card-5",
                genre: [],
            });


        });
        describe('Like movie and tv items', () => {
            describe(`checking the like count`, () => {
                it('liking one movie should add 1 to movies liked variable', () => {
                    watchList.addLike(watchList.contents[0]);
                    expect(watchList.analytics.movie.likes).toBe(1);
                });
                it('liking two movies should result in 2 movies liked', () => {
                    watchList.addLike(watchList.contents[0]);
                    watchList.addLike(watchList.contents[0]);
                    expect(watchList.analytics.movie.likes).toBe(2);
                });
                it('liking one tv show should add 1 to tb shows liked variable', () => {
                    watchList.addLike(watchList.contents[2]);
                    expect(watchList.analytics.tv.likes).toBe(1);
                });
                it('liking two shows should result in 2tv shows liked', () => {
                    watchList.addLike(watchList.contents[2]);
                    watchList.addLike(watchList.contents[2]);
                    expect(watchList.analytics.tv.likes).toBe(2);
                });
            })
            describe(`liking an item should remove it from the list`, () => {
                it('liking one item should reduce the size of the list by 1', () => {
                    watchList.addLike(watchList.contents[0]);
                    expect(watchList.contents.length).toBe(5);
                });
                it('liking two items should reduce the size of the list by 2', () => {
                    watchList.addLike(watchList.contents[0]);
                    watchList.addLike(watchList.contents[0]);
                    expect(watchList.contents.length).toBe(4);
                });
            })
            describe(`checking the genres trackers`, () => {
                it('liking a movie with 3 genres should result in a genres with length 3', () => {
                    watchList.addLike(watchList.contents[0]);
                    expect(Object.keys(watchList.analytics.movie.genres).length).toBe(3);
                });
                it('liking 2 movies with the same genres should result in the genre counts each being 2', () => {
                    watchList.addLike(watchList.contents[0]);
                    watchList.addLike(watchList.contents[0]);
                    expect(watchList.analytics.movie.genres.family).toBe(2);
                    expect(watchList.analytics.movie.genres.adventure).toBe(2);
                    expect(watchList.analytics.movie.genres.drama).toBe(2);
                });
            })
            describe(`checking the last 5 trackers`, () => {
                it(`liking 1 movie should add 1 item to the last 5 tracker`, ()=>{
                    watchList.addLike(watchList.contents[0]);
                    expect(watchList.analytics.movie.lastFive.length).toBe(1);
                })
                it(`liking 3 movies should add 3 item to the last 5 tracker`, () => {
                    watchList.addLike(watchList.contents[0]);
                    watchList.addLike(watchList.contents[0]);
                    watchList.addLike(watchList.contents[0]);
                    expect(watchList.analytics.movie.lastFive.length).toBe(3);
                });
                beforeEach(function () {
                    watchList.resetAll();
                    watchList.add({
                        title: "movie 1",
                        dbid: 0,
                        type: "movie",
                        genre: [{ name: "family" }, { name: "drama" }, { name: "adventure" }],
                        id: "card-0"
                    });
                    watchList.add({
                        title: "movie 2",
                        dbid: 1,
                        type: "movie",
                        genre: [{ name: "family" }, { name: "drama" }, { name: "adventure" }],
                        id: "card-1"
                    });
                    watchList.add({
                        title: "movie 3",
                        dbid: 2,
                        type: "movie",
                        genre: [{ name: "crime" }, { name: "drama" }],
                        id: "card-2"
                    });
                    watchList.add({
                        title: "movie 4",
                        dbid: 3,
                        type: "tv",
                        genre: [{ name: "crime" }, { name: "drama" }],
                        id: "card-3"
                    });
                    watchList.add({
                        title: "movie 5",
                        dbid: 4,
                        type: "movie",
                        id: "card-4"
                    });
                    watchList.add({
                        title: "movie 6",
                        dbid: 5,
                        type: "movie",
                        id: "card-5",
                        genre: [],
                    });
                });
                describe(`liking 6 movies should get get rid of the first item and add the new movie at the end`, ()=> {
                    
                    it(`on 6 movies liked tracker should have a lenght of 5`, () => {
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        expect(watchList.analytics.movie.lastFive.length).toBe(5)
                    });
                    it(`on 6 movies liked 2nd item is index 0 of the list`, ()=>{
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        watchList.addLike(watchList.contents[0]);
                        expect(watchList.analytics.movie.lastFive[0].title).toBe("movie 2")
                    });
                    it(`on 6 movies liked last item add is index 4 of the list`, () => {
                        //this is a cheesy solution, but in the app, the id is added when
                        //the list is rendered, to reflect it's current index in the list
                        watchList.addLike(watchList.contents[0]);
                        watchList.contents[0].id = "card-0";
                        watchList.addLike(watchList.contents[0]);
                        watchList.contents[0].id = "card-0";
                        watchList.addLike(watchList.contents[0]);
                        watchList.contents[0].id = "card-0";
                        watchList.addLike(watchList.contents[0]);
                        watchList.contents[0].id = "card-0";
                        watchList.addLike(watchList.contents[0]);
                        watchList.contents[0].id = "card-0";
                        watchList.addLike(watchList.contents[0]);
                        expect(watchList.analytics.movie.lastFive[4].title).toBe("movie 6")
                    });
                });
            })
        })
        describe('Disike movie and tv items', () => {
            describe(`checking the like count`, () => {
                it('disliking one movie should add 1 to movies disliking variable', () => {
                    watchList.addDislike(watchList.contents[0]);
                    expect(watchList.analytics.movie.dislikes).toBe(1);
                });
                it('disliking two movies should result in 2 movies disliking', () => {
                    watchList.addDislike(watchList.contents[0]);
                    watchList.addDislike(watchList.contents[0]);
                    expect(watchList.analytics.movie.dislikes).toBe(2);
                });
                it('disliking one tv show should add 1 to tb shows disliking variable', () => {
                    watchList.addDislike(watchList.contents[2]);
                    expect(watchList.analytics.tv.dislikes).toBe(1);
                });
                it('disliking two shows should result in 2 tv shows disliking', () => {
                    watchList.addDislike(watchList.contents[2]);
                    watchList.addDislike(watchList.contents[2]);
                    expect(watchList.analytics.tv.dislikes).toBe(2);
                });
            })
        })
    })
    
    describe('testing reset all', () => {
        it('should clear all the data held in the watchlist',()=>{
            watchList.resetAll()
            expect(watchList.contents.length).toBe(0);
            expect(watchList.analytics.tv.dislikes).toBe(0);
        })
    })
})


describe('testing functionality of the Utility Functions', () => {
    describe(`testing random index`, ()=>{
        it(`should return a value between 0 and 10 when given an upperbound of 10`, ()=>{
            let value = randomIndex(10)
            expect(value >= 0 && value <= 10).toBe(true);
        })
        it(`should return a value between 0 and 1000 when given an upperbound of 1000`, () => {
            let value = randomIndex(1000)
            expect(value >= 0 && value <= 1000).toBe(true);
        })
        it(`should return a value between 0 and -10 when given an upperbound of -10`, () => {
            let value = randomIndex(-10)
            expect(value >= -10 && value <= 0).toBe(true);
        })
        it(`should return 0 if given NaN as a parameter`, () => {
            let value = randomIndex("kevin")
            expect(value).toBe(0);
        })
        it(`should return 0 if given nothing as a parameter`, () => {
            let value = randomIndex("kevin")
            expect(value).toBe(0);
        })
    })
    describe(`testing capitalise`, () => {
        it(`Given a text string it should return that string with the first letter capitalised `, () => {
            let value = capitalise("kevin");
            expect(value).toBe("Kevin");
        })
        it(`Given a single letter it should return that value capitalised`, () => {
            let value = capitalise("k");
            expect(value).toBe("K");
        })
        it(`Given no paramenter should return ""`, () => {
            let value = capitalise();
            expect(value).toBe("");
        })
        it(`Given an invalid datatype should return ""`, () => {
            let value = capitalise(12345);
            expect(value).toBe("");
        })
        
    })
    describe(`testing number string`, ()=>{
        it("given a number between 0 - 9, it should output a leading 0 ", ()=> {
            expect(numberString(9)).toBe(`09`);
        })
        it("given a number 1 or greater, it should output that number as a string ", () => {
            expect(numberString(19)).toBe(`19`);
        })
    })
    describe(`testing tmdb date fix`, () => {
        it("given a date in the format yyyy-mm-dd, it should output the same date in the format dd/mm/yyyy ", () => {
            expect(tmdbDateFix("1986-04-24")).toBe(`24/04/1986`);
        })
        it("given given no parameter it should return an empty string ", () => {
            expect(numberString(19)).toBe(`19`);
        })
    })
})
