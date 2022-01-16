import React from 'react'
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userActions'

export default function NavBar() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="md">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Supps & Stuff </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <Nav title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <i className="fas fa-user" /> Profile
                    </Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={logoutUser}>
                    <i className="fas fa-sign-out-alt" /> Logout
                  </Nav.Link>
                </Nav>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-sign-in-alt" /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <span></span>
              ) : (
                <LinkContainer to="/register">
                  <Nav.Link>
                    {' '}
                    <i className="fas fa-user-plus" /> Register
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
