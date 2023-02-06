# team057-GameFinder

## Basic Information

|   Info      |        Description     |
| ----------- | ---------------------- |
| TeamID      |        Team-057        |
| TeamName    |         NYRN (GameFinder)          |
| Captain     |  Navin Ranganathan     |
| Captain     |  navinr2@illinois.edu  |
| Member1     |      Rahul Bhatt       |
| Member1     |  rahulb3@illinois.edu  |
| Member2     |  Nimish Mathur         |
| Member2     | nimishm2@illinois.edu  |
| Member3     |     Chen Yue           |
| Member3     |   yuec12@illinois.edu  |

## Project Information

|   Info      |        Description     |
| ----------- | ---------------------- |
|  Title      |       GameFinder       |
| System URL  |      link_to_system    |
| Video Link  |      link_to_video     |

## Project Summary

**Project Summary:**

Our video game search engine, GameFinder, is designed to help users find the perfect game for their preferences and computer specifications. With GameFinder, users can input specific characteristics they are looking for in a game, such as genre, setting, or playstyle, and their computer specs, such as graphics card and RAM. The search engine will then generate a catalog of games that match the user's criteria, ensuring that they find a game that not only fits their interests but also runs smoothly on their computer. Whether you're looking for a fast-paced action game or a relaxing puzzle game, GameFinder has you covered. Say goodbye to endless scrolling through game listings and hello to a tailored, efficient search experience. It’s always game time. 


**Details About Data:**

Game Finder, will use the “Steam Game” dataset. The dataset itself includes 78 columns with different information about games within the Steam platform. These features range from release dates to specific specs about the game. The dataset also includes 13,358 entries. These entries contain the various games on Steam that can be downloaded/ played.


The specific dataset can be found at games-features.
Link: https://docs.google.com/spreadsheets/d/1m10Zkm07WIkGzwi36it0g4Fkuw5xx5Q68hCinRHxIx8/edit#gid=1578928233 


With this database, we plan to highlight different features of games currently available on the Steam platform. 

**Detailed Functionalities:**


Filtering games based on provided preferences: 

This is the most important function of this application. We will provide dropdown menus, check boxes, or text input fields for users to select their preferences easily. We can then use these inputs to filter out irrelevant games. 

Our categories should include:
- Game genre. (This is the most important feature. For this category, we can use check boxes so that users can select multiple genres for more specific filtering. 
- Platform. (e.g. Windows, MacOS, PS5…)
- Language. (English, Spanish, etc.)
- Content Ratings. (e.g. PG, R, …)
- Price range. (We can use text input here for convenience. )
- Minimum requirements. (Instead of asking users to look up the requirements for specific games, we offer this filter so that they can find games that can run on their computer directly.)


Searching specific games by name: 
As a powerful game searching engine, we will offer ways to search games based on the given text. We will try to implement vague search if possible. 


Sort outputs based on different algorithms:
After users create their own query, we should display the games in a list. And order matters! So we can either sort the list based on real players ratings/reviews, or display games randomly to help discover more games in this world. 


The web application will also have 3-key user interfaces:

- Super User: Similar to an admin user, this will be a user who has many capabilities. Simple functions that they have will include adding/ deleting games that are no longer available on Steam. Their more complex capabilities include being able to look at registered users. This interface will allow them to see information about the user and allow them to delete inactive users.

- Registered User: Registered users will be referred to as individuals who create an account using our web application. This will allow for users to save preferences about games they enjoy, star those of interest to them, and more complexly save inputs regarding the specs of their computer. This will allow them to more easily “pick-up where they left off” and scroll through games of interest to them. This will be done using filters of game release dates, genre, et cetera.

- Guest: For users only interested in one or two time uses on our web application, this mode offers all the same functionalities and capabilities of a registered user but without saved memory. This essentially means users inputting specs about their laptops won’t be saved if they refresh the page or come back to the site later. Similarly, they would not be able to favorite games of interest. 




