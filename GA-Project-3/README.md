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

An app to track your travels and share with the travel community your experiences with a members dashboard featuring a map with a drop pin of each location visisted, a status bar to track how many countries travelled to so far, and a subsection with each trip a user has been on with their comments of how the trip went.

This was a collaborative three person project with a 14 day timeframe to complete and present our work.

![Alt text](https://user-images.githubusercontent.com/83005220/147378187-2b8df96a-3b3e-43af-a647-907b9e091d49.png 'Landing Page')

Live Version:

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

- Build a full-stack application by making your own backend and your own front-end
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models

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

We decided the first week should be dedicated to project planning and fleshing out the backend while the second week should be focused on creating the frontend. Initially we brainstormed ideas settling in on creating a travel app early on and then further brainstormed features our project should have. We then used Figma to create a basic design displaying each page we would create and their subcomponents.

![Alt text](https://user-images.githubusercontent.com/83005220/147378251-4d6d1835-4c1e-4931-9450-c031b91d41fb.png 'Figma')

We then set up a trello kanban board to enable agile working with a backlog of tasks ranked and assigned to each member of the team, most of which were all group tasks initially so we could hone in on the models we would need based on the project requirements, and have a base backend from which we could then work on separately.

For the sake of simplicity and an expeditious initial coding experience we would all group code using VS Code Live Share and Zoom to create the base backend database using Express and MongoDB taking turns to code different aspects of the same element of our backend or code compelete aspects solo while others made suggestions. This ensured a smooth coding experience and also allowed us to allocate days to our timelime purely for problem solving or for aspects that would be unexpectedly significantly demanding and take more time than expected which did happen.

After settling in on our models for the project we then assigned different responsbilities on our kanban board that would not conflict with each other while using VS Code Live Share to develop different aspects of the backend at the same time to ensure functionality at this early stage. We took one model each, then focused on creating the relevant controllers for each model, shared our work with the group, created the seed data together and tested it successfully.

Below is our Trello kanban board post project completion.

![Alt text](https://user-images.githubusercontent.com/83005220/147378181-f9230e4a-d742-49de-a22e-28c8f29f6206.png 'Trello Kanban Board')

### Day 4-7:

From here as a team we were able to develop the different aspects of the backend we were individually responsible for at a similar pace helping each other as we went, pushing and merging code when we hit small significant milestones, which meant we could spend a moderate amount of time checking each others work for quality assurance and allocate time to testing.

We applied further middleware to ensure functionality such as CORS and environment variables using DotEnv and proceeded to create our endpoints, authorization, and secure routes. My focus after adding some key endpoints and was to create a secure route using jsonwebtoken and dotenv to enable registration & login on the front end and endpoints that require a bearer token to access.

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

I set up a postman workspace so if any member of the team wished to test any functionality locally they would be able to however we mostly used zoom and postman on my machine for time efficiency. We tested our endpoints with and without a bearer token for those that were and weren't locked down by our secure route.

![Alt text](https://user-images.githubusercontent.com/83005220/147378515-e67aa3af-abc5-4705-aa3f-862739922330.png 'Postman')

### Day 8-9:

Similar to our initial approach creating our backend, we coded as a group and initialized our React frontend locally on my machine using Zoom and VS Code Live Share to edit the same project file ensuring a functional base frontend we could push to git hub. We created a simple layout, functionality to call our backend using Axios, and the basics of responsive search on our coutries page. From here my focus was purely on the members dashboard while my team created other aspects of the app such as CountriesCard component and search.

### Day 10-14:

I created the members dashboard settling in on using React Map GL due to users being able to have 10,000 API calls per month for free compared to Google which past a certain amount of API calls will charge. Despite this I would end up having to use the Google Api regardless. I created a basic form to create trips and post data to our database however this highlighted one issue with our models which were comments. This meant we had to revisit our backend and tweak our models to enable comments to be posted correctly. This was partly due to the fact we have many to many relationships between our models.

This was challenging as we were unsure why we were facing this issue. Although I spent some time identifying the problem using postman and revisiting the backend with my team, once we understood why we were unable to post comments my focus returned to the members dashboard. I was able to use the CountriesCard component my team had made and map all the countries a user had visisted over the component creating members cards giving details of their trip. The I hardcoded data into the map componenet to display drop pins to demonstrate that conceptually the map component is operating successfully. The next challenge was turning the user data from the database into latitude and longditude coordinates that map component would then be able to display.

Ultimately I used Google Geocode API which allows one to send a string of a location and recieve back a multitude of data back some of which were the latitude and longditude for that location. Once that data was sent back from Google Geocode I simply set it into some state and passed it down through props which mapped it over the map subcomponent on the dashboard page.

![Alt text](https://user-images.githubusercontent.com/83005220/147378202-aa12e86a-b9ee-46f5-9cb5-fc1e33bba0d1.png 'Members Dashboard')

I also wanted to make the Country Cards of each place a user had visted more interesting so searched for image APIs which served an image if you submitted a location. I used Pexals Image API as it was free and seemed to produce the most accurate images based on the string, however it isn't perfect and sometimes provides a seemling unrelated image. Here I found two more bugs. When a user first logs in all the drop pins on the map will not render without the map being moved by the user. Secondly environment variables weren't working when using dotenv and as we were still trying to fix the backend comments issue decided to hardcode the API keys and clean up the code once we were able to.

![Alt text](https://user-images.githubusercontent.com/83005220/147378205-dbf4ff22-c232-4f36-b00d-b774a0fc5f6b.png 'Members cards')

I created map component

I created status bar

I styled the login & register pages to match the members dashboard.

![Alt text](https://user-images.githubusercontent.com/83005220/147378212-663cd9e6-dd77-423a-8c9a-84ee45f7f25e.png 'Register Page')

## Featured Code

---

Map Code

## Bugs

---

A bug we faced was when a user logs in upon first render of the page one or none of the drop pins on the map will display despite the user having visisted many countries until the user interacts with the map.

![Alt text](https://user-images.githubusercontent.com/83005220/147378322-4686b378-a9e5-4d3f-ac0d-a0600102ce8b.gif 'Map Bug')

## Wins and Challenges

---

Using maps, problem solving how to turn country names from a data base into map coordinates and images on the country cards

One of the challenges was how we set up our backend initially with regards to models. We had to make a slight modification to be able to populate user data and also allow comments for each trip. This meant some of our data that we added to our database had missing data.

## Key Learnings

---

Have a very clear idea of what precisely will be the funcitonality of the app so you can clearly define models from the outset so they don't need to be modified later during development, however I would assume as apps become more successful and grow models will need to be updated to accomodate future features.

Structuring the way one works with others is crucial to ensure efficient use of time. This means the obvious such as using agile working, strong initial planning, and assigning jobs to people based on interest and capacity or desire to work on a task. However, this also extends to how day to day coding works too such as scheduling time in a group as we all were working full time and also had responsibilities outside of the immersive that were time demanding but also small things such as having one person also run a working base version of the code from which everyone can live code and contribute to initially and pushing the groups work to git hub, until individuals are able to work on aspects that when merged wont intefere with the functionality of the existing code base.

## Future Content and Improvements

---

The majority of my focus on was functionality as I believed it would potentially be extremely challenging to achieve the functionality I had planned for in the members dashboard given our time requirements especially as we had to revisit our backend to solve a problem during our second week which was meant to be completely dedicated to our front end. More time can be spent improving styling overall on the website. As well as this edit functionality in the members area can be added.
