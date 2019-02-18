# Watch-List 

Have you ever seen a trailer for a movie only to forget it by the time you get home to watch it? Was everybody at work or school talking about an amazing show they saw at the weekend, yet when you sat down infront of your computer you forgot what it was called? Have you ever taken a break from watching tv series, and then forgot what episode you were on?

If you answered yes to a ny of these questions, Watch-List is the app for you. It allows you to search for any TV or Movies by title or by actor and then store them in a list conviently in your web browser. 

[check out the app here](https://kev20006.github.io/watchList/)
 
## UX

### The Idea

The idea for this app came from my mother. When I was staying with her not too long ago she had a little book that she used to record all the TV shows and movies that she wanted to see. This book became the inspiration for Watch-List.

#### User Stories
The reason for creating this app is to give my users a simple and straight forward platform to keep track of media that they would like to see. With this in mind i created the following user stories:

##### Basic Functionality
* As an end user I should be able to search for movies
* As an end user I should be able to search for TV Shows
* As an end user when I select an item I should be able to see some summary information about the media and confirm if it is the media I want to add
* As an end user I should be able to add a movie to my watch list
* As an end user I should be able to add a TV show to my watch list.
* As an end user I should be able to remove items from my list
* As an end user I should be able to save my watch list across multiple sessions

I also thought that users might be able to want to comment on the items in their watch-lists or add tags to them to help organise and filter the list.

##### Tag and Filter 
* As an end user I should be able to add a comment or note to things that I add to my list.
* As an end user I should be able to add tags to items in my list to group them.
* As an end user I should be able to filter my watchlist to show only one type of media
* As an end user I should be able to sort my watch list into custom categories

It also occured to me that users might want know exactly what they want to watch when they use the app. So thought it would be useful to offer recommendations and lists.

##### Recommended Content 
* As an end user I should be able to identify if I have watched a list item and whether or not i enjoyed it
* As an end user I should be offered recommendations when I have Identified that I have watched something and enjoyed it
* As an end user I should be able to see an overview of my watch history
* As an end user I should be able to identify if I have watched a list item and whether or not i enjoyed it
* As an end user I should be able to select the media I want to add from a list of suggestions.


### Scope

Using the user the above user stories and he project brief I identified the follwoing requirements: 

#### Functional Requirements

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

#### Non-Functional Requirements

1. The App should be intuitive to use.
2. The App should be eye-catching and easy to read/use.

#### Content Requirements

1. All content should be created dynamically.
2. Movie and TV show informaiton should be up to date.

### Structure

In regard to structure I opted for a Single Page Application. I chose this structure for the app because most all the content on the site will be generated dynamically from API's or from local storage, therefore when a user opens the app the do not have to immediately download a huge amount of HTML.

In regard to the order of information in the main menu, the wach-list controls are at the top as they take presedence. Beneath that are the options to browse movies, as that is a secondary action that many users might want to take. at the bottom of the options are about and delete, as these are actions that the user will hopefully be performing the least.

The button to search for new items has intentionally been left off the menu, as this is the most common action that the users should be taking and therefore will always be present in the navbar instead of concealed in a menu.

Most iteractions will take place in a modal window this will allow users to very quickly drop back to the list should they need to at any point. 

I intend to rely the users mental models of how web apps work by relying on conventions. Use of modals, sliding drawer menus and dropdowns to differentiate content.

### Skeleton Layer

My earliest inspiration for the watch-list ui was that of Google Keep. In fact you can still see it's influence heavily in the app.

Wireframes are included below or alternatively in the documentation folder in the github repo.

[**Mobile Wireframes**]()

[**Tablet Wireframes**]()

[**Laptop/Desktop**]()

### Surface Layer

#### Colours

In my choice of colours i chose to keep things quite simple. Initially i had planned to have movies, tv and tags to all be different colours and completely change the UI to match the selected item, however, felt that would detract from the app having a cohesive theme. Instead I decided to use one main colour, and shades of grey for secondary colouring. I decided to go with an orange/yellow color for the app as I felt that it is a colour that evokes positivity and optimism. 

As well as the orange color, i utilised some other color conventions, negative actions, like dislike or deleting use red icons, and positive actions, such as liking a movie are green.

#### Typeface

For headings I used the Google Font Bungee. I felt it creating quite a striking yet easy to read appearance.

For body text i opted for the Montserrat font, again from google fonts. I felt this font provided a nice contrast from the much bolder heading font. Additionally, despite it being sans-serif it's still very easy to read. 

#### Iteractions

Every clickable element on the app has a hover effects to ensure that it is clear to the user that it is infact a clickable item.

**Tooltips**: All buttons represented by icons have associated tool-tips that display on hover to make it clear what they do.

**Buttons**: All buttons darken on hover to identify that they are clickable. 

**Menu Items**: Menu items highlight in orange on mouse over, and darken when click on to show selection. Currently selected menu items are highlighted in grey.

**Search Results**: When moused over search results rise up towards the user to show that they are currently selected.(i.e scale up and display box shadow to create the illusion of floating.)

**Scrollable Elements**: use SimpleBar to create an on hover scrollbar that is less intrusive than the default one.

**Expandable Content**: rotate when clicked to show if content has been or can be expanded.

## Features

### Existing Features

#### Up To Date External Data

WatchList uses the TMDB API to get information about movies and TV shows used to create the movie and tv objects.
 
All API calls are handled by TMDB.js
 
As a free user Watchlist is limited to 10 API requests every 10 seconds. If this number is exceeded warning.js displays an error message and a countdown. 

#### Responsive Card Based Interface.

Users movies and TV shows are stored in the app as cards that will rearrange themselves for different display sizes, making the app completely responsive across all devices.

#### Search Movies, TV Show and Actors

* Search for Movies By Title - Users can search for Movies by title from the drop down menu.
* Search for Tv Shows by Title - Users can search for Movies by title from the drop down menu.
* Search for Movies by Actor - Users can search for an actor. On selecting that Actor the user can view a list of movies that they are in.

menu.js animates the add items dropdown menu and handles the click events for this menu.
popup.js renders the HTML for the pop box that is used by the search interface, and handles the event listeners for the search box
search.js uses tmdb.js to make the API calls and also provides a callback to render these search results in the pop window. It also handles pagination of search results.

#### Browse TV and Movies
* Browse highest rated movies
* Browse Movies in cinemas now
* Broswe Movies by Genre
* Browse highest rated TV shows
* Browse TV shows currently airing
* Broswe TV shows by Genre

The option to browse Movies and TV shows uses tmdb.js to make calls to the various API end points. Recommendations.js creates the cards and pagination of each of the preview items. 

#### Recommendations

When the user like an item the app will recommend more movies or tv shows based on their choice. For movies it will randomly select a movie of the same genre and a movie staring one of the top billed cast. For TV shows the app will call the discover API end point and discover shows with similar themes to the one that the user has liked. 

#### Watch History

The App will record how many Movies and Tv shows the user has liked and disliked in there time with watch-list. Additionally it tracks the last 5 movies and tv shows that the user has watched. On the tracking page there is also an overview of the current watch-list and users can see at a glance the number of movies and tv shows in the list. As well as having the opportunity to explore the list by genre.

### Features To be added in a future build

#### Games and Books

In my intial designs I planned to included books and games. Whilst I had this working in an earlier build the API's that i was using didn't work as intended. The google play books API gave very strange results and the the IGDB api was very very slow as it has to go through a proxy that i made in Node. [Hosted on REPL here](https://repl.it/@kev20006/IGDB-PROXY ). In the end I took out books and games, however, intend to make faster proxies for IGDB and ISBNDB in the future (After studying the backend part of the course) .

#### Share Watchlists or Tags

I think it would be very useful to be able to share watchlists or tags with other users. This would make the app more engaging. However this would require more than local storage.

#### Advanced Searching

The search is still quite simplistic, It would be good if users could search multiple criteria simulataneously.

#### Reminders

It would be useful if the app could send push notifications to remind you if one of your tv shows is about to come on.

## Technologies Used

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

## Testing

### Automated Testing

**A couple of caveats**
* Due to some dependency on previous inputs the testing will only work if done in order. Items are added using the add method these items are then removed using the remove method.

* Running the tests will reset the local storage of your current watchlist

Automated testing was carried out using the Jasmine testing suite and can be found in the testing folder in the repo. Alternatively clicking [here will open the jasmine tests](https://kev20006.github.io/watchList/Testing/SpecRunner.html?random=false)

The automated testing is carried out on the watchlist.js and utilityFunctions.js as these are the functions that do not rely on external APIs or modify the DOM or application state in anyway.

**Watchlist.js**: initialises, handles and stores the data used by the other scripts. 

**utilityFunctions.js**: contains a number of functions used throughout the app for converting data, string formats or generating random numbers. 

### Manual Testing

To begin manual testing, i completed the following actions to test my user stories.

#### Testing the User Stories

*Underneath each test I have included any bugs or fixes that were found. Minor bug fixes are just mentioned, larger issues are explained in more detail later in the document*

**User Story 1:** As an end user I should be able to search for movies

i. Click the + icon drop down
ii. Click the add movie.
iii. submit empty field - verify that the search doesn't send
iv. submit nonsense title - verify that no results are found.
v. search a valid title
vi. check pagination
 1. click next until there are no more results
 2. click back until i return to the first page
vii. View more information about the movie.
viii. Verify that correct information is displayed.
 1. only add and back buttons are displayed
 2. title, Description, Genres, Top 4 Cast are displayed
 
 **fixes on these tests**
*Minor*
Added shake and validation to the search.
Updated pagination so that only required buttons are rendered.
*Larger Fixes*
Bug Fix number 3 
Bug Fix number 4

**User Story 2**: As an end user I should be able to search for TV Shows
i. Click the + icon drop down
ii. Click the add movie.
iii. submit empty field - verify that the search doesn't send
iv. submit nonsense title - verify that no results are found.
v. search a valid title
vi. check pagination
 1. click next until there are no more results
 2. click back until i return to the first page
vii. View more information about the tv show.
viii. Verify that correct information is displayed.
 1. only add and back buttons are displayed
 2. verify that episode tracker is displayed
  1. verify that seasons are displaed.
  2. on clicking a season episodes are displayed
  3. on clicking an episode information about that episode  & the date it aired is displayed
 2. title, Description, Genres, Top 4 Cast are displayed

**fixes on these tests**
*Larger Fixes*
Bug Fix Number 6


**User Story 3:** As an end user I should be able to add a movie to my watch list
i. Add a Movie from the quick add button in the search. Verify that list renders with new item in it.
ii. Add a Movie from the item preview. Verify that list renders with new item in it.
iii. Add a Movie from Browsing Movies
iv. Add a Movie form a Recommendation
v. try to add a movie that is already in the list. Verify that it rejects

**fixes on these tests**
*Larger Fixes*
Bug Fix Number 1

**User Story 4:** As an end user I should be able to add a TV show to my watch list.
i. Add a TV Show from the quick add button in the search. Verify that list renders with new item in it.
ii. Add a TV Show from the item preview. Verify that list renders with new item in it.
iii. Add a TV Show from Browsing TV shows. Verify that list renders with new item in it.
iv. Add a TV Show form a Recommendation. Verify that list renders with new item in it.
v. try to add a movie that is already in the list. Verify that it rejects

**As Expected**

**User Story 5:** As an end user I should be able to remove items from my list
i. delete a movie from the card view
ii. delete a movie from the preview
iii. delete a tv show from the card view
iv. delete a tv show from the preview

**As Expected**

**User Story 6:** As an end user I should be able to save my watch list across multiple sessions
i. Refresh the browser. Verify Watch List contents are still there
ii. Refresh the browser. Verify Watch Likes, Dislikes and History are still there.
iii. Refresh the browser and Verify that unempty tags are still there
iv. Refresh the browser and verify that all notes, tags and episode tracking is still there.
i. Close and reload the browser. Verify Watch List contents are still there
ii. Close and reload the browser. Verify Watch Likes, Dislikes and History are still there.
iii. Close and reload the browser and Verify that unempty tags are still there
iv. Close and reload the browser and verify that all notes, tags and episode tracking is still there.

**fixes on these tests**
Bug Fix Number 7

**User Story 7:** As an end user I should be able to add a comment or note to things that I add to my list.
i. add a comment to an item then add it to my list.
ii. add a comment to an existing list item.
iii. Reload and validate my comments are still there.

**As Expected**

**User Story 8:** As an end user I should be able to add tags to items in my list to group them.
i. add a tag to a new item
ii. add a tag to an existing item
iii. add a tag from manage tags context menu
iv. add a existing tag to a new item
v. add a existing tag to an existing item
vi. add a duplicate tag
vii. add a blank tag
viii. delete a tag
ix. filter by tag
x. filter by empty tag - error message should be displayed.

**fixes on these tests**
when addiing tags to a new item, existing tags wouldn't display. Changed the order in which they are rendered.
Adding a new tag from context menu. + not an obvious button - added mouse over effect.


**User Story 9:** As an end user I should be able to filter my watchlist to show only one type of media
i. open the drawer menu - select movies - - verfiy only movies are displayed
ii. open the drawer menu - select tv shows - verfiy only movies are displayed

**As Expected**

**User Story 10:** As an end user I should be able to sort my watch list into custom categories

i. Already checked this when filtering tags - collections became tags after early user testing. The name collections confused the users, as they expected to be able to look through premade collections - this functionality was added to browser. Collections became tags.

**User Story 11:** As an end user I should be able to identify if I have watched a list item and whether or not i enjoyed it
i. Liking a movie adds a like to the watch history tracker
ii. Disliking a movie adds a dislike to the watc list tracker
iii. liking  <= 5 movies will display them all in the last 5 tracker, in order.
iv. liking 6 movies will displays the last 5 movies and discard the 1st movie in the last 5 tracker
i. Liking a tv shows a like to the watch history tracker
ii. Disliking a tv show adds a dislike to the watc list tracker
iii. liking  <= 5 tv shows will display them all in the last 5 tracker, in order.
iv. liking 6 tv shows will displays the last 5 movies and discard the 1st movie in the last 5 tracker

**As Expected**

**User Story 12:** As an end user I should be offered recommendations when I have Identified that I have watched something and enjoyed it
i. clicking like on an item shows 2 recommendations
ii. liking a movie should give 1 recommendation by actor
iii. liking a movie should give 1 further recommendation by genre
iv. liking a tv show should give 2 recommendations.
v. I can preview my recommendations to see an overview of the movie or tv show
vi. i can add movies and previews from my recommendations to my list

**As Expected**

**User Story 13:** As an end user I should be able to see an overview of my watch history
**User Story 14:** As an end user I should be able to identify if I have watched a list item and whether or not i enjoyed it

*13 and 14 have been covered in other tests. likes and history were covered in the testing for user storiy 11 *

**User Story 15:** As an end user I should be able to select the media I want to add from a list of suggestions.

i. I can browser a list of movies currently in theatres
ii. I can browser a list of top rated movies
iii. I can browse movies by genre
iv. I can browse a list of top rated 
v. I can get a list of movies by genre
vi. I can get a list of TV shows by Genre
vii. I can add an item and continue browsing without having to go back.

**As Expected**

#### UI/UX Testing

To test UX and to see how the UI performed on different devices I completed the same tasks (detailed below) on each device.

I searched for a movie and added it using quick add
I searched for a movie and added it using the full preview - with a note and a tag.
I added a movie using each of the browse options.
I added a movie by genre
I added a movie by actor
I searched for a tv show and added it using quick add
I searched for a tv show and added it using the full preview - with a note and a tag.
I added a tv show using each of the browse options.
I added a tv show by genre
I filtered my list showing only movies
I filtered my list showing only tv shows
I filtered my list to show only items marked with a tag
I liked 6 movies - to see if last 5 looked ok
i liked 6 tv shows - to see if last 5 looked ok
I added movies and tv shows from recommendations.
I checked the watch history.
I reloaded the app.

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

**fixes on these tests**
Pagination for browsing was done using a card similar to a movie card. Whilst this looked quite good on medium sized screens. It looked a bit odd on other devices. The browsing pagination controls were changed to a bar that sits below the last row of movie cards.

After completing this testing completed the same tasks again on the following devices.

1. Samsung A7 - 2016 - 6.0" display
2. Samsung S6 - 2017 -  5.6" screen
3. Levonvo Ideapad - windows 10 - connected to a 42" TV
4. Levonvo Ideapad - windows 10 - 16" Screen

**fixes on these tests**
Bug Fix Number 8.

Unfortunately I don't own a tablet, so testing on tablets could only be emulated.

### User Testing

I shared my app with the CI slack group, some of my colleagues at work and with my family at different stages of it's development in the following sections are details of bugs found and fixes applied.

#### Bugs & Bug Fixes
Below details a list of bugs found from user testing.

##### 1. Manually Having to Referesh The Page when items were added

**Status:** Fixed

**Details**
If the user added an item they would then have to manually referesh the page to see the items in the list.

**Fix**
This bug occured as a result of splitting the watchlist.js file into watchList.js to handle the model and watchListDom.js to update the DOM. The watchList.add method was called as a part of WatchListDom.add, to add data to list, however the render method was never called after the add took place. Render method added to WatchListDom.add fixed this.

#### 2. Frequent Annoying Pop-Up

**Status:** Fixed

**Details**
The first time the user opens watchlist the information and help screen is supposed to display, however it was continuing to display everytime a user visited the app.

**Fix**
The pop-up was displaying whenever a user had an empty list. However having an empty list doesn't guarantee a first time user. A boolean property called returningUser was added to the watchList to record whether it was a users first visit or not. clicking ok on the welcome message sets this value to true, this then prevents the pop-up displaying on future visits 

##### 3. Frequently Exceeeding API Request Limit

**Status:** Fixed

**Details**
App would frequently exceed it's API request limit.

Each search was creating an array of 20 movie or tv objects. This meant that each search or browser was making 21 requests. I for the search and then a further 20 to get the details of each object. 

**Fix**
Added a generic WatchItem constructor, constructor creates a partial movie or tv object only using details from the search resultswith enough information to render a card or a search result. this reduces the total number of API calls significantly. from 21 to 1 per search. Full movie/tv details are only requested by a a further APU call if the item is select or added to the list.

##### 4. Pagination Controls Not Working Correctly

**status:** identified

**Details**
The back button for search results doesn't work as expected when looking at Movies by Actor.
When the user selects an actor from the actor search to see the movies that they are in, the back button on the pagination controls don't respond.

**Fix**
pending...

##### 5. View more information generates a new movie item each time it is clicked

**status:** Fixed

**Details**
When a user clicks the more information button from a card in their watchlist, the app makes a new API request and creates a new instance of that move object instead of creating a preview of the movie or tv item from the list. This has led to any notes added getting lost and also like, dislike and delete buttons not working as expected. 

**Fix**
When the more info button is clicked the state card that triggered the click event is checked. If that card was generated by a preview or a recommendation an api call is made to get full move or tv info to display in the preview. If it is not a preview item, It is safe to assume that the card must be in the list and therefore the list item's own preview method can be renedered. 

##### 6 .Episode tracker doesn't work if a series doesn't have specials

**Status:** Fixed

**Details**
When a user tries to view epsiode information about a show that has no specials it reaches a 404 error. 

**Fix**
It was assumed that all series had a 0 series, which detailed special episodes. This was not the case. This variation between TV Shows led to some shows trying to treat series 1 as series 0. In these situations the API calls to fecth series information were returning with a 404. To fix this series id's are conditionally assigned based on whether or not the first series in the ep track is "season 1" or "specials". Additionally some more condiitonal statements had to be added to adjust array indexs when storing data and tracking episodes.

##### 7. Tags with deleted content persist on refresh.

**Status:** Fixed

**Details**
When a tag is loaded from local storaged with no contents it is supposed to be deleted to help declutter the app. However, If a movie has a tag and is then deleted, it's tag persists through garbage collection.

**Fix**
 When a list item is deleted, by calling the watchlist.remove method. It will check to see if the id of the item appears in any of the tags, if it does it will remove the id from each of the tags. Ny removing the ID from the tags, this will also cause any tags left empty to be caught by garbage collection the next time the app is loaded.

##### 8. Drawer Menu was longer than viewport.

**Status:** Fixed

**Details**
When using chrome on a mobile phone, the drawer menu would not adjust it's size when chrome's URL bar would display. This made it difficult to scroll to the bottom of the menu. 

**Fix**
It took a while to work out why this was happening. But it turns out that on mobile chrome VH units don't scale when the url bar is displayed. I changed the height of my drawer menu from 100vh to 100%, this fixed the issue.

## Deployment

The site has been deployed using github pages in the usual way.

* All app files were added to a git repo.
* The repo was pushed onto github.
* Guthub pages was enabled for the repository.
* The app live at https://kev20006.github.io/watchList/

If you want a local copy of this app you can clone this repo and open index.html. All files use relative paths so it shouldn't take any other configuration.

## Credits

### Content & Media

All content the site site is taken from TMDB through the use of their API. All copyrights of images and text belong to their respective owners.

### Acknowledgements

* My mothers little note book of movies was initial inspiration behind this project. And remains the true standard by which it must be compared.

* Google's Material Design was a big influence on the design of my app. And Google applications such as keep and google classroom have been quite influencial throuhgout.


 


