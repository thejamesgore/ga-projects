import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../redux/actions/orderActions'
import AlertMessage from '../components/AlertMessage'
import CheckoutProgress from '../components/CheckoutProgress'

function ConfirmationPage({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, error, success } = orderCreate
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  useEffect(() => {
    if (success) {
      history.push(`/order/`)
    }
  })

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentDetails: cart.paymentDetails,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
    console.log('submit order')
  }

  return (
    <>
      <CheckoutProgress step1 step2 step3 step4 />
      {cart.totalPrice < 100 ? (
        <AlertMessage variant="info">
          FREE Shipping On Orders Over £100
        </AlertMessage>
      ) : (
        <AlertMessage variant="info">
          Congratulations, Your Order Is Over £100! Shipping is FREE!
        </AlertMessage>
      )}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Details</h2>
              <p>Street: {cart.shippingAddress.address}</p>
              <p> City: {cart.shippingAddress.city}</p>
              <p>Post Code: {cart.shippingAddress.postCode}</p>
              <p>Country: {cart.shippingAddress.country}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Details</h2>
              <p>Card Name: {cart.paymentDetails.name} </p>
              <p>Card Number: {cart.paymentDetails.cardNumber}</p>
              <p>Expiry Date: {cart.paymentDetails.expiryDate}</p>
              <p>CVV: {cart.paymentDetails.cvv}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Cart</h2>
              {cart.cartItems.length === 0 ? (
                <AlertMessage variant="info">Your cart is empty</AlertMessage>
              ) : (
                <listGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x £{item.price} = £
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </listGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <listGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>£{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>£{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>£{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  variant="primary"
                  size="lg"
                  className="btn-block"
                  disable={cart.cartItems === 0}
                  onClick={submitForm}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </listGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ConfirmationPage
