# GA Project Four - Web Store - Python Based Django Backend & React Front End

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

An online health shop selling supplements, food, exercise equipment, and more. This was created using a Python Django based backend and a React frontend utilising Redux.

Although there was an opportunity to work in a group I decided to work alone on this project as there was a longer development timeline available compared to previous projects to push my capabilities, learning, and attempt to successfully use React Redux in what would be quite a challenging project.

We were given three weeks to complete and present our projects.

![Alt text](https://user-images.githubusercontent.com/83005220/147385366-332b693e-7969-4d87-90fa-d115926072f7.png 'Landing Page')

Live Version:

Original Repository With Full Commit History
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
- Implement thoughtful user stories / wire frames that are significant enough to help you know which features are core MVP and which you can cut

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
- Django Cloudinary Storage

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

Part of the reason I decided to create an online shop was that React Redux would need to be used to manage the state of the cart and this would give me an opportunity to learn to use React Redux. The items in the cart should remain the same whether a user is logged in or not and React Redux would be a perfect tool to for the job.

Initial stages of the project were spent planning and fully understanding the necessary demands to hit the MVP and how feasible this would be given the three week timeline I was given. As with all of my previous projects my goal was to stretch my capacities as I believe this is the best way to learn as much as possible, success or fail, despite it being significantly more demanding not just mentally or physically but also on one's time.

Upon further research into the required technologies that would enable me to hit the project MVP, I began planning by first thinking about the backend and necessary models that would be required to have a complete working store. I used DrawSQL to plan out the different SQL tables and the relationships between each.

![Alt text](https://user-images.githubusercontent.com/83005220/147387036-61c1e632-27d0-4436-a0a9-ed1a37140951.png 'DrawSQL models')

From this point I created a general mock up of the various pages that would be required on the frontend in Figma. I made a decision early on to use a CSS framework to make the styling of the project uniform but more importantly to help save project time. This allowed for troubleshooting or resolving any bugs that would come further down.

![Alt text](https://user-images.githubusercontent.com/83005220/147387018-fb9513c5-1e48-41d5-8214-6cf7c88a4725.png 'Figma Project Design')

I also created a Trello Kanban board with each task required to create the backend and frontend. I added some basic checklists to each task to have large tasks split into small measurable goals, updating progress as I went along. This was crucial to stay organized, measure project progress, and see how far away I was from the achieving the project MVP.

![Alt text](https://user-images.githubusercontent.com/83005220/147387020-25505a6d-5452-4aa3-a40e-b43960ccae7f.png 'Trello Kanban Board')

With a strong plan, timeline and vision in mind I began on the backend initialising a base django database for the project API and installed Django Rest Framework following the API guide in the documentation. Then I started to add some basic routing by building out the urls.py file, but also by returning a list of routes in the views.py file for easier development and usage with Django Rest Framework. For all views I added `@api_view([])` depending on what type of request the API would be serving, such as `GET`, `POST`, `PUT`, `DELETE`.

I then added Django CORS Headers, similar to previous projects, as during the development process the API will by default not serve data from another domain outside the domain from which the resource was first served. This will make testing endpoints in Postman and eventually calling endpoints with Axios in the frontend possible.

Next I used the DrawSQL tables to help create the models for the API in models.py thinking about the necessary data types for each field. During this time I realised I would need to find a solution to allow the site admin to upload product images as the product model would require an image field. With some research I discovered Python Imaging Library, also known as Pillow, as a solution which would allow static files in an Image folder. Once installed and configured as required I updated the image field in the product model. I created a test product via the Admin Panel to ensure this was working correctly and images were being stored successfully in the images folder.

To ensure images would then be able to be served when deployed, I installed Django Cloudinary Storage allowing images to be stored on the Cloudinary servers.

![Alt text](https://user-images.githubusercontent.com/83005220/147385178-800bb41b-241e-44fa-98ae-7d3e48e211d0.png 'Admin Panel')

As I was working with Django Rest Framework, all data needs to be JSON Serializable or it will not be successfully served by the API. I proceeded to serialize all models in a serializers.py file and then updated the views.py file as necessary.

```python
# Will return all products
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
```

### Week 2:

After adding some dummy data I began testing the API using Postman and via the Django Rest Framework UI in browser. Once I ensured data was being served successfully, the next task was to implement token authorization. Similar to previous projects, JSON Web Tokens are the method by which authorization would be possible. I installed Simple JWT and began to update the serializers.py and views.py files creating a `POST` request functionality to register users. I also created permissioned classes from `rest_framework.permissions` to require an `IsAuthenticated` check on some views.

```python
# Will return user data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
```

I then tested all aspects of authorization in Postman by first creating a new user. I ensured that I could login with this user creating a bearer token, and then checked that I could use the bearer token to access restricted aspects of the API. I also tested these endpoints without a token to ensure they are restricted too with success. This was a major milestone to reach this point as developing the backend was challenging as I had yet to code a project in Python or Django to this depth previously.

![Alt text](https://user-images.githubusercontent.com/83005220/147442271-03eb76cf-b33f-4d23-aaf8-cb856ebb666b.png 'Postman')

Now with the majority of the necessary development of the backend completed, I shifted my focus to creating the frontend. Following the designs in Figma I created the basic site architecture with a landing page, product page, register page, and login page. As I had experience with a multitude of CSS Frameworks such as Bulma, Tailwind CSS, Bootstrap UI, I decided to use Bootstrap to take advantage of the carousel component. The initial goal was to successfully fetch data from the API using Axios and to have this render on the landing page.

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

Now API data was being successfully rendered on the landing page, I moved onto the prodct page again following the Figma designs. I added some details such as displaying the product stock, limited the quantity one would be able to add to their cart based on the number of items in stock, and conditional rendering of the Add To Cart button thereby making it no longer clickable if there were no more of the item in stock.

The next step was to start using React Redux for global state management and to expand on the functionality of the product page and shopping cart. Starting by creating the Redux store and wrapping the entire app in a provider component pointing to the store. I shifted to creating basic reducers and moved the Axios API call into Redux actions.

Two tools that made this easier to manage were Redux Thunk, which allowed for asynchronous actions, and Redux Dev Tool extension which allow one to see a timeline of the Redux state. A great deal of debugging and learning was necessary during this aspect of development so Redux was functioning correctly. This followed according to the initial planning expectations. However, once I was able to go through the process of creating multiple actions, reducers, and the relative items in the store, implementing further features throughout this project was not time intensive.

![Alt text](https://user-images.githubusercontent.com/83005220/147452164-c2ea3fe0-2f0e-47a0-ae78-b9a8e7ebff96.png 'Redux DevTool')

### Week 3:

The final focus of this week was to hit the MVP as soon as possible, which required creating a complete checkout process with the user being able to submit their order successfully and order information populating on the backend or admin panel once submitted. Further improvements were added to the layout at this time.

Checkout followed a sequential process of creating the necessary forms to capture the relevant user information based on the current step, pass that into the global state, and then move onto to the next step of the checkout, ultimately finishing with order confirmation which summarises all information in the global state.

![](https://user-images.githubusercontent.com/83005220/147457778-b516cfab-c2bd-4d2e-8f13-6f89a97d529a.png 'Checkout')

One consideration during this process was data protection for the end user and how data would be stored. In this project the payment details of each customer is stored in the Payment Method field shown in the screenshot below. This would make sense for manual processing of payments, however most online stores use a third party processor such as Stripe, PayPal, GooglePay, or similar. The order confirmation page would be suitable to integrate such payment processors.

However, for the scope of this project it was more important to be able to ensure this data could be successfully captured and posted to the API as a proof of concept. Checking the order in the Admin panel we can see payment information was successfully captured under PaymentMethod in the screenshot below, thus hitting project MVP.

![](https://user-images.githubusercontent.com/83005220/147458054-d9efd3cb-31ea-4587-a6a1-23cbd0920972.png 'Order Page')

As I already had experience developing frontend environments in React from prior projects, the rest of the development process was rather smooth. I continued to work on the presentation of the site and user experience creating a carousel. I had to create a new endpoint in Django to only serve the top products based on their 5 star rating, which when called in Axios was mapped over the carousel component.

I also encountered some bugs during this time especially when it came to deployment requiring changes to some key elements, such as React Router Dom which is further elaborated on in the bug section.

## Featured Code

---

Below are some key excerpts of code which allow items to be added to cart and the global state.

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

In our Redux actions, `ListProductDetails` is called which triggers an Axios get request to our Django API. Upon success the response from the API is passed to the reducer which changes the current state in our store of `productDetails`.

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

Now the user can see the relevant data for this product and can click Add To Cart button, which when they do, calls the `addToCart` function, which pushes them to the cart page. This includes the product id from `match.params.id` but also the item quantity which was set into local state.

```Javascript
const addToCart = () => {
  history.push(`/cart/${match.params.id}?qty=${qty}`)
}
```

On the Cart screen a very similar process happens upon initial render of the page. Upon first render a `useEffect()` dispatches the `addToCart()` action to Redux which is passed two variables `productId` and `qty` by pulling this data from the URL.

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

In our Redux actions, `addToCart` is called with the product id and quantity passed into the function. There is an Axios API call using this information on our products endpoint. Product data is dispatched to the reducer, changing the current state while also updating the local storage by adding the current item. This is useful as if a user closes their browser but returns to the page, all items that were added to the cart will still remain visible thanks to local storage.

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

Lastly this item remains visible in the cart as all items are pulled from the state with a `useSelector()` function and rendered on the page.

```Javascript
  const cart = useSelector((state) => state.cart)
```

Although there are many steps to this process, the benefits of this approach is there is no need to pass state up and down components which can become troublesome for a project of this size. Regardless of whether the user is logged in or not, the cart items will remain the same and user experience is not impeded.

## Bugs

---

When initially deployed the app would not route properly if user refreshed the page or navigated away and back to the same page. This was due to how the routing system works with React Router Dom & the configuration of Django Rest Frame Work. As this was after a great deal of development on the backend, I did not wish to change anything too significantly with the API to solve this problem as it could create 2nd and 3rd order of effect bugs. As a solution I implemented a different type of routing using Hash Router at this stage which solved the problem after some research on Stack Overflow.

Ultimately Django was recognizing any page refresh or navigation back to some pages as a request for a hard coded url or server side routing, where many of the urls did not exist, so is unable to serve any data.

Hash Router solves this problem by adding a `#` in the url. This enables server side routing to be independent of client side routing in React. All urls created in React follow the `#` and are ignored by the backend.

## Wins and Challenges

---

This was a successful yet extremely challenging project, especially as it was a solo effort. The biggest win was achieving my goal of successfully implementing React Redux. However, this was also the largest project I had completed to date and introduced a new language, Python, that I had not used to this extent before.

The greatest challenge was the learning curve using Python, familiarising myself with Django fully and it's capabilities and limitations, and the learning curve using React Redux.

I demonstrated my ability to work individually on coding projects. Although it provides extensive opportunities for self learning, it also makes me appreciate the values of team working where different perspectives and approaches can be shared in developing efficient coding.

## Key Learnings

---

My primary goal with this project was to implement React Redux for global state management which I was able to do successfully. I also managed to allocate the correct amount of time to problem solve any major issues encountered on the backend and frontend.

I enjoyed the challenges of responsibilities and goals in implementing this project and problem solving.

Version control differed to previous projects which was advantageous. Unlike my last group project where we used individual development branches named after ourselves, such as development-james, for this project I used branches named after features. This better approximated a working environment as a colleague working on the navigation bar would find it easier to pick up where someone else left off on a branch named development-navbar. Feature based branches mean working on different aspects of the project and switching from branch to branch also allows one to insulate work if needed.

## Future Content and Improvements

---

- Users being able to submit reviews for products
- Users being limited to only submit a review for a product if there is history of the user order the product
- A custom dashboard for site managers separate from the Django Admin Panel so if someone were to work for the company they could see order details and fulfil orders but wouldn't be able to have access to similar features that a superuser would.
- I half created the user profile so users could update shipping information, however I would also like it to show previous orders
- A sub navbar with categories and drop down menus providing access to different products which a user could easily find and click from any page
- Search functionality
