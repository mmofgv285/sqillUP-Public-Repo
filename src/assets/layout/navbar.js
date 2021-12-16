import React from 'react';
import { 
    Nav,
    Navbar,
    NavItem,
    NavLink,
    NavbarBrand,
    NavbarText,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem

 } from 'reactstrap';
 import "../scss/navBarStyle.scss";

class NavBar extends React.Component {
render(){
    return(
    <>
    <div>
            <Navbar
                className='nav-primary-color'
                expand="md"
                light
            >
                <NavbarBrand className='nav-header' href="/">
                    SqillUP
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                    </Nav>
                    <NavbarText>
                        Simple Text
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    </>
    );
}
}
export default NavBar;