# Spotify API Podcast App with React

## Original intent:

Create a podcast feed which brings up the latest episodes to scroll through for the user. This feature does not currently exist in Spotify desktop at present.

## MVP:

- get user to log into Spotify
- display shows

## Bonus:

- search bar
- display episodes
- podcast player

Our initial vision was big and bold, to basically create an alternate podcast UI for Spotify with our own twist. The idea was to have a list of your podcasts and be able to play the latest episodes. This is doable, but in the end, outside the scope of this project. If we had more time we could have potentially added a player to stream the shows using the Spotify SDK.

# Running the app

To run the app you will need to do the following

- a spotify developers account https://developer.spotify.com/documentation/web-api/
- a client id from the developers account
- to add localhost:3000/ to the uri of your develoeprs account if running from your local machine or the address this would be hosted
- if you want to add a player: https://developer.spotify.com/documentation/web-playback-sdk/

## `yarn add`

This will run and install the neccessary modules required for the app to run

## `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Further reading:

- implicit grant authorisation flow: https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
- podcast endpoints: https://developer.spotify.com/community/news/2020/03/20/introducing-podcasts-api/

https://user-images.githubusercontent.com/64632596/132091051-61c9c319-efdc-4f4a-9a6e-91bcb799b105.png

## Where we ended up:

We managed acheive our MVP and added some additional functionality such as a search bar.
There is a colourful UI with functionality to log in, browse your shows and search the spotify catalogue. A desirable feature would be to link the episodes of a show and add the new shows from the search results to the existing list of shows.

## Screenshots and Wireframes

We took screenshots to show the end stage of our app for the login, show, episodes and search pages.

The wireframes represent the original intent (grey background) and the end stage of teh app (white background)

## Login:

![Alt text](https://user-images.githubusercontent.com/64632596/132090881-836463f4-99cf-448d-b182-3418cde9d090.gif 'Login Page')

## Podcast page:

![Alt text](https://user-images.githubusercontent.com/64632596/132090747-48032083-ebb0-4fd9-8d19-d89dc6b0c445.png 'Podcast page')

## Episodes page:

![Alt text](https://user-images.githubusercontent.com/64632596/132094747-edbec160-0fc4-467e-bd41-e656259d0910.png 'Episodes Page')

## Search page:

![Alt text](https://user-images.githubusercontent.com/64632596/132090824-6d1aa6d9-7eb6-4198-af31-3d232bae2be7.png 'Search Results Page')

## Highlights:

Getting access to the API and pulling data back: the process of access Spotify's API is not easy and wrestling with the code and frequent reviews of the docs we managed to get a working solution to handle the API data. It's a good first attempt at working with the Spotify API and may be the starting point of other Spotify based projects.

## Struggles:

Our first initial hurdle was sucessfully pulling data from the spotify api. The api a multitude of authorization flows which allow a user to authenticate. We chose the simplest that met our functional requirements for the project however, once authorized we had mixed responses from our desired api endpoint most of which were 400, 401, 403, mostly revolving around not being authenticated.

This posed an interesting problem when debugging as we were recieving the access token back from the spotify api which we were using in all our api calls to various endpoints. What we discovered was this token was not being stored in local storage. This only took a few lines of code to solve once we understood this however, this only reduced the type of errors we recieved back when calling different api endpoints. Some endpoints would work while others would not. This was due to the way spotify api endpoints require the access token to be passed along with other requirements in the string. Once solved we could call any end point and recieve data back. This was quite a mountain to climb as without solving these problems we wouldn't be able to create our app and ended taking half the project time to solve.

## Following this there were two further problems once we were able to reach our MVP.

1. Passing data from the podcasts page to the episodes page when a user clicked a podcast card.
2. Search bar functionality

While we have data from 1 endpoint we were unable call the second endpoint and fetch episode data. One main issue is transferring the ID from the Show endpoint to the Episodes endpoint. So for now, it's work in progress, however we have some solutions that would solve for this forexample utilising useParams or useHistory to capture the episode ID and then on the episodes page push the ID into an api call and get all the relevent episodes for that podcast.

This could be resolved by referencing the ID from the Podcast endpoint in the URL and passing it to the episodes endpoint.

Search bar functionality was quite a challenge as we encountered an issue naitive to javascript that had multiple solutions all of which we tried but unfortunately due to the structuring of our project meant that data wouldn't be able to passed down our component tree without the use of Redux or useContext which presently have zero experience or knowledge of however, given enough time we would've solved for.

Instead we found a simple solution which was to instead have the required data as a string which is passed into the browser address using useHistory which can then be pulled by a function on the componenet page we would've typically passed using props or an export function. This meant that the search bar functionality almost worked.

We were able to use the search bar once, call the function and push the user to results page however, if the user entered a new string into the search bar the functionality and access to the search function was lost as we were already on the rendered search results and the button lost functionality. To solve for this we had our useEffect function monitor any change in web address to recall our search function rather than the functionality on our NavBar.js which used a handleClick when the button was pressed to call the function directly.

## What we would like to add to the project:

- making search and x icons function for search bar
- logout button
- show notes
- hide/show episodes button
- player to stream shows
- show episodes that user has not yet listned to
- when a user finishes listening to an episode it is removed from the list
- podcast queue
- ability for the user to organise episodes and reorder them
- adding shows from the search list

## What we learnt:

Working with APIs is not always easy but we now have a better understanding of the process of accessing APIs and fetching data to then handle it. What was useful is that Spotify has extensive documentation which makes it helpful as a guide. However, we found that looking at other projects helped to solidify how to approach various tasks with practical examples, using the API 'in the wild'.

You can also easily get sucked into trying to reacreate your own version of Spotify. Know where you end and Spotify begins..

## Would we recommend trying this?

Yes, if you're ready to spend time understanding the API, you will be rewarded with the rich data available.

C'mon it's Spotify dude, give it a go!
..Ta da dum da dum dum
