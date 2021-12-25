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

Original Repositories With Full Commit Histories 
https://github.com/thejamesgore/ga-project-3-back-end
https://github.com/thejamesgore/ga-project-3-front-end

## Code Installation

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

## Approach Taken & Timeline

---

Brainstormed ideas settling in on one early on then further brainstormed features our project should have and the required models. We decided the first week should be dedicated to project planning and fleshing out the backend while the second week was focused on creating the frontend. We then used Figma to create a basic design.

![Alt text](https://user-images.githubusercontent.com/83005220/147378251-4d6d1835-4c1e-4931-9450-c031b91d41fb.png 'Figma')



Set up trello kanban board for agile working with a backlog of tasks ranked and assigned to each member of the team.
![Alt text](https://user-images.githubusercontent.com/83005220/147378181-f9230e4a-d742-49de-a22e-28c8f29f6206.png 'Trello Kanban Board')

Assigned upcoming tasks that wouldn't conflict
Initially focused on building the backend together, deciding the neccessary models

Created endpoints

I tested the endpoints in postman
![Alt text](https://user-images.githubusercontent.com/83005220/147378515-e67aa3af-abc5-4705-aa3f-862739922330.png 'Postman')

I created membersdashboard, pulls all countries user has visisted from the backend, sends the name of these countries to google Geocode which converts the country name to a longditude and latitude and returns it which is stored in state, this is then passed and converted to a format that works with React Map GL which renders the map on screen and allows drop pins.

![Alt text](https://user-images.githubusercontent.com/83005220/147378202-aa12e86a-b9ee-46f5-9cb5-fc1e33bba0d1.png 'Membersdashboard')

I used Pexals Image API to use the country user has visisted to search for an image and add it to the country card
![Alt text](https://user-images.githubusercontent.com/83005220/147378205-dbf4ff22-c232-4f36-b00d-b774a0fc5f6b.png 'Members cards')


I created map component

I created status bar

I created login & register pages
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

## Future Content and Improvements

---

The majority of my focus on was functionality as I believed it would potentially be extremely challenging to achieve the functionality I had planned for in the members dashboard given our time requirements especially as we had to revisit our backend to solve a problem during our second week which was meant to be completely dedicated to our front end. More time can be spent improving styling overall on the website. As well as this edit functionality in the members area can be added.
