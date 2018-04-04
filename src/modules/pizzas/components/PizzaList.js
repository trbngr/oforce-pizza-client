// @flow
import * as React from 'react';
import type { Pizza, Topping } from '../../../types';
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Modal, ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import styled from 'styled-components';
import PizzaToppings from './PizzaToppings';
import ToppingsForm from './ToppingsForm';

type PizzaListProps = {
  loading: boolean,
  pizzas: Array<Pizza>,
  toppings: Array<Topping>,
  onRemove: (id: number) => void,
  onPizzaClick: (id: number) => void,
  onAddTopping: (pizzaId: number, toppingId: number) => void,
  onRemoveTopping: (pizzaId: number, toppingId: number) => void,
}

type PizzaListState = {
  activeId: ?number,
  showEditor: boolean
}

const PizzaTitle = styled.div`
  cursor: pointer;
`;

class PizzaList extends React.Component<PizzaListProps, PizzaListState> {

  state = {
    activeId: undefined,
    showEditor: false
  };

  openPizza = (id: number) => this.setState({ activeId: id }, () =>
    this.props.onPizzaClick(id)
  );

  closePizza = () => this.setState({ activeId: undefined });

  showToppings = (pizza: Pizza) => () => {
    this.setState({ showEditor: false }, () => {
      const { activeId } = this.state;
      return activeId === pizza.id
        ? this.closePizza()
        : this.openPizza(pizza.id);
    });
  };

  removePizza = (pizza: Pizza) => () =>
    this.props.onRemove(pizza.id);

  openEditor = (activeId: number) => () => {
    this.setState(
      { activeId, showEditor: true },
      () => this.props.onPizzaClick(activeId)
    );
  };

  closeEditor = () => this.setState({ showEditor: false });

  renderToppings(id: number) {
    const { pizzas, loading } = this.props;
    const pizza = pizzas.find(x => x.id === id);
    return pizza ? (
      <PizzaToppings
        loading={loading}
        pizza={pizza}
        close={this.showToppings(pizza)}
      />
    ) : null;
  }

  renderToppingEditor() {
    const { pizzas, toppings, onAddTopping, onRemoveTopping } = this.props;
    const { activeId, showEditor } = this.state;
    const pizza = pizzas.find(x => x.id === activeId);
    return (showEditor && pizza) ? (
      <Modal
        backdrop="static"
        isOpen={true}
        toggle={this.closeEditor}
      >
        <ModalHeader
          toggle={this.closeEditor}>{pizza.name} Toppings</ModalHeader>
        <ModalBody>
          <ToppingsForm
            toppings={toppings}
            onAdd={onAddTopping}
            onRemove={onRemoveTopping}
            onClose={this.closeEditor}
            pizza={pizza}
          />
        </ModalBody>
      </Modal>
    ) : null;
  }

  render() {
    const { pizzas } = this.props;
    const { activeId, showEditor } = this.state;
    return (
      <ListGroup>
        {pizzas.map(pizza => (
          <ListGroupItem key={pizza.id}>
            <Row>

              <Col>
                <PizzaTitle
                  id={`pizza-${pizza.id}`}
                  onClick={this.showToppings(pizza)}
                >
                  {pizza.name}
                </PizzaTitle>
              </Col>

              <Col sm={2}>
                <Button
                  outline
                  onClick={this.openEditor(pizza.id)}
                >
                  Edit Toppings
                </Button>
              </Col>

              <Col sm={2}>
                <Button
                  outline
                  color="danger"
                  onClick={this.removePizza(pizza)}
                >
                  Remove
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                {activeId === pizza.id && !showEditor ? this.renderToppings(pizza.id) : null}
              </Col>
            </Row>
          </ListGroupItem>
        ))}
        {this.renderToppingEditor()}
      </ListGroup>
    );
  }
}

export default PizzaList;
