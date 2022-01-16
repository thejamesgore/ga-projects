import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

export default function Product({ product }) {
  return (
    <Card border="dark" className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} height="500" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Link to={`/product/${product.brand}`}>
          <Card.Title as="div">
            <strong>{product.brand}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div classNAme="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} Reviews`}
              color={`#f8e825`}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">£{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}
