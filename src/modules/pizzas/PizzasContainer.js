// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';

import type { Pizza, Topping } from '../../types';

import PizzaList from './components/PizzaList';
import * as selectors from '../../store/selectors';
import {
  fetchPizzas,
  fetchPizzaToppings,
  removePizza,
  createPizza,
  fetchToppings,
  addToppingToPizza,
  removeToppingFromPizza,
  clearSearchFilter
} from '../../actions/index';
import PizzaForm from './components/PizzaForm';

type PizzasContainerProps = {
  fetching: boolean,
  pizzas: Array<Pizza>,
  toppings: Array<Topping>,
  location: any,
  actions: {
    fetchPizzas: () => void,
    fetchToppings: () => void,
    removePizza: (id: number) => void,
    fetchPizzaToppings: (id: number) => void,
    createPizza: (name: string, description: string) => void,
    addToppingToPizza: (pizzaId: number, toppingId: number) => void,
    removeToppingFromPizza: (pizzaId: number, toppingId: number) => void,
    clearSearchFilter: () => void,
  }
};
type PizzasContainerState = { showForm: boolean };

class PizzasContainer extends React.Component<PizzasContainerProps, PizzasContainerState> {

  state = { showForm: false };

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPizzas();
    actions.fetchToppings();
    const { location: { state } } = this.props;
    this.setState({ showForm: Boolean((state || {}).create) });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.searchFilter !== this.props.searchFilter && !nextProps.searchFilter){
      const { actions } = this.props;
      actions.fetchPizzas();
    }
  }


  toggleForm = () => this.setState(st => ({ showForm: !st.showForm }));

  createPizza = (name: string, description: string) => this.setState(
    { showForm: false },
    () => this.props.actions.createPizza(name, description)
  );

  render() {
    const { fetching, pizzas, actions, toppings, searchFilter } = this.props;

    console.log(this.props)

    return (
      <div>
        <Row>
          <Col sm={{ size: 2, offset: 10 }}>
            <Button color="success" onClick={this.toggleForm}>
              Create a Pizza
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Pizzas</h1>
          </Col>
        </Row>
        {
          searchFilter && (
            <Row>
              <Col><Button onClick={actions.clearSearchFilter}>Clear Filter</Button></Col>
            </Row>
          )
        }
        <Row>
          <Col>
            <PizzaList
              pizzas={pizzas}
              loading={fetching}
              toppings={toppings}
              onRemove={actions.removePizza}
              onPizzaClick={actions.fetchPizzaToppings}
              onAddTopping={actions.addToppingToPizza}
              onRemoveTopping={actions.removeToppingFromPizza}
            />
          </Col>
        </Row>

        <Modal
          backdrop="static"
          isOpen={this.state.showForm}
          toggle={this.toggleForm}
        >
          <ModalHeader toggle={this.toggleForm}>Create a Pizza</ModalHeader>
          <ModalBody>
            <PizzaForm
              toppings={toppings}
              onCancel={this.toggleForm}
              onSave={this.createPizza}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    searchFilter: selectors.searchFilter(state),
    fetching: selectors.isFetchingData(state),
    pizzas: selectors.pizzas(state),
    toppings: selectors.toppings(state)
  }),
  (dispatch) => ({
    actions: bindActionCreators({
      removePizza,
      createPizza,
      fetchPizzas,
      fetchToppings,
      addToppingToPizza,
      fetchPizzaToppings,
      removeToppingFromPizza,
      clearSearchFilter
    }, dispatch)
  })
)(PizzasContainer);
