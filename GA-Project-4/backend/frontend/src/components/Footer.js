import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
export default function Footer() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center py-3">This is the footer</Col>
        </Row>
      </Container>
    </div>
  )
}
