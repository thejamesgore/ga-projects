import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loading from './Loading'
import AlertMessage from './AlertMessage'
import { listTopProducts } from '../redux/actions/productActions'

function HomeCarousel() {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTop)
  const { error, loading, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])
  return loading ? (
    <Loading />
  ) : error ? (
    <AlertMessage variant="danger">{error}</AlertMessage>
  ) : (
    <Carousel pause="hover" className="carousel">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <img
              height="300"
              src={product.image}
              alt={product.name}
              // fluid
              className="img"
            />
            <Carousel.Caption className="carousel.caption">
              <h5>
                {product.name} (£{product.price})
              </h5>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default HomeCarousel
