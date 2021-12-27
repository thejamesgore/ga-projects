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
- Django CORS Headers
- Simple JWT
- Psycopg2

### Frontend:

- React
- React Redux
- Redux Thunk
- JSX
- CSS
- Axios
- BootstrapUI
- React Router Dom
- Hashrouter

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

- Week 1 - Project Planning, Backend Focus
- Week 2 - Backend, Frontend, Bug Fixing
- Week 3 - Frontend Focus

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

Next I used the DrawSQL tables to help create the models for the API in models.py thinking about the neccessary data types for each field. During this time I realised I would need to find a solution to allow the site admin to upload product images as the product model would require an image field. With some research I discovered Python Imaging Library also known as Pillow as a solution which would allow static files in an Image folder so installed and configued as required and added updated the image field in the product model. I created a test product via the Admin Panel to ensure this was working correctly and images were being stored successfully in the images folder.

![Alt text](https://user-images.githubusercontent.com/83005220/147385178-800bb41b-241e-44fa-98ae-7d3e48e211d0.png 'Admin Panel')

As I was working with Django Rest Framework all data needs to be JSON Serializable or it will not be successfully served by the API so I proceeded to serialize all models in a serializers.py and then updated the views.py file as neccessary.

```python
# Will return all products
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
```

### Week 2:

After adding some dummy data I began testing the API using Postman and via the Django Rest Framework UI in browser to ensure data was being served successfully which it was so the next task was to implement token authorization. Similarly to previous projects JSON Web Tokens are the method by which authorization would be possible so I installed Simple JWT and began to update the serializers.py and views.py creating a `POST` request functionality to register users but also permissioned classes from Django Rest Framework to require authentication to access aspects of the API such as a `GET` request for user data.

```python
# Will return user data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
```

I then tested all aspects of authorization in Postman and using the Admin panel by first creating a new user, ensuring I could login with this user creating a bearer token, and then see if I could use the bearer token to access restricted aspects of the API that should only be available to said user. I also tested these endpoints without a token to ensure they are restricted too with success. This was a rather large milestone and quite an endeavour to reach this point as developing the backend was challenging as I had yet to code a project in Python or Django to this depth previously and required a great deal of troubleshooting, trial and error, and research.

![Alt text](https://user-images.githubusercontent.com/83005220/147442271-03eb76cf-b33f-4d23-aaf8-cb856ebb666b.png 'Postman')

Now with the majority of the neccessary development of the backend completed I shifted my focus to creating the frondend. Following the designs in Figma I created the basic site architecture with a landing page, product page, register page, and login page.As I had experience with a multitude of CSS Frameworks such as Bulma, Tailwind CSS, Bootstrap UI, I decided to use Bootstrap as I had some but little experience with Bootstrap and this would allow me to explore it's features to a greater degree. Bootstrap also had a Carousel element built in which would be perfect for the landing page. The initial goal was to successfully fetch data from the API using axios and to have this render on the landing page.

```Javascript
const [products, setProducts] = useState([])

useEffect(()=>{

    async function getAllProducts() {

    const { data } = await axios.get('http://127.0.0.1:8000/api/products')
    setProducts(data)

    }

getAllProducts()
},[])
```

Now API data was being sucessfully rendered on the landing page I moved onto the prodct page again following the figma designs. I added some details I had no considered during the initial design phase such as displaying whether or not a product was in stock, limited the quantity one would be able to add to their cart based on the number of items in stock, and conditional rendering of the Add To Cart button no longer making it a clickable if there were no more of the item in stock.

The next step was to start using React Redux for global state management and to expand on the functionality of the product page and shopping cart. Starting by creating the store and wrapping the entire app in a provider componenet pointing to the Redux store I shifted to creating basic reducers and moving the Axios API call into actions. Two tools that made this exceptionally easier to manage were Redux Thunk, which allowed for asynchronous actions, and Redux Dev Tool extension which allows one to see not only what is presently in the state but also a timeline of changes that happen which can be replayed. A great deal of debugging and learning was neccessary during this aspect of development to have Redux functioning correctly and meant more time was spent on this than anything else as was expected when initially planning. However, once I was able to go through creating multiple actions, reducers, and the relative items in the store implementing further features throughout this project followed much of the same process and was not time intensive compared to the rest of the project.

![Alt text](https://user-images.githubusercontent.com/83005220/147452164-c2ea3fe0-2f0e-47a0-ae78-b9a8e7ebff96.png 'Redux DevTool')

### Week 3:

The final focus of this week was to hit the MVP as soon as possible, which would require creating a complete checkout process with the user being able to submit their order successfully and order information populating on the backend or admin panel once submitted, and further improvements to layout to move the site more inline with the figma designs. Checkout followed a sequential process of creating the neccessary forms to capture the relevant user information based on the current step, pass that into the global state, and then move onto to the next step of the checkout ultimately finishing with order confirmation summarizing all information in the global state.

![](https://user-images.githubusercontent.com/83005220/147457778-b516cfab-c2bd-4d2e-8f13-6f89a97d529a.png 'Checkout')

One consideration during this process was data protection for the end user and how data would be stored. In this project the payment details of each customer is stored in the Payment Method field shown in the screenshot below. This would make sense for manual processing of payments however most online stores use a 3rd part processor such as Stripe, PayPal, GooglePay, or similar and the order confirmation page would be the perfect place to integrate such payment processors. However, for the scope of this project it was more important to be able to ensure this data could be successfully captured and posted to the API as a proof of concept. Checking the order in the Admin panel we can see payment information was successfully captured under PaymentMethod in the screenshot below thus hitting project MVP.

![](https://user-images.githubusercontent.com/83005220/147458054-d9efd3cb-31ea-4587-a6a1-23cbd0920972.png 'Order Page')

As I already had experience developing frontend environments in React from prior projects the rest of the development process was rather smooth unlike some earlier instances which required significant time dedicated to problem solving issues for both Django and React Redux. I continued to work on the presentation of the site and user experience creating a carousel. I had to create a new endpoint in Django to only serve the top products based on their 5 star rating, which when called in Axios was mapped over the carousel componenet.

I also encountered some bugs during this time especially when it came to deployment requiring changes to some key elements such as React Router Dom which is further elaborated on in the bug section.

## Featured Code

---

Below are some key excerpts of code which allow items to be added to cart and the global state when navigating from a page featuring a product to the cart.

First we populate the product data on the page with a `useEffect()` which dispatches an action `listProductDetails(match.params.id)` to Redux. This action passes in the current product id which is in the browser url hence the `match.params.id`.

```javascript
function ProductPage({ match, history }) {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])
```

In our Redux actions `ListProductDetails` is called which triggers an Axios get request to our Django API. Upon success the response from the API is passed to the reducer which changes the current state in our store of `productDetails`.

```Javascript
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  }
}
```

Now the `productDetails` variable has the current product data from the API as it is assigned to this data via the `useSelector()`

```javascript
const productDetails = useSelector((state) => state.productDetails)
```

Now the user can see the relevant data for this product and can click Add To Cart which when they do calls the addToCart function pushing them to the cart page which includes the product id from `match.params.id` but also the item quantity which was set into local state.

```Javascript
const addToCart = () => {
  history.push(`/cart/${match.params.id}?qty=${qty}`)
}
```

On the Cart screen a very similar process happens upon initial render of the page. Upon first render a `useEffect()` dispatches the `addToCart()` action to redux which is passed the product id and item quantity via two variables pulling this data from the URL.

```Javascript
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
```

```Javascript
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
```

In our Redux actions `addToCart` is called with the product id and quanitity passed into the function and does another Axios api call for the current product id. However slightly differently this time product data is sent to the reducer to change the current state in the local store but also adds the item to the local storage in the browser. This is useful as if a user closes their browser but returns to the page all items that were added to the cart will still be visible thanks to local storage.

```Javascript
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

```

Lastly this item is visible in the cart as the current cart is pulled from the state with a `useSelector()` function and rendered on the page.

```Javascript
  const cart = useSelector((state) => state.cart)
```

Although there are many steps to this process the benefits of this approach is there is no need to pass state up and down componenets which can become troublesome for a project of this size, regardless of whether the user is logged in or not the cart items will remain the same, and user experience isn't impeded.

## Bugs

---

When deployed the app wouldn't route properly when the user refreshed the page or navigated away and back to the same page. This was due to how the routing system works with React Router Dom & the configuration of Django Rest Frame Work. As this was after a great deal of development on the backend I didn't wish to change anything too significantly with the API to solve this problem as it could create 2nd and 3rd order of effect bugs that I may not have been aware of so instead implemented a different type of routing using Hash Router at this late stage which solved the problem after some research on Stack Overflow.

Ultimately Django was recognizing any page refresh or navigation back to some pages as a request for a hard coded url or server side routing, where many of the urls did not exist, so is unable to serve any data.

Hash Router solves this problem by adding a `#` in the url enabling server side routing to be independent from client side routing in React by having all urls created in React following the `#` and being ignored by the backend.

## Wins and Challenges

---

This was a successful yet extremely challenging project especially as it was solo. The biggest win was of course achieving my goal of successfully implementing React Redux however, this was also the largest project I had completed to date and introduced a new language, Python, that I had not used to this significance before.

The greatest challange was the learning curve using Python, familiarising myself with Django fully and it's capabilities and limitations, and the learning curve using React Redux.

A second challenge was working alone. Although it does have the benefit of meaning a I'm able learn the most I do enjoy working in a team even if working completely independently on a specific feature.

## Key Learnings

---

My primary goal with this project was to successfully learn to implement React Redux for global state management which I was able to do successfully. I also successfully allocated extra time to problem solve one major issue on the backend and one major issue on the frontend which was a fantastic approach as despite this being the longest project time I had so far, expecting to face unknown issues and allowing extra time purely for bug fixing or extra development for potential issues was vital to maintaining the project project timeline I had initially set. However, even so I was unable to achieve my full vision for the project due to time constraints as ultimately there is only so much one can do.

I would love to have similar responsibilities and goals implementing many key features I did in this project such as Redux although in a team based environment as collaboration is also a fantastic way to learn, see different perspectives and ways to problem solve, and ofcourse develop oneself which was one aspect I really missed when working on this project solo.

This was the first time approaching development slightly differently compared to previous projects with regards to version contorl. Unlike my last group project where we used individual development branches named after ourselves, e.g. development-james, for this project I used branches named after features to better approximate a working environment as a colleague working working on the navigation bar would find it easier to pick up where someone else left off on a branch named development-navbar. Feature based branches meant working on different aspects of the project and switching from branch to branch also allowed me to continue where I left off from previous days much easier and insulate work if I need to make small modifications to other aspects of the project.

Although one can plan to quite a significant extent initially, until the development process begins one will never truly know all tasks required to achieve each goal nor the time they will take. Some may have a percieved expectation of taking a considerable time yet will be quite easy to create and others may seem simple but create further challenges or bugs one may not expect.

## Future Content and Improvements

---

- Users being able to submit reviews for products
- Users being limited to only submit a review for a product if there is history of the user order the product
- A custom dashboard for site managers separate from the Django Admin Panel so if someone were to work for the company they could see order details and fulfil orders but wouldn't be able to have access to similar features that a superuser would.
- I half created the user profile so users could update shipping information, however I would also like it to show previous orders
- A sub navbar with categories and drop down menus providing access to different products which a user could easily find and click from any page
- Search functionality
