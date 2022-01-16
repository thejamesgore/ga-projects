import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'

export default function Cart({ match, location, history }) {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <AlertMessage variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </AlertMessage>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeItemFromCart(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                {' '}
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
              </h3>
              £
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{' '}
              Total
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  {cartItems.length === 0 ? (
                    <span>Cart is empty</span>
                  ) : (
                    <span>Checkout</span>
                  )}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
