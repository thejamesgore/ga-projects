# GA Project Four - TravelApp - Python Based Django Backend & React Front End

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

An online health shop selling supplements, food, exercise equipment, and more. This was created using a python django based backend and a React frontend.

Although there was an opportunity to work in a group I decided to work alone on this project as there was a longer development timeline to push my capabilities, learning, and attempt to successfully use React Redux in what would be quite a challenging project.

We were given three weeks to complete and present our project.

![Alt text](https://user-images.githubusercontent.com/83005220/147385366-332b693e-7969-4d87-90fa-d115926072f7.png 'Landing Page')

Live Version:

Original Repositories With Full Commit Histories
https://github.com/thejamesgore/ga-project-4

## Code Installation

---

Clone or download the repo then do the following in Terminal:

- Install backend dependencies: `pipenv`
- Enter Shell for project: `pipenv shell`
- Make Migrations: `python manage.py makemigrations`
- Migrate: `python manage.py migrate`
- Start backend server: `python manage.py runserver`
- Change into front-end directory: `cd frontend`
- Install front-end dependencies: `yarn`
- Start front-end server: `yarn start`

## The Brief

---

- Build a full-stack application by making your own backend and your own front-end
- Use a Python Django API using Django REST Framework to serve your data from a Postgres database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut

## Technologies Used

---

### Backend:

- Python
- Django
- Django REST Framework
- Python Imaging Library
- Psycopg2
- Simple JWT
- Django CORS Headers

### Frontend:

- React
- React Redux
- Redux Thunk
- JSX
- CSS
- Axios
- BootstrapUI
- React Router Dom
- React Router Bootstrap

### Development:

- Visual Studio Code
- Yarn
- Webpack Dev Server
- Redux Devtools Extension
- Postman
- Git
- Github
- DrawSQL
- Figma
- Trello

## Approach Taken & Timeline

---

Key Dates:

- Week 1 - Project Planning, Backend focus
- Week 2 - Frontend focus
- Week 3 - Further updates to backend & frontend to extend project and bug fix

### Week 1:

Part of the reason I decided to create an online shop was that React Redux would need to be used to manage the state of the cart and this would give me an opportunity to learn to use React Redux. The items in the cart should remain the same whether a user is logged in or not and React Redux would be a perfect too to for the job.

Initial stages of the project were spent planning and fully understanding the neccessary demands to hit the MVP and how feasible this would be given the three week timeline I was given. As with all of my previous projects my goal was to stretch my capacities as I beleive this is the best way to learn as much as possible, success or fail, despite it being significantly more demanding not just mentally or physically but also on ones time.

Upon further research into the required technologies that would enable me to hit the project MVP I began planning by first thinking about the backend and neccessary models that would be required to have a complete working store. I used DrawSQL to plan out the different SQL tables and the relationships between each.

![Alt text](https://user-images.githubusercontent.com/83005220/147387036-61c1e632-27d0-4436-a0a9-ed1a37140951.png 'DrawSQL models')

From this point I created a general mock up of the various pages that would be requred on the frontend in figma. I made a decision early on to use a CSS framework to make the styling of the project uniform but more importantly to help save project time to allow for troubleshooting or any bugs that would come further down the line when building out the frontend because of the unknown of how successful I would be implementing a new technology, React Redux, that I had not been taught or used before.

![Alt text](https://user-images.githubusercontent.com/83005220/147387018-fb9513c5-1e48-41d5-8214-6cf7c88a4725.png 'Figma Project Design')

I also created a trello kanban board with each task neccessary to create the backend and frontend that I could think of at the time and added some basic checklists to each task to have big tasks split into small measurable goals updating as I went along. This was crucial to stay organized, measure project progress, and see how far away I was from the mvp.

![Alt text](https://user-images.githubusercontent.com/83005220/147387020-25505a6d-5452-4aa3-a40e-b43960ccae7f.png 'Trello Kanban Board')

With a strong plan, timeline and vision in mind I began on the backend initializing a base django database for the project API and installed Django Rest Framework following the api-guide in the documentation. Then I started to add some basic routing by building out the urls.py file but also by returning a list of routes in the views.py file for easier development and usage with Django Rest Framework. For all views I added `@api_view([])` depending on what type of request the api would be serving, e.g. `GET`, `POST`, `PUT`, `DELETE`.

I then added Django CORS Headers as with previous projects in the past during the development process the API will by default not serve data from another domain outside the domain from which the resource was first served. This will make testing endpoints in Postman and eventually calling endpoints with Axios in the frontend smoother.

Next I used the DrawSQL tables to help create the models for the API in models.py thinking about the neccessary data types for each field. During this time I realised I would need to find a solution to allow the site admin to upload product images as the product model would require an image field. With some research I discovered Python Imaging Library also known as Pillow as a solution which would allow static files in an Image folder so installed and configued as required and added updated the image field in the product model.

### Week 2:

Second Week frontend & more of backend
Third Week frontend

## Featured Code

---

## Bugs

---

## Wins and Challenges

---

## Key Learnings

---

## Future Content and Improvements

---
