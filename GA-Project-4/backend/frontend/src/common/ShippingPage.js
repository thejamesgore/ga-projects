import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutProgress from '../components/CheckoutProgress'
import { saveShippingAddress } from '../redux/actions/cartActions'

export default function ShippingPage({ history }) {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postCode, setPostCode] = useState(shippingAddress.postCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutProgress step1 step2 step3 step4 />
      <Form onSubmit={submitForm}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postCode">
          <Form.Label>Post Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Post Code"
            value={postCode ? postCode : ''}
            onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Country"
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
