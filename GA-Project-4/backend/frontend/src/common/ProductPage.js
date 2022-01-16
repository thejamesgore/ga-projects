import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../redux/actions/productActions'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'

import Rating from '../components/Rating'
import AlertMessage from '../components/AlertMessage'
import Loading from '../components/Loading'

function ProductPage({ match, history }) {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
      ) : (
        <Row>
          <Col md={2}></Col>
          <Col md={3}>
            <Image src={product.image} alt={product.name} height="500" />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={`#f8e825`}
                />
              </ListGroup.Item>

              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>£{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn btn-block"
                    disabled={product.countInStock === 0}
                    type="button"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={2}></Col>
        </Row>
      )}
    </div>
  )
}

export default ProductPage
