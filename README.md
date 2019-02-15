# Watch-List (Working Title)

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

To test how the varous views rendered into the DOM I conducted manual testing. For the first round of manual testing I completed the following tasks on my desktop computer. (This computer is running windows 10, and uses a display resolution of 1920 x 1080).
On this computer I tested the app on the following:

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

After completing this testing completed the same tasks again on the following devices.

1. Samsung A7 - 2016 - "screen
2. Samsung S6 - 2017 - "screen
4. Tablet
5. Levonvo Ideapad - windows 10 - connected to a 42" TV
6. Levonvo Ideapad - windows 10 - 16" Screen

#### Tasks



### User Testing

I shared my app with the CI slack group, some of my colleagues at work and with my family at different stages of it's development in the following sections are details of bugs found and fixes applied.

#### Bugs & Bug Fixes
Below details a list of bugs found from user testing.

##### Manually Having to Referesh The Page when items were added

**Status:** Fixed

**Details**
If the user added an item they would then have to manually referesh the page to see the items in the list.

**Fix**
This bug occured as a result of splitting the watchlist.js file into watchList.js to handle the model and watchListDom.js to update the DOM. The watchList.add method was called as a part of WatchListDom.add, to add data to list, however the render method was never called after the add took place. Render method added to WatchListDom.add fixed this.

#### Frequent Annoying Pop-Up

**Status:** Fixed

**Details**
The first time the user opens watchlist the information and help screen is supposed to display, however it was continuing to display everytime a user visited the app.

**Fix**
The pop-up was displaying whenever a user had an empty list. However having an empty list doesn't guarantee a first time user. A boolean property called returningUser was added to the watchList to record whether it was a users first visit or not. clicking ok on the welcome message sets this value to true, this then prevents the pop-up displaying on future visits 

##### Frequently Exceeeding API Request Limit

**Status:** Fixed

**Details**
App would frequently exceed it's API request limit.

Each search was creating an array of 20 movie or tv objects. This meant that each search or browser was making 21 requests. I for the search and then a further 20 to get the details of each object. 

**Fix**
Added a generic WatchItem constructor, constructor creates a partial movie or tv object only using details from the search resultswith enough information to render a card or a search result. this reduces the total number of API calls significantly. from 21 to 1 per search. Full movie/tv details are only requested by a a further APU call if the item is select or added to the list.

##### Pagination Controls Not Working Correctly

**status:** identified

**Details**
The back button for search results doesn't work as expected when looking at Movies by Actor.
When the user selects an actor from the actor search to see the movies that they are in, the back button on the pagination controls don't respond.

**Fix**
pending...

##### View more information generates a new movie item each time it is clicked

**status:** identified

**Details**
When a user clicks the more information button from a card in their watchlist, the app makes a new API request and creates a new instance of that move object instead of creating a preview of the movie or tv item from the list. This has led to any notes added getting lost and also like, dislike and delete buttons not working as expected. 

**Fix**
When the more info button is clicked the state card that triggered the click event is checked. If that card was generated by a preview or a recommendation an api call is made to get full move or tv info to display in the preview. If it is not a preview item, It is safe to assume that the card must be in the list and therefore the list item's own preview method can be renedered. 


 

