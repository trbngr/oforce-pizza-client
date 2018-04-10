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
import Search from '../components/Search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchForPizza } from '../actions';
import * as selectors from '../store/selectors'


class Navigation extends React.Component {
  state = { isOpen: false };
  toggle = () => this.setState(st => ({ isOpen: !st.isOpen }));

  render() {
    return (
      <Navbar color="inverse" light expand="md">
        <NavbarBrand tag={Link} to="/">Pizzahhhh</NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Search
              searchFilter={this.props.searchFilter}
              onSearch={this.props.actions.searchForPizza}
            />
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

export default connect(
  state => ({
    searchFilter: selectors.searchFilter(state)
  }),
  dispatch => ({
    actions: bindActionCreators({searchForPizza}, dispatch)
  })
)(Navigation);
