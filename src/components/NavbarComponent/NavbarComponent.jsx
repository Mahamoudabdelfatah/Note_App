import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaBoxOpen } from "react-icons/fa";



const NavbarComponent = () => {

  let navigate = useNavigate()

  let userToken = localStorage.getItem("userToken")

  function handleLogout(){
    localStorage.removeItem("userToken")
    navigate("/login")
  }

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="#home" className='text-white fw-bold fs-4'>Sticky App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {userToken ? (

              <>
                <Nav.Link className='text-white fw-bold fs-6'>
                  <div style={{ position: 'relative', display: 'inline-block' }}>

                    <FaBoxOpen size={30} className="text-white" />
                    <span
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '4px 7px',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      11
                    </span>
                  </div>
                </Nav.Link>
                <Nav.Link className='text-white fw-bold fs-6' onClick={handleLogout} >Logout</Nav.Link>
              </>
            ) : (<>
              <Nav.Link as={Link} to="/register" className='text-white fw-bold fs-6'>Register</Nav.Link>
              <Nav.Link as={Link} to="/login" className='text-white fw-bold fs-6'>Login</Nav.Link>
            </>)}




            <div className="d-flex px-5 gap-3 align-items-center ">
              <FaFacebook size={22} className='text-white' />
              <FaTwitter size={22} className='text-white' />
              <FaInstagram size={22} className='text-white' />
              <FaLinkedin size={22} className='text-white' />
            </div>



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
