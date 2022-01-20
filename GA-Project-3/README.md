# GA Project Three - TravelApp - Backend & Front End Utilizing JavaScript & React

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

An app to track your travels and share with the travel community your experiences with a members dashboard featuring a map with a drop pin of each location visited, a status bar to track how many countries traveled to so far, and a subsection with each trip a user has been on with their comments of how the trip went.

This was a collaborative three person project which I lead with a 14 day time frame to complete and present our work.

![Alt text](https://user-images.githubusercontent.com/83005220/147380884-179a6852-6e46-4678-bf6c-a0cde15436c2.png 'Landing Page')

Live Version: https://ga-project3-530d2.firebaseapp.com/

Please feel free to login using the following credentials:

- email: jamestkirk@gmail.com
- password: pass123

Original Repositories With Full Commit Histories

- https://github.com/thejamesgore/ga-project-3-back-end
- https://github.com/thejamesgore/ga-project-3-front-end

## Code Installation

Clone or download the repo then in your Terminal run the following commands:

- Install dependencies in the backend folder `yarn`
- Start the database in the backend folder `yarn start`
- Change into the frontend folder `cd frontend`
- Install dependencies in the frontend folder `yarn`
- Run the front end `yarn start:client`

---

## The Brief

---

- Build a full-stack application by making your own backend and your own frontend
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate frontend built with React
- Be a complete product which most likely means multiple relationships and some CRUD functionality for at least a couple of models

## Technologies Used

---

### Back-End:

- Express
- MongoDB
- Mongoose
- Mongoose Hidden
- Mongoose Unique Validator
- Jsonwebtoken
- Bcrypt
- CORS
- Dotenv

### Front-End:

- React
- JSX
- Axios
- CSS
- React Router Dom
- React Map GL
- React Geocode
- Pexals Photo API
- Babel

### Dev Tools:

- Visual Studio Code
- Yarn
- Webpack Dev Server
- Nodemon
- Postman
- Git
- Github
- Figma
- Trello
- Zoom

## Approach Taken & Timeline

---

Key Dates:

- Day 1-3 - Planning, Creating Basic Backend, User Models, Controllers, & Seed Data
- Day 4-7 - Adding Further Middleware, Endpoints, Authorization, Secure Routes, & Testing Endpoints In Postman
- Day 8-9 - Creating Basic Layout, Calling Endpoints Using Axios, Responsive Search
- Day 10-14 - Mapping User Data, Expanding Members Dashboard, Adding 3rd Party APIs

### Day 1-3:

We decided the first week should be dedicated to project planning and fleshing out the backend, while the second week focused on creating the frontend. Initially we brainstormed ideas, settling on creating a travel app early on and then further brainstorming features our project should have. We then used Figma to create a basic design displaying each page we would create and their sub components.

![Alt text](https://user-images.githubusercontent.com/83005220/147378251-4d6d1835-4c1e-4931-9450-c031b91d41fb.png 'Figma')

We then set up a Trello Kanban board to enable agile working with a backlog of tasks ranked and assigned to each member of the team, most of which were group tasks to begin with, so we could hone in on the models we would need based on the project requirements, and have a base backend from which we could then work on separately.

For the sake of simplicity and an expeditious initial coding experience, we group coded using VS Code Live Share and Zoom to create the base backend database using Express and MongoDB. We took turns to code different aspects of the same element of our backend before moving on to work individually. This ensured a smooth coding experience and also allowed us to allocate days to our timelime for problem solving.

After settling on our models for the project, we then assigned different responsibilities on our Kanban board that would not conflict with each other while using VS Code Live Share to develop different aspects of the backend at the same time to ensure functionality at this early stage. We took one model each, then focused on creating the relevant controllers for each model, shared our work with the group, created the seed data together and tested it successfully.

Below is our Trello Kanban board post project completion.

![Alt text](https://user-images.githubusercontent.com/83005220/147378181-f9230e4a-d742-49de-a22e-28c8f29f6206.png 'Trello Kanban Board')

### Day 4-7:

From here as a team we were able to develop the different aspects of the backend we were individually responsible for at a similar pace helping each other as we went, pushing and merging code when we hit significant milestones. This meant we spent a suitable amount of time checking each others work for quality assurance and to allocate time for testing.

We applied further middleware to ensure functionality such as CORS and environment variables using DotEnv and proceeded to create our endpoints, authorisation, and secure routes. My focus, after adding some key endpoints, was to create a secure route using JSON Web Token and DotEnv to enable registration & login on the frontend and endpoints that require a bearer token to access.

```Javascript
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config();

//make sure that the user making the request has a valid token
async function secureRoute(req, res, next) {
  try {
    //get the token from the headers
    const authToken = req.headers.authorization;

    //if there is no token or the string doesnt start with Bearer, return anathorised
    if (!authToken || !authToken.startsWith("Bearer")) {
      return res
        .status(401)
        .send({ message: "Not authorized to perform this funciton" });
    }

    //strip the Bearer part of the token out as it doesnt hold any data

    const token = authToken.replace("Bearer ", "");

    console.log("🤖 AUTHTOKEN" + " " + authToken);
    console.log("🤖 STRIPPED TOKEN" + " " + token);

    //try to extract the data on the token using the secret. Also handles errors


    jwt.verify(token, process.env.SECRET, async (err, data) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      console.log("RESPONSE FROM JWT IS >>> ", data);

      //find the user by id using the id on the token (set in the user controller)

      const user = await User.findById(data.userId);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      //object level permissions - we will come back to this later
      req.currentUser = user;

      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Unauthorized user!!" });
  }
}

export default secureRoute;
```

I set up a postman workspace so if any member of the team wished to test any functionality locally they would be able to. However, we mostly used Zoom and postman on my machine for time efficiency. We tested our endpoints with and without a bearer token for those that were and were not locked down by our secure route.

![Alt text](https://user-images.githubusercontent.com/83005220/147378515-e67aa3af-abc5-4705-aa3f-862739922330.png 'Postman')

### Day 8-9:

Similar to our initial approach creating our backend, we coded as a group and initialized our React frontend locally on my machine, using Zoom and VS Code Live Share to edit the same project file. This ensured a functional base frontend we could push to Git Hub before we worked on components individually. We created a simple layout, functionality to call our backend using Axios, and the basics of responsive search on our countries page. From here my focus was on the members dashboard while my team created other aspects of the app, such as CountriesCard component and responsive search.

### Day 10-14:

I created the members dashboard settling on using React Map GL due to users being able to have 10,000 API calls per month for free compared to Google, which past a certain amount of API calls will charge for usage. Despite this I would end up having to use the Google API regardless. I created a basic form to create trips and post data to our database. However this highlighted one issue with our models which was comments. This meant we had to revisit our backend and tweak our models to enable comments to be posted correctly. This was partly due to the fact we have a many-to-many relationship between the models in our database.

This was challenging as we were unsure why we were facing this issue. Although I spent some time identifying the problem using postman and revisiting the backend with my team, once we understood why we were unable to post comments my focus returned to the members dashboard. I was able to use the CountriesCard component my team had made and map all the countries a user had visited over the component creating members cards giving details of their trip.

Then I hard coded data into the map component to display drop pins to demonstrate that conceptually the map component is operating successfully. The next challenge was turning the user data from the database into latitude and longitude coordinates that the map component would then be able to display.

Ultimately I used Google Geocode API which allows one to send a string of a location and receive back a multitude of data, some of which were the latitude and longitude for that location. Once that data was sent back from Google Geocode I simply set it into some state and passed it down through props which mapped it over the map sub component on the dashboard page.

![Alt text](https://user-images.githubusercontent.com/83005220/147378202-aa12e86a-b9ee-46f5-9cb5-fc1e33bba0d1.png 'Members Dashboard')

I also wanted to make the Country Cards of each location a user had visited more interesting, so I searched for image APIs which served an image if a user submitted a location. I used Pexals Image API as it was free and seemed to produce the most accurate images based on the string, however it is not perfect and sometimes provides a seemingly unrelated image. Here I found two more bugs. When a user first logs in, all the drop pins on the map will not render unless the map is moved by the user. Secondly environment variables were not working when using DotEnv and, as we were still trying to fix the backend comments issue, we decided to hard code the API keys and clean up the code once we were able to.

![Alt text](https://user-images.githubusercontent.com/83005220/147378205-dbf4ff22-c232-4f36-b00d-b774a0fc5f6b.png 'Members cards')

Lastly I created a progress bar of countries visisted while my team worked on styling the rest of the website, finishing responsive search and creating the login and register pages which I styled to match the members dashboard.

![Alt text](https://user-images.githubusercontent.com/83005220/147378212-663cd9e6-dd77-423a-8c9a-84ee45f7f25e.png 'Register Page')

## Featured Code

---

As I was responsible for the members dashboard, below are some key excerpts I am proud of that allow our API to be functional with the external API's I chose to use.

Firstly we get all the country data and set it to some state with `setCountries`.

```Javascript
  useEffect(() => {
    getAllCountries().then(function (response) {
      setCountries(response.data)
    })
  }, [])
```

Next we filter all the country data by the current user that is logged in. A `useEffect` finds the `userId` based on the bearer token in local storage and passes into the `getUser` function. Although during this stage of development we could have created an endpoint to get all countries by `userId`, I did not want to add extra work for my team at the time as they were already problem solving an issue on the backend and our project time was almost over, so I used this method as a work around.

```Javascript
 useEffect(() => {
    const token = localStorage.getItem('token')
    getUser(token).then((response) => setUserId(response))
  }, [])
```

As the `getAllCountries` function gets all data related to where a user has visited, we filter this down to just country names matching the current user and set it to some state with `setUserCountries`. However, as our database at the time recorded the username of our users when they posted data and not the `userId` I had to match `userId.data.username`. We have changed this in our backend so now `userId` is displayed as well. For better semantic sense `setUserCountries` could be called `setCountryNames`.

As we will also use this data to map over our MembersCard.js component and I did not wish to filter the data again, I set this newly filtered data to its own state with `setCountryData` for later use. For better semantic sense this could be called `setFilteredCountryData`.

```Javascript
useEffect(() => {
    if (!userId || !countries) {
      return
    } else {
      const username = userId.data.username
      const countryKey = countries.filter((country) => country.createdBy)
      let mappedKey = countryKey.map((item) => ({
        name: item.name,
        createdBy: item.createdBy.username,
      }))
      let finalCountries = mappedKey.filter(
        (country) => country.createdBy == username
      )
      setUserCountries(finalCountries)

            let countryDataParsed = countryKey
        .map((item) => ({
          name: item.name,
          city: item.city,
          yearVisited: item.yearVisited,
          comments: item.comments,
          rating: item.rating,
          createdBy: item.createdBy.username,
        }))
        .filter((country) => country.createdBy == username)
      setCountryData(countryDataParsed)
      // console.log(`COUNTRYDATAAA >>>> `, countryDataParsed)
    }
  }, [userId, countries])

```

Next we have our Geocode function `getCoordinates` which allows you to pass in a string of a location, recieve a latitude and longitude, push the coordinates into an array variable `geocodedCountries`, and set that to some state using `setCoordinates`. We have a `useEffect` that calls this function when its dependency array `userCountries` changes, which we set in the previous block of code.

```Javascript
  useEffect(() => {
    if (!userCountries) {
      return
    }
    const array = userCountries
    for (let i = 0; i < array.length; i++) {
      getCoordinates(array[i].name)
    }
    // console.log(`number of user countries are`, array.length)
  }, [userCountries])

const getCoordinates = async (location) => {
    Geocode.fromAddress(location).then(
      (response) => {
        geocodedCountries.push(response.results[0].geometry.location)
        console.log(`Data from function`, geocodedCountries)
        setCoordinates(geocodedCountries)
      },
      (error) => {
        console.error(error)
      }
    )
  }
```

Now we have our coordinates in some state called `coordinates`. We can easily pass this down via props to our map component and handle that data to create drop pins on the map component. This helps ensure files are as small and as readable as possible.

```Javascript
<Map props={coordinates} />
```

## Bugs

---

When a user first logs into the members dashboard, only one of the drop pins on the map will display despite the user having visisted many countries unless the user interacts with the map.

![Alt text](https://user-images.githubusercontent.com/83005220/147378322-4686b378-a9e5-4d3f-ac0d-a0600102ce8b.gif 'Map Bug')

## Wins and Challenges

---

Using maps, problem solving how to turn data from our database into map coordinates and images on the country cards was very enjoyable and working with a map component in general was very exciting.

The biggest challenge was having to change our models while working on the frontend. We had to make a slight modification to be able to populate user data and also allow comments for each trip. This meant some of our data that we added to our database had missing aspects and that our initial seed database function was no longer operational as the models had changed.

Starting with a fresh database this is not a problem but, if one wanted to retain the existing data, this would be an issue. A simple work around would be to add either optional chaining to the frontend, so missing data is not rendered, or alternatively simply state the user has not entered this data yet and allow edit functionality.

## Key Learnings

---

It is extremely important to have a very clear idea of what precisely will be the functionality of the app so you can clearly define models from the outset. The benefit of this is they will not need to be modified later during early development. As apps become more successful or the needs of the end user change, models will inevitably need to be updated to accommodate future features.

Structuring the way one works with others is crucial to ensure efficient use of time. This means using effective agile working, strong initial planning, and assigning tasks to people based on interest and suitable skills is key.

The importance of cooperation, collaboration, and time management when working with others which scheduled group meetings facilitated as issues and problems could be addressed collectively. It provides a context for the sharing of different perspectives and approaches when problem solving.

From a technical perspective it was extremely pleasurable to learn how to create a backend environment using mongoDB and Express and building a React fronend. Using environment variables was a new concept as well as creating the right schema for our models to allow for a many to many relationship between our data.

## Future Content and Improvements

---

- Further styling improvements
- Edit functionality on country cards.
- User profile page
- Admin dashboard
