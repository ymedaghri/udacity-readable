import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render()
  {
    return (
      <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Udacity Readable Project</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://ymedaghri.github.io/">by Youssef</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/ymedaghri">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
           )
  }
}

export default Header
