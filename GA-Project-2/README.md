# GA Project Two - Spotify API Podcast Hub Using A React Front End

Table of Contents:

- Project Overview
- Code Installation
- The Brief
- Technologies Used
- Approach Taken & Timeline
- Featured Code
- Bugs
- Wins and Challenges
- Key Learnings
- Future Content and Improvements

## Project Overview

---

A spotify podcast feed which provides the latest episodes to scroll through for the user. This feature does not currently exist in Spotify desktop at present. This was the first project created in collaboration with another team member. This app consumed the Spotify API to provide an easier way to discover your latest podcast episode releases, find all podcasts you are subscribed to, and easily search the podcast directory which at the time of creating this project were all features missing from the Spotify desktop app or were in extremely difficult to find sections.

We had 7 days to complete and present this project.

Live Version:

![Alt text](https://user-images.githubusercontent.com/64632596/132090747-48032083-ebb0-4fd9-8d19-d89dc6b0c445.png 'Podcast page')

## Code Installation

---

To run and use the app you will need to do the following:

- Create a spotify account if you don't already have one
- Upgrade your spotify account to a developers account via this link https://developer.spotify.com/dashboard/ and following the guide on this page https://developer.spotify.com/documentation/web-api/
- Create an app on the developer dashboard & add localhost:3000/ to the uri of the app
- In the SpotifyAuth.js change the clientID string value to the client id of the app you created
- Clone or download the repo. Original can be found here - https://github.com/thejamesgore/spotify-podcast-app
- Install the required dependencies by running the command `yarn` in terminal
- Start the server with the command `yarn start` in terminal

## The Brief

---

- Consume a public API - this could be anything but must make sense for the project
- Have several components - the project should be structured appropirately
- The app should have multiple pages and have routing
- Include wireframes designed before building the app

---

## Technologies Used

---

### API Used:

- Spotify - https://api.spotify.com

### Front-end:

- React
- JSX
- Axios
- Bulma
- CSS
- React Router Dom

### Dev tools:

- VS code
- Yarn
- Postman
- Git
- Github
- Google Chrome dev tools
- Evernote (Wireframeing)
- Netlify (deployment)

## Approach Taken & Timeline

---

Key Dates:

- Day 1-3 - Planning, Create Basic Structure, & Authorization
- Day 4-5 - Endpoints, Displaying Podcasts, Further Styling
- Day 6-7 - Display Episodes, Search Functionality, Further Styling

### Day 1-3:

Our initial vision was to create an alternate podcast UI for Spotify with our own twist, to have a list of your podcasts and be able to play the latest episodes easily from one place. We began to create wireframes settling on a simple multipage layout with our focus primarily on functionality and prioritising which features would enable us to hit our MVP. We divided responsbilities based on interests as we had similar aptitudes and decided to start to build the basics such as a home page, navigation bar, and a login button with some simple styling.

![Alt text](https://user-images.githubusercontent.com/83005220/146195285-9ce09968-434e-4d71-babf-03bcebb997b3.gif 'Login Page')

Due to the complexity and variety of features of the Spotify API a great deal of our time was then spent understanding the 4 different authorization methods available and which would be best suited for our project. Similar to my first project we understood this could be quite an undertaking and would stretch our abilities personaphied by our initial struggle during the first 3 days to purely get data back from the API. This was due to the authorization process, which upon reflection is quite straightforward, however we were missing one final key element that would enable us to proceed.

Once we managed to cross this final hurdle with the authorization process we were able to flesh out the basic structure and styling of the website. We both worked on the same aspects of the project up until this point pair coding, alternating where neccessary, as we believed these early stages were mission critical and two minds working to solve this problem would be better than one.

### Day 4-5:

Endpoints
Displaying podcasts
Styling

### Day 6-7:

Search functionality
Displaying episodes
Further styling

## Featured Code

---

Below is code from our SearchPage.js which has the functionality to not only search based on the users's search request but also render the results in a SearchCard subcomponent. Bar some tweaking this was completely my responsibility.

The search bar is displayed in the NavBar.js using an input which once a user submits a search query the user is pushed to SearchPage.js with their string in the browsers address bar.

The following code allows us to pull and format their search query from their address bar and store it as variable

```javascript
let string = window.location.pathname.substring(9)
```

A useEffect function triggers when the page loads but also when it's dependency variable `window.location.href` changes calling our handleSearch function. This is so if a user has submitted a search query whilst on another page we can render search results immediately by calling our handleSearch function but also if a user enters a new search query while already on this page too.

```javascript
useEffect(() => {
  handleSearch()
}, [window.location.href])
```

Next we use axios to call the Spotify search endpoint with our string variable passing in the access token stored in local storage during login via the `token` variable in the header.

```javascript
const token = localStorage.getItem('accessToken')
```

```javascript
axios.get(
  `https://api.spotify.com/v1/search?q=${string}&type=show&market=US&limit=25&offset=0`,
  {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }
)
```

We take the resonse from our API call and only store the show information from our data object in state using `setResults(response.data.shows)`. We also store any errors, console them out.

```javascript
   .then((response) => {
        setResults(response.data.shows)
      })
      .catch((err) => {
        console.error('there was an error fetching podcasts', err)
      })
    setSearchAddress(window.location.href)
  }
```

We then display this data using the SearchCard subcomponent and the show data stored in the state in the `results` variable. We used optional chaining `results?.items` as upon first render of the page there may be no data stored in this state thus giving an error when the page loads. Using a turnary we then conditionally rendered the data mapping over the SearchCard subcomponent.

```javascript
return (
  <div className="results-page">
    {results?.items
      ? results.items.map((item) => <SearchCard key={item[0]} {...item} />)
      : null}
  </div>
)
```

The full page can be found below.

```javascript
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchCard from '../components/SearchCard'
import '../styles/SearchPage.css'

function SearchPage() {
  const [searchAddress, setSearchAddress] = useState()
  const [results, setResults] = useState({})
  const token = localStorage.getItem('accessToken')

  const handleSearch = () => {
    let string = window.location.pathname.substring(9)

    axios
      .get(
        `https://api.spotify.com/v1/search?q=${string}&type=show&market=US&limit=25&offset=0`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        setResults(response.data.shows)
      })
      .catch((err) => {
        console.error('there was an error fetching podcasts', err)
      })
    setSearchAddress(window.location.href)
  }

  useEffect(() => {
    handleSearch()
  }, [window.location.href])

  return (
    <div className="results-page">
      {results?.items
        ? results.items.map((item) => <SearchCard key={item[0]} {...item} />)
        : null}
    </div>
  )
}

export default SearchPage
```

## Wins & Struggles

---

- Finally getting access to the API and pulling data back was a large win. Tackling the authorization processs was not easy. Of the many public API's available to us for this project some were much simpler even without authorization. We later discovered that the Spotify API was notoriously tricky to work with from other developers so managing to succeed through persistence and examining the thorough documentation was very rewarding.

- Our first largest struggle was sucessfully pulling data from the spotify api. The api has a multitude of authorization flows which allow a user to authenticate. We chose the simplest that met our functional requirements for the project however, once authorized we had mixed responses from our desired api endpoint most of which were 400, 401, 403, 500 mostly revolving around not being authenticated. This posed an interesting problem when debugging as we were recieving the access token back from the spotify api which we were using in all our api calls to various endpoints. What we discovered was this token was not being stored in local storage. This only took a few lines of code to solve once we understood this however, this only reduced the type of errors we recieved back when calling different api endpoints. Some endpoints would work while others would not. This was due to the way spotify api endpoints require the access token to be passed along with other requirements in the string. Once solved we could call any end point and recieve data back. This was quite a mountain to climb as without solving these problems we wouldn't be able to create our app and ended taking half the project time to solve.

## Bugs

---

1. Passing data from the podcasts page to the episodes page when a user clicked a podcast card.
2. Search bar functionality

While we have data from 1 endpoint we were unable call the second endpoint and fetch episode data. One main issue is transferring the ID from the Show endpoint to the Episodes endpoint. So for now, it's work in progress, however we have some solutions that would solve for this forexample utilising useParams or useHistory to capture the episode ID and then on the episodes page push the ID into an api call and get all the relevent episodes for that podcast.

This could be resolved by referencing the ID from the Podcast endpoint in the URL and passing it to the episodes endpoint.

Search bar functionality was quite a challenge as we encountered an issue that had multiple solutions all of which we tried but unfortunately due to the structuring and time constraints of our project meant that data wouldn't be able to be easily passed up or down our component tree without the use of React Redux or useContext which at the time we have zero experience or knowledge of however, given enough time we would've solved for.

Instead we found a simple solution which was to instead have the required data as a string which is passed into the browser address using useHistory which can then be pulled by a function on the componenet page we would've typically passed using props or an export function. This meant that the search bar functionality almost worked.

We were able to use the search bar once, call the function and push the user to results page however, if the user entered a new string into the search bar the functionality and access to the search function was lost as we were already on the rendered search results and the button lost functionality. To solve for this we had our useEffect function monitor any change in web address to recall our search function rather than the functionality on our NavBar.js which used a handleClick when the button was pressed to call the function directly.

## Key Learnings

---

Working with APIs with such complexity is not always easy but we now have a better understanding of the process of accessing APIs and fetching data to then handle. Altough it's fantastic to use such projects to maximize ones learning during the development process some of our initial plans were out of scope due to time consttraints such as using a global state management tool or implementing the player.

## Future Content and Improvements

---

- logout button
- show notes
- hide/show episodes button
- player to stream shows
- show episodes that user has not yet listned to
- when a user finishes listening to an episode it is removed from the list
- podcast queue
- ability for the user to organise episodes and reorder them
- adding shows from the search list
