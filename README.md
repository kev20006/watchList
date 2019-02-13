# Watch-List (Working Title)

Have you ever seen a trailer for a movie or tv show only to forget it by the time you get home to watch it? Has your friend or colleague ever recommended an life changing book and the when you found time to look for it you couldn't remember what it was called? 

Watch-list is an app to help with exactly that. It allows you to record any books, films, movies and games that you want to remember and store them conviently in your webbrowser. Using a series of database API's watch-list will search for and store details of media that you want to watch later.

[check out the app here](https://kev20006.github.io/watchList/)

Watch list is a JAM stack Single Page Application that locally stores movies and tv shows for the user. 
 
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

In my choice of colours i chose to keep things quite simple. Initially i had planned to have movies, tv and tags to all be different colours and completely change the UI to match the selected item. 

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

* Movies and TV shows are stored as custom classes, with method to generate the HTML for their various states.
..these classes are defined in classes.js - the card, searchItem and itemPreview methods are used to generate all the TV and Movie object HTML elsewhere in the app

* The uses the TMDB api to get information about movies and TV shows used to create the movie and tv objects.
..All API calls are handled by TMDB.js

* Search for Movies By Title - Users can search for Movies by title from the drop down menu.
* Search for Tv Shows by Title - Users can search for Movies by title from the drop down menu.
* Search for Movies by Actor - Users can search for an actor. On selecting that Actor the user can view a list of movies that they are in.

**The above features are implemented in a number of places.**
* menu.js animates the add items dropdown menu and handles the click events for this menu.
* popup.js renders the HTML for the pop box that is used by the search interface, and handles the event listeners for the search box
* search.js uses tmdb.js to make the API calls and also provides a callback to render these search results in the pop window. It also handles pagination of search results.

* Browse highest rated movies
* Browse Movies in cinemas now
* Broswe Movies by Genre
* Browse highest rated TV shows
* Browse TV shows currently airing
* Broswe TV shows by Genre
