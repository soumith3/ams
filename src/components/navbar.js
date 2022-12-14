import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap';


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userdetails, updateuserdetails] = useState(localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null)

  const toggle = () => setIsOpen(!isOpen);

  const logoutuser = (event) => {
    event.preventDefault();
    localStorage.setItem("userdetails", null)
    window.location.href = "/login";
  }

  console.log(userdetails, 'userdetails')
  return (
    <div className='position-relative'>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><h2 className='logoImage'>Attendance Management System</h2></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {!userdetails ? <React.Fragment>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem></React.Fragment> : null}
            {userdetails ? <React.Fragment>
              <NavItem>
                <NavLink href='/createsection'>Create Section</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(event) => logoutuser(event)}>Logout</NavLink>
              </NavItem>
            </React.Fragment> : null}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar