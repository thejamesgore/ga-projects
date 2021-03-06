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

A podcast feed using the Spotify API that allows the user to easily see all the podcasts they're presently subscribed to and the latest episodes for those shows. At the time of development this feature was extremely difficult to find in the Spotify desktop app which we were both avid users of and enjoy using to listen to podcasts.

This was a collaborative two person project with a 7 day time frame to complete and present our work.

Please use the following credentials to login to the live version:

- username: login@testlogin.com
- password: thejamesgore

Live Version: https://thejamesgore-project2.herokuapp.com/

Original Repository With Full Commit History: https://github.com/thejamesgore/spotify-podcast-app

![Alt text](https://user-images.githubusercontent.com/83005220/147563185-f805bcb3-1541-4b29-877f-55388d9d0d5c.png 'Podcast page')

## Code Installation

---

To run and use the app you will need to do the following:

- Create a Spotify account if you don't already have one
- Upgrade your Spotify account to a developers account via this link https://developer.spotify.com/dashboard/ and following the guide on this page https://developer.spotify.com/documentation/web-api/
- Create an app on the developer dashboard & add localhost:3000/ to the uri of the app
- In the SpotifyAuth.js change the clientID string value to the client id of the app you created
- Clone or download the repo. Original can be found here - https://github.com/thejamesgore/spotify-podcast-app
- Install the required dependencies by running the command `yarn` in terminal
- Start the server with the command `yarn start` in terminal

## The Brief

---

- Consume a public API - this could be anything but must make sense for the project
- Have several components - the project should be structured appropriately
- The app should have multiple pages and have routing
- Include wire frames designed before building the app

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

- Visual Studio Code
- Yarn
- Nodemon
- Postman
- Git
- Github
- Evernote (Wireframeing)
- Netlify (deployment)

## Approach Taken & Timeline

---

Key Dates:

- Day 1-3 - Planning, Create Basic Structure & Styling, & Authorization
- Day 4-5 - Endpoints, Display Podcast Feed, Styling
- Day 6-7 - Display Episode Feed, Search Functionality, Further Styling

### Day 1-3:

As a team collaboration we decided to use the Spotify API for our project as we both used Spotify and found some elements to be lacking in the desktop version. We both knew this would be a challenging yet fun project to undertake that would push our ability and provide the most opportunity for learning and growth with our coding. We used Zoom and screen sharing throughout the development process as we were both working remotely.

We started planning what features we would love to use ourselves and filtered those down to what would be appropriate for our project. We then began to create wire frames settling in on a simple multipage layout with our focus primarily on functionality and prioritising which features would enable us to hit our MVP. We initially began pair coding alternating every hour or so to start to build the basics such as a home page, navigation bar, and basic styling to give us a starting point to both work from. I created the login button with functionality, search bar, and styling using Bulma while Clem, my team partner, further built out the site structure and basic navigation.

### Wire frame:

![Alt text](https://user-images.githubusercontent.com/83005220/146286111-da4a1b46-657c-4f8d-8b1d-f08aad39bae2.png 'Wire Frame')

We then turned our attention to authorisation.

Due to the complexity and variety of features of the Spotify API, a great deal of our time was then spent understanding the four different authorisation methods available and which would be best suited for our project. However this was quite a hurdle initially and took much longer than expected to complete. This was due to our authorisation process missing some key elements that would enable us to proceed and successfully get data back from the API. This is detailed further in the Wins & Challenges section.

There are two functions below that are in the SpotifyAuth.js that I created. These parse the data that is received from the Spotify API found in the url and contains the bearer token. `SpotifyAuth` stores the token in local storage and pushes the user to the podcast page upon successfully logging in.

```javascript
// This function parses the string provided by Spotify which contains the bearer token and just returns the token
const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1)
  const paramsInUrl = stringAfterHashtag.split('&')
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split('=')
    accumulater[key] = value
    return accumulater
  }, {})
  return paramsSplitUp
}

// This function places the bearer token in local storage
const SpotifyAuth = () => {
  const history = useHistory()

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash)

      localStorage.clear()

      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('tokenType', token_type)
      localStorage.setItem('expiresIn', expires_in)
      history.push('/podcast')
      if (history.location.pathname === '/podcast') {
      }
    }
  })
```

Once we managed to cross the final hurdle with the authorization process we were able to get data back from the API. We both worked on the same aspects of the project up until this point pair coding, alternating where necessary, as we believed these early stages were mission critical and two minds working to solve the issues posed collaboratively would be more constructive.

### Landing Page:

![Alt text](https://user-images.githubusercontent.com/83005220/146195285-9ce09968-434e-4d71-babf-03bcebb997b3.gif 'Login Page')

### Day 4-5:

We next split responsibilities to focus on different aspects of the project to catch up on development time such as building the podcast page, the episode page, and the sub components that would be used across the site. Development was much more expeditious as we were able to handle the data from the Spotify API more effectively. Clem worked on the card components while I worked on the podcast page utilizing Axios, however we helped each other where necessary through pair coding.

We were able to hit our MVP on day 5 as we had planned to originally.

### Podcasts Page:

![Alt text](https://user-images.githubusercontent.com/64632596/132090747-48032083-ebb0-4fd9-8d19-d89dc6b0c445.png 'Podcast page')

### Day 6-7:

We were able to easily create the episodes page as the layout was not too dissimilar from the podcasts page allowing us to use the same sub components, however the functionality slightly differed. Clem worked on the episodes page providing which had a bug when clicking from the podcast page that we were unable to solve for completely which is detailed in the bug section. I focused on the search functionality which was slightly challenging due to how the page would initially render without data that I was able to solve using optional chaining. Lastly we added some finishing touches to the styling and presented our project.

### Search Page:

![Alt text](https://user-images.githubusercontent.com/64632596/132090824-6d1aa6d9-7eb6-4198-af31-3d232bae2be7.png 'Search page')

## Featured Code

---

Below is the code from the SearchPage.js which I was responsible for creating.

The search bar is displayed in the NavBar.js using an `input`. When a user submits a search query `useHistory` pushes the user to SearchPage.js with the query as a string in the address bar.

The following code allows us to pull and format the search query from the address bar and store it as a variable.

```javascript
let string = window.location.pathname.substring(9)
```

A `useEffect` function triggers when the page loads but also when it's dependency variable `window.location.href` changes calling our `handleSearch` function.

```javascript
useEffect(() => {
  handleSearch()
}, [window.location.href])
```

Next we use Axios to call the Spotify search endpoint with our string variable passing in the access token stored in local storage during login via the `token` variable in the header.

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

We take the JSON response from our API call and store this data object in some state using `setResults(response.data.shows)`. We also store any errors and console them out.

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

We then map this data over the SearchCard sub component using the `results` variable. Optional chaining was used in conjunction with a ternary statement on `results?.items` as upon first render of the page there may be no data stored in this state variable, thus avoding a page error upon load.

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

## Wins & Challenges

---

Authorisation was the largest challenge. The API has a multitude of authorisation flows which allow a user to authenticate. We chose the simplest that met our functional requirements for the project. Despite this we did encounter a range of errors which were 400, 401, 403, & 500.

This posed an interesting problem when debugging as we were receiving the access token back from the Spotify API. What we discovered was this token was not being stored in local storage correctly nor passed on with our access requests. This only took a few lines of code to solve once we understood this.

We also discovered some endpoints would work while others would not. This was due to the way Spotify API endpoints require the access token to be passed along with other requirements in the string. Once solved we could call any end point and recieve data back successfully.

## Bugs

---

- Episodes page

## Key Learnings

---

- Importance of structuring app so logic such as API calls, token handling, authorisation, are all separate from data mapping
- Usage of key React hooks such as `useState()` & `useEffect()`
- Routing pages using React-Router-Dom & structuring the React app into subcomponents
- Naming conventions are important as they help with the single responsibility principle
- Team collaboration greatly aids collective motivation and ability to meet deadlines in a timely fashion
- Different perspectives enable efficient and creative problem solving, enhancing ones own learning and understanding

## Future Content and Improvements

---

- Logout button
- Show notes
- Hide/show episodes button
- Player to stream shows
- Show episodes that user has not yet listened to
- When a user finishes listening to an episode it is removed from the list
- Podcast queue
- Ability for the user to organise episodes and reorder them
- Adding shows from the search list
