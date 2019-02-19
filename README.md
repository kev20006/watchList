# WatchList 

Have you ever seen a trailer for a movie only to forget the title by the time you get home to watch it? Was everybody at work or school talking about an amazing show they saw at the weekend, yet when you sat down in front of your computer you forgot what it was called? Have you ever taken a break from watching TV series, and then forgot what episode you were on when you returned?

If you answered yes to any of these questions, WatchList is the app for you. It allows you to search for any TV or Movies by title or by actor and then store them in a list conveniently in your web browser.

[check out the app here](https://kev20006.github.io/watchList/)
 
# UX

## The Idea

The idea for this app came from my mother. When I was staying with her not too long ago she had a little book that she used to record all the TV shows and movies that she wanted to see. This book became the inspiration for WatchList.

### User Stories
The reason for creating this app is to give my users a simple and straight forward platform to keep track of media that they would like to see. With this in mind I created the following user stories:

#### Basic Functionality
* As an end user I should be able to search for movies
* As an end user I should be able to search for TV Shows
* As an end user when I select an item I should be able to see some summary information about the media and confirm if it is the media I want to add
* As an end user I should be able to add a movie to my watch list
* As an end user I should be able to add a TV show to my watch list.
* As an end user I should be able to remove items from my list
* As an end user I should be able to save my watch list across multiple sessions

I also thought that users might be able to want to comment on the items in their watch lists or add tags to them to help organise and filter the list.

#### Tag and Filter 
* As an end user I should be able to add a comment or note to things that I add to my list.
* As an end user I should be able to add tags to items in my list to group them.
* As an end user I should be able to filter my watchlist to show only one type of media
* As an end user I should be able to sort my watch list into custom categories

It also occurred to me that users might want know exactly what they want to watch when they use the app. So thought it would be useful to offer recommendations and lists.

#### Recommended Content 
* As an end user I should be able to identify if I have watched a list item and whether or not i enjoyed it
* As an end user I should be offered recommendations when I have Identified that I have watched something and enjoyed it
* As an end user I should be able to see an overview of my watch history
* As an end user I should be able to identify if I have watched a list item and whether or not i enjoyed it
* As an end user I should be able to select the media I want to add from a list of suggestions.


## Scope

Using the user the above user stories and he project brief I identified the follwoing requirements: 

### Functional Requirements

1. The project Should be a Single Page Web Application
2. The project should utilise an API to get Movie and TV information
3. The App should work in all Browsers
4. The App Should Utilise Responsive Design and work on a range of devices including:
    * mobiles
    * phablets
    * tablets
    * laptops
    * desktops
5. The App will require storage so that it can persist across multiple sessions.
6. The App must be interactive.
7. The App Must store users activity to generate better recommendations.

### Non-Functional Requirements

1. The App should be intuitive to use.
2. The App should be eye-catching and easy to read/use.

### Content Requirements

1. All content should be created dynamically.
2. Movie and TV show informaiton should be up to date.

## Structure

In regard to structure I opted for a Single Page Application. I chose this structure for the app because most all the content on the site will be generated dynamically from API's or from local storage, therefore when a user opens the app the do not have to immediately download a huge amount of HTML.

The app will be structured around a main viewport in which Movies and TV shows will be rendered as cards. This is a well-used convention in list style apps, such as Pinterest or Google Keep, and as a result on structure that users should immediately feel comfortable with.
Outside of this main view port controls will be concealed in two areas. Drop down menu for adding new items and in a sliding drawer menu for additional sorting, browsing and navigational controls.

In regard to the order of information in the main menu, the watch list controls are at the top as they take precedence. Beneath that are the options to browse movies, as that is a secondary action that many users might want to take. At the bottom of the menu are the options to display help or delete the watch list as these are actions that the user will hopefully be performing the least.
The button to add new items has intentionally been left off the menu, as this is the most common action that the users should be taking and therefore will always be present in the Navbar instead of concealed in a menu.

Most of these controls will ultimately render a pop-up modal window that will display contextual information and controls. This modal will be used to house the search interface, tag management, recommendations and item previews. As mentioned the content will be added dynamically and only information relative to the task the user is trying to complete will be displayed. A modal was chosen to make it easy for users to drop back out of any menu simply by clicking outside.

## Skeleton Layer

As described above the plan for the interface was to have a single responsive viewport. 

Items in this viewport items would be rendered as cards, and the cards would adjust their position and formation based on the size of the viewport.

Controls would be hidden in drop downs and sliding drawer menus to create a clean UI devoid of on screen clutter.

Because of the intention to use a card based layout there is little differentiation between the designs for the different viewports as the cards.

Wireframes are included below with a brief discussion about each. Alternatively, you can view the wireframes in the documentation > wirefframes > images folder in this [repo](https://github.com/kev20006/watchList/tree/master/documentation/wireframes/images).

[**Wireframes Discussion**](https://kev20006.github.io/watchList/documentation/wireframes/WatchListWireframes.html)

## Surface Layer

### Colours

In my choice of colours I chose to keep things quite simple. Initially I had planned to have movies, TV and tags to all be different colours and completely change the UI to match the selected item, however, felt that would detract from the app having a cohesive theme. Instead I decided to use one main colour, and shades of grey for secondary colouring. I decided to go with an orange/yellow colour for the app as I felt that it is a colour that evokes positivity and optimism.

As well as the orange colour, I utilised some other colour conventions, negative actions, like dislike or deleting use red icons, and positive actions, such as liking a movie are green.


### Typeface

For headings I used the Google Font Bungee. I felt it creating quite a striking yet easy to read appearance.

For body text i opted for the Montserrat font, again from google fonts. I felt this font provided a nice contrast from the much bolder heading font. Additionally, despite it being sans-serif it's still very easy to read. 

### Iteractions

Every clickable element on the app has a hover effects to ensure that it is clear to the user that it is infact a clickable item.

**Tooltips**: All buttons represented by icons have associated tool-tips that display on hover to make it clear what they do.

**Buttons**: All buttons darken on hover to identify that they are clickable. 

**Menu Items**: Menu items highlight in orange on mouse over, and darken when click on to show selection. Currently selected menu items are highlighted in grey.

**Search Results**: When moused over search results rise up towards the user to show that they are currently selected.(i.e scale up and display box shadow to create the illusion of floating.)

**Scrollable Elements**: Scrollable elements will display a scrollbar if required and hide it if it isn't.

**Expandable Content**: rotate when clicked to show if content has been or can be expanded.

**Loading circle**: Any elements that are loaded by an external API will display a loading spinner until the element has been received and is rendered. 

# Features

## Existing Features

### Up To Date External Data

WatchList uses the TMDB API to get information about movies and TV shows used to create the movie and tv objects.
 
*All API calls are handled by TMDB.js*
 
*As a free user Watchlist is limited to 10 API requests every 10 seconds. If this number is exceeded warning.js displays an error message and a countdown.*

### Responsive Card Based Interface.

Users movies and TV shows are stored in the app as cards that will rearrange themselves for different display sizes, making the app completely responsive across all devices.

*Watch items both movie and TV are rendered by class methods. Thr card method of the watchitem base class is used to generate the HTML for card objects.* 

### Search Movies, TV Show and Actors

Users of watchlist can search for and add items by:

* Search for Movies By Title - Users can search for Movies by title from the drop down menu.
* Search for Tv Shows by Title - Users can search for Movies by title from the drop down menu.
* Search for Movies by Actor - Users can search for an actor. On selecting that Actor the user can view a list of movies that they are in.

*menu.js animates the add items dropdown menu and handles the click events for this menu.*

*popup.js renders the HTML for the pop box that is used by the search interface and handles the event listeners.*

*search.js uses tmdb.js to make the API calls and then renders and paginates the search results in the pop window.*

### Browse TV and Movies

If a user isn't sure what they want to watch, they can browse items:

* Browse highest rated movies
* Browse Movies in cinemas now
* Broswe Movies by Genre
* Browse highest rated TV shows
* Browse TV shows currently airing
* Broswe TV shows by Genre

*The option to browse Movies and TV shows uses tmdb.js to make calls to the various API end points. Recommendations.js creates the cards and pagination of each of the preview items.* 

### Recommendations

When the user like an item the app will recommend more movies or tv shows based on their choice. For movies it will randomly select a movie of the same genre and a movie staring one of the top billed cast. For TV shows the app will call the discover API end point and discover shows with similar themes to the one that the user has liked. 

*Recommendations are generated by a class method in the TV and object classes. The API calls required to get the movie and TV recommendations are once again handled by tmdb.js*

### Watch History

The App will record how many Movies and TV shows the user has liked and disliked. Additionally it tracks the last 5 movies and TV shows that the user has watched. On the tracking page there is also an overview of the current watch list and users can see at a glance the number of movies and TV shows in the list. As well as having the opportunity to explore the list by genre.

*Likes, Dislikes and last 5 are stored in the watchList object found in watchList.js along with methods add each of these things. The Watch His tory is rendered by watchHistory.js*

## Features To be added in the future

### Games and Books

In my intial designs I planned to included books and games. Whilst I had this working in an earlier build the API's that i was using didn't work as intended. The google play books API gave very strange results and the the IGDB api was very very slow as it has to go through a proxy that I made in Node. [Hosted on REPL here](https://repl.it/@kev20006/IGDB-PROXY ). In the end I took out books and games, however, intend to make faster proxies for IGDB and ISBNDB in the future (After studying the backend part of the course).

### Share Watch Lists or Tags

I think it would be very useful to be able to share watchlists or tags with other users. Users could view lists and collections created by other users and vote on peoples lists, making the app more engaging, and helping to facilitate discovery of new movies and tv shows.

### Advanced Searching

The search is still quite simplistic, It would be beneficial to users users if they could search multiple criteria simulataneously.

### Reminders

It would be useful if the app could send push notifications to remind you if one of your tv shows is about to come on.

# Technologies Used

This Project uses:

* JQuery
   * The project uses query to simplify DOM Manipulation
* JQuery UI
   * For some handy animations and transitions
* Bootstrap 4
   * For some beautiful HTML Components
* SCSS
   * To make the site beautiful and to make CSS bearable
* Font Awesome 
   * for the lovely Icons 
* Google Fonts
   * For the beautiful fonts
*	Jasmine
	  * To automate testing of non UI functions 

# Testing

## Automated Testing

**A couple of caveats**
* Due to some dependency on previous inputs the testing will only work if done in order. Items are added using the add method these items are then removed using the remove method.

* Running the tests will reset the local storage of your current watchlist

Automated testing was carried out using the Jasmine testing suite and can be found in the testing folder in the repo [here](https://github.com/kev20006/watchList/tree/master/testing). Alternatively clicking [here will open the jasmine tests spec runner](https://kev20006.github.io/watchList/testing/SpecRunner.html?random=false)

The automated testing is carried out on the watchlist.js and utilityFunctions.js as these are the functions that do not rely on external APIs or modify the DOM or application state in anyway.

**Watchlist.js**: initialises, handles and stores the data used by the other scripts. 

**utilityFunctions.js**: contains a number of functions used throughout the app for converting data, string formats or generating random numbers. 

## Manual Testing

To begin manual testing, i completed the following actions to test my user stories.

### Testing the User Stories

*Underneath each test I have included any bugs or fixes that were found. Minor bug fixes are just mentioned, larger issues are explained in more detail later in the document*

#### User Story 1: 
**As an end user I should be able to search for movies**

**Actions:**
1. Click the + icon drop down
2. Click the add movie.
3. submit empty field - verify that the search doesn't send
4. submit nonsense title - verify that no results are found.
5. search a valid title
6. check pagination
  1. click next until there are no more results
  2. click back until i return to the first page
7. View more information about the movie.
8. Verify that correct information is displayed.
  1. only add and back buttons are displayed
  2. title, Description, Genres, Top 4 Cast are displayed
 
**Issues:**
* Added shake and validation to the search.
* Updated pagination so that only required buttons are rendered.
* [Bug Fix 3](#bug-fix-3)
* [Bug Fix 4](#bug-fix-4)

#### User Story 2:
**As an end user I should be able to search for TV Shows**

**Actions:**
1. Click the + icon drop down
2. Click the add movie.
3. submit empty field - verify that the search doesn't send
4. submit nonsense title - verify that no results are found.
5. search a valid title
6. check pagination
  1. click next until there are no more results
  2. click back until i return to the first page
7. View more information about the tv show.
8. Verify that correct information is displayed.
  1. only add and back buttons are displayed
  2. verify that episode tracker is displayed
    1. verify that seasons are displaed.
    2. on clicking a season episodes are displayed
    3. on clicking an episode information about that episode  & the date it aired is displayed
  2. title, Description, Genres, Top 4 Cast are displayed

**Issues:**
* [Bug Fix 6](#bug-fix-6)


#### User Story 3:
**As an end user I should be able to add a movie to my watch list**

**Actions:**
1. Add a Movie from the quick add button in the search. Verify that list renders with new item in it.
2. Add a Movie from the item preview. Verify that list renders with new item in it.
3. Add a Movie from Browsing Movies
4. Add a Movie form a Recommendation
5. try to add a movie that is already in the list. Verify that it rejects

**Issues:**
* [Bug Fix 1](#bug-fix-1)

#### User Story 4: 
**As an end user I should be able to add a TV show to my watch list.**

**Actions:**
i. Add a TV Show from the quick add button in the search. Verify that list renders with new item in it.
ii. Add a TV Show from the item preview. Verify that list renders with new item in it.
iii. Add a TV Show from Browsing TV shows. Verify that list renders with new item in it.
iv. Add a TV Show form a Recommendation. Verify that list renders with new item in it.
v. try to add a movie that is already in the list. Verify that it rejects

**Issues:**
* no issues - worked as expected

#### User Story 5:  
**As an end user I should be able to remove items from my list**

**Actions:**
1. delete a movie from the card view
2. delete a movie from the preview
3. delete a tv show from the card view
4. delete a tv show from the preview

**Issues:**
* no issues - worked as expected

#### User Story 6: 
**As an end user I should be able to save my watch list across multiple sessions**

**Actions:**
1. Refresh the browser. Verify Watch List contents are still there
2. Refresh the browser. Verify Watch Likes, Dislikes and History are still there.
3. Refresh the browser and Verify that unempty tags are still there
4. Refresh the browser and verify that all notes, tags and episode tracking is still there.
5. Close and reload the browser. Verify Watch List contents are still there
6. Close and reload the browser. Verify Watch Likes, Dislikes and History are still there.
7. Close and reload the browser and Verify that unempty tags are still there
8. Close and reload the browser and verify that all notes, tags and episode tracking is still there.

**Issues:**
* [Bug Fix 7](#bug-fix-7)

#### User Story 7: 
**As an end user I should be able to add a comment or note to things that I add to my list.**

**Actions:**
1. add a comment to an item then add it to my list.
2. add a comment to an existing list item.
3. Reload and validate my comments are still there.

**Issues:**
* no issues - worked as expected

#### User Story 8: 
**As an end user I should be able to add tags to items in my list to group them.**

**Actions:**
1. add a tag to a new item
2. add a tag to an existing item
3. add a tag from manage tags context menu
4. add a existing tag to a new item
5. add a existing tag to an existing item
6. add a duplicate tag
7. add a blank tag
8. delete a tag
9. filter by tag
10. filter by empty tag - error message should be displayed.

**Issues:**
* when addiing tags to a new item, existing tags wouldn't display. Changed the order in which they are rendered.
* Adding a new tag from context menu. + not an obvious button - added mouse over effect.


#### User Story 9: 
**As an end user I should be able to filter my watchlist to show only one type of media**

**Actions:**
1. open the drawer menu - select movies - - verfiy only movies are displayed
2. open the drawer menu - select tv shows - verfiy only movies are displayed

**Issues:**
* no issues - worked as expected

#### User Story 10:
**As an end user I should be able to sort my watch list into custom categories**

**Actions:**
* Already checked this when filtering tags - collections became tags after early user testing. The name collections confused the users, as they expected to be able to look through premade collections - this functionality was added to browser. Collections became tags.

#### User Story 11:
**As an end user I should be able to identify if I have watched a list item and whether or not i enjoyed it**

**Actions:**
1. Liking a movie adds a like to the watch history tracker
2. Disliking a movie adds a dislike to the watc list tracker
3. liking  <= 5 movies will display them all in the last 5 tracker, in order.
4. liking 6 movies will displays the last 5 movies and discard the 1st movie in the last 5 tracker
5. Liking a tv shows a like to the watch history tracker
6. Disliking a tv show adds a dislike to the watc list tracker
7. liking  <= 5 tv shows will display them all in the last 5 tracker, in order.
8. liking 6 tv shows will displays the last 5 movies and discard the 1st movie in the last 5 tracker

**Issues:**
* no issues - worked as expected

#### User Story 12: 
**As an end user I should be offered recommendations when I have Identified that I have watched something and enjoyed it**

**Actions:**
1. clicking like on an item shows 2 recommendations
2. liking a movie should give 1 recommendation by actor
3. liking a movie should give 1 further recommendation by genre
4. liking a tv show should give 2 recommendations.
5. I can preview my recommendations to see an overview of the movie or tv show
6. i can add movies and previews from my recommendations to my list

**Issues:**
* no issues - worked as expected

#### User Stories 13 & 14: 
**As an end user I should be able to see an overview of my watch history**
**As an end user I should be able to identify if I have watched a list item and whether or not i enjoyed it**

**Actions:**
* 13 and 14 have been covered in other tests. likes and history were covered in the testing for user story 11

#### User Story 15:
**As an end user I should be able to select the media I want to add from a list of suggestions.**

**Actions:**
1. I can browser a list of movies currently in theatres
2. I can browser a list of top rated movies
3. I can browse movies by genre
4. I can browse a list of top rated 
5. I can get a list of movies by genre
6. I can get a list of TV shows by Genre
7. I can add an item and continue browsing without having to go back.

**Issues:**
* no issues - worked as expected

#### UI/UX Testing

To test UX and to see how the UI performed on different devices I completed the same tasks (detailed below) on each device.

* I searched for a movie and added it using quick add
* I searched for a movie and added it using the full preview - with a note and a tag.
* I added a movie using each of the browse options.
* I added a movie by genre
* I added a movie by actor
* I searched for a tv show and added it using quick add
* I searched for a tv show and added it using the full preview - with a note and a tag.
* I added a tv show using each of the browse options.
* I added a tv show by genre
* I filtered my list showing only movies
* I filtered my list showing only tv shows
* I filtered my list to show only items marked with a tag
* I liked 6 movies - to see if last 5 looked ok
* i liked 6 tv shows - to see if last 5 looked ok
* I added movies and tv shows from recommendations.
* I checked the watch history.
* I reloaded the app.

I checked the app on my desktop computer running windows 10 under the following conditions.

1. Chrome Version 72.0.3626.109 -full screen at native resolution
2. Chrome - emulating an S5
3. Chrome - emulating a pixel 2
4. Chrome - emulating a pixel 2 XL
5. Chrome - emulating an iPhone 5
6. Chrome - emulating an iPnone 6/7/8
7. Chrome - emulating an iPhone X
8. Chrome - emulating an ipad
9. Chrome - emulating an ipad Pro
10. Firefox Version  - fullscreen at native resolution
11. Microsft Edge  - fullscreen at native resolution

**issues**

* Pagination for browsing was done using a card similar to a movie card. Whilst this looked quite good on medium sized screens. It looked a bit odd on other devices. The browsing pagination controls were changed to a bar that sits below the last row of movie cards.

* gap found between footer and bottom of the page at large resolutions - fixed using position sticky and sticking the footer to the bottom of the page when it scrolls into view.

* The CSS property unset doesn't work in older browsers; replaced it to make the app better supported.

After completing this testing completed the same tasks again on the following devices.

1. Samsung A7 - 2016 - 6.0" display
2. Samsung S6 - 2017 -  5.6" screen
3. Levonvo Ideapad - windows 10 - connected to a 42" TV
4. Levonvo Ideapad - windows 10 - 16" Screen

**issues**
* [Bug Fix 8](#bug-fix-8)

Unfortunately I don't own a tablet, so testing on tablets could only be emulated.

### User Testing

I shared my app with the CI slack group, some of my colleagues at work and with my family at different stages of it's development in the following sections are details of bugs found and fixes applied.

**issues identified at this stage**
* [Bug Fix 1](#bug-fix-1)
* [Bug Fix 2](#bug-fix-2)


### Bugs & Bug Fixes
Below details a list of bugs found at different stages of testing.

#### Bug Fix 1 
##### Manually Having to Referesh The Page when items were added

**Status:** Fixed

**Details**
If the user added an item they would then have to manually referesh the page to see the items in the list.

**Fix**
This bug occured as a result of splitting the watchlist.js file into watchList.js to handle the model and watchListDom.js to update the DOM. The watchList.add method was called as a part of WatchListDom.add, to add data to list, however the render method was never called after the add took place. Render method added to WatchListDom.add fixed this.

#### Bug Fix 2 
##### Frequent Annoying Pop-Up

**Status:** Fixed

**Details**
The first time the user opens watchlist the information and help screen is supposed to display, however it was continuing to display everytime a user visited the app.

**Fix**
The pop-up was displaying whenever a user had an empty list. However having an empty list doesn't guarantee a first time user. A boolean property called returningUser was added to the watchList to record whether it was a users first visit or not. clicking ok on the welcome message sets this value to true, this then prevents the pop-up displaying on future visits 

#### Bug Fix 3 
##### Frequently Exceeeding API Request Limit

**Status:** Fixed

**Details**
App would frequently exceed it's API request limit.

Each search was creating an array of 20 movie or tv objects. This meant that each search or browser was making 21 requests. I for the search and then a further 20 to get the details of each object. 

**Fix**
Added a generic WatchItem constructor, constructor creates a partial movie or tv object only using details from the search resultswith enough information to render a card or a search result. this reduces the total number of API calls significantly. from 21 to 1 per search. Full movie/tv details are only requested by a a further APU call if the item is select or added to the list.

#### Bug Fix 4 
##### Pagination Controls Not Working Correctly

**status:** Fixed

**Details**
The back button for search results doesn't work as expected when looking at Movies by Actor.
When the user selects an actor from the actor search to see the movies that they are in, the back button on the pagination controls don't respond.

**Fix**
The Movies by actor end-point doesn't automatically paginate let all the other endpoints do. Pagination had to be added manually into TMDB.getObjects. I calculated array indexs based on the "page of the search" the lower bound is (page -1) * 10 and the upperbound is (page * 10 ) - 1. This means that when page one is passed into get objects, we will retrieve array elements from indexs 0 to 9. 

#### Bug Fix 5
##### View more information generates a new movie item each time it is clicked

**status:** Fixed

**Details**
When a user clicks the more information button from a card in their watchlist, the app makes a new API request and creates a new instance of that move object instead of creating a preview of the movie or tv item from the list. This has led to any notes added getting lost and also like, dislike and delete buttons not working as expected. 

**Fix**
When the more info button is clicked the state card that triggered the click event is checked. If that card was generated by a preview or a recommendation an api call is made to get full move or tv info to display in the preview. If it is not a preview item, It is safe to assume that the card must be in the list and therefore the list item's own preview method can be renedered. 

#### Bug Fix 6
##### Episode tracker doesn't work if a series doesn't have specials

**Status:** Fixed

**Details**
When a user tries to view epsiode information about a show that has no specials it reaches a 404 error. 

**Fix**
It was assumed that all series had a 0 series, which detailed special episodes. This was not the case. This variation between TV Shows led to some shows trying to treat series 1 as series 0. In these situations the API calls to fecth series information were returning with a 404. To fix this series id's are conditionally assigned based on whether or not the first series in the ep track is "season 1" or "specials". Additionally some more condiitonal statements had to be added to adjust array indexs when storing data and tracking episodes.

#### Bug Fix 7
##### Tags with deleted content persist on refresh. 

**Status:** Fixed

**Details**
When a tag is loaded from local storaged with no contents it is supposed to be deleted to help declutter the app. However, If a movie has a tag and is then deleted, it's tag persists through garbage collection.

**Fix**
 When a list item is deleted, by calling the watchlist.remove method. It will check to see if the id of the item appears in any of the tags, if it does it will remove the id from each of the tags. Ny removing the ID from the tags, this will also cause any tags left empty to be caught by garbage collection the next time the app is loaded.

#### Bug Fix 8
##### Drawer Menu was longer than viewport. 

**Status:** Fixed

**Details**
When using chrome on a mobile phone, the drawer menu would not adjust it's size when chrome's URL bar would display. This made it difficult to scroll to the bottom of the menu. 

**Fix**
It took a while to work out why this was happening. But it turns out that on mobile chrome VH units don't scale when the url bar is displayed. I changed the height of my drawer menu from 100vh to 100%, this fixed the issue.

# Deployment

The site has been deployed using github pages in the usual way.

* All app files were added to a git repo.
* The repo was pushed onto github.
* Guthub pages was enabled for the repository.
* The app live at https://kev20006.github.io/watchList/

If you want a local copy of this app you can clone this repo and open index.html. All files use relative paths so it shouldn't take any other configuration.

# Credits

## Content & Media

All content the site site is taken from TMDB through the use of their API. All copyrights of images and text belong to their respective owners.

## Acknowledgements

* My mothers little note book of movies was initial inspiration behind this project. And remains the true standard by which it must be compared.

* Google's Material Design was a big influence on the design of my app. And Google applications such as keep and google classroom have been quite influencial throuhgout.


 


