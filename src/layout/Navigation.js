import React from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  state = { isOpen: false };
  toggle = () => this.setState(st => ({ isOpen: !st.isOpen }));

  render() {
    return (
      <Navbar color="inverse" light expand="md">
        <NavbarBrand tag={Link} to="/">Pizzah</NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/pizzas">Pizzas</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to="/toppings"
              >
                Toppings
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {};

export default Navigation;
