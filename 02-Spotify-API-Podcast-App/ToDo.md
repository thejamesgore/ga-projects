Getting the MVP done:

- login
- getting the data from the api

Next steps:

1 - Login

- get the authorisation to work:
  to resolve - error 400 message: "Only valid bearer authentication supported" linked to the code in PodcastIndex line 14
  error 401 message: "Invalid access token"

  - for a reference use the curl and bearer token generated in spotify web console
  - Implicit grant flow: https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
  - Playback sdk: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

  - pass token to local storage

    - setToken - find out what the difference is between set and get token
    - getToken
    - getPayload - find out what this does

  - make api call in a useEffect and check for token in local storage

- push to new page for podcasts
- (get the keys to not show)

2 - Podcast List

add in route for podcasts - done
fetch user shows - done
understand structure of json data - had a look in api console - done
create PodcastCards to display user shows - created but have no data to return - done

- once logged in, do fetch
- API call - wrote up api call but getting http 400 error: Bad Request - The request could not be understood by the server due to malformed syntax.
- then build out functionality
- fetching the podcast list - hard coded for display purposes? poss not needed, there is endpoint to fetch this once initial call is successful

  - don't need to hard code
  - will be using show ID to generate the episode list
    - function to isolate the show ID
    - export this and have the function update the ID of the endpoint to get the episodes of the different shows
    - hide the episodes route until the user clicks on the shows
      Get a list of the current user’s saved shows: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-saved-shows
      GET https://api.spotify.com/v1/me/shows
      Use this endpoint to fetch the podcasts that a user has subscribed to.

  useHistory for continuity? may come later
  use data, setData and state for info?
  add in objects for request? did this in PodcastCard component, may need checking with api dev console

dynamic Route
adds
pull out a separate request
useParams
separate page where I'm calling endpoint with id
do whats happening in cheeseboard for cheese-show / cheese edit

3 - styling - 1/9/2021: James doing some styling for nav and login buttons

- do login page

Additional features:

4 - search bar

5 - Player

=============

Todo:

- confirm Spotify API
- discuss APIs and functionality
  - search
  - player
  - source :
    - podcasts from Episodes API
    - Library API
- application idea: - use CRUD - create - read - update - delete - user to login - feed which brings up the latest episodes to scroll through for the user - player - search for shows and add them to the list of shows
  - functionality wish list:
    - player: put it in all sections
    - main page
      - central feed with list of episodes
      - left column with shows
      - right column with show notes - find?
      - when you finish listening to the episode it gets removed from the list
      - podcast queue
      - organise episodes and reorder them
    - search page
      - large search bar
      - list of new shows rendering with icon and name inside rectangle
      - categories
        - categories in left hand nav of search screen
        - display list of podcasts from selected category
        -
    - single show:
      - main icon
      - title
      - additoinal info
      - add episodes to podcast queue
    - Bonus: put in apstore
- Fun UI:
- wireframe
- what the first steps look like
  - get react app
  - basic outlines and components
  - 1st fetch from api
- discuss responsibilities
- create github repo
- what resources are availalable for sharing screen
