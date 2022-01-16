import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutProgress from '../components/CheckoutProgress'
import { savePaymentDetails } from '../redux/actions/cartActions'

function PaymentPage({ history }) {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(savePaymentDetails({ name, cardNumber, expiryDate, cvv }))
    console.log('submit payment')
    history.push('/confirmation')
  }

  return (
    <FormContainer>
      <CheckoutProgress step1 step2 step3 />
      <Form onSubmit={submitForm}>
        <Form.Group controlId="name">
          <Form.Label>Card Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Name On Card"
            value={name ? name : ''}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="cardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Card Number"
            value={cardNumber ? cardNumber : ''}
            onChange={(e) => setCardNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="expiryDate">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Expiry Date"
            value={expiryDate ? expiryDate : ''}
            onChange={(e) => setExpiryDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="cvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Cvv"
            value={cvv ? cvv : ''}
            onChange={(e) => setCvv(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentPage
