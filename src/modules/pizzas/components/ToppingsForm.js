import React from 'react';
import type { Pizza, Topping } from '../../../types';
import ToppingCheckbox from './ToppingCheckbox';
import { Button, Col, Form, FormGroup } from 'reactstrap';

type ToppingsFormProps = {
  pizza: Pizza,
  onClose: () => void,
  toppings: Array<Topping>,
  onAdd: (pizzaId: number, toppingId: number) => void,
  onRemove: (pizzaId: number, toppingId: number) => void,
}

class ToppingsForm extends React.Component<ToppingsFormProps> {

  changeTopping = (toppingId: number, checked: boolean) => {
    const { onAdd, onRemove, pizza } = this.props;
    checked ? onAdd(pizza.id, toppingId) : onRemove(pizza.id, toppingId);
  };

  hasTopping = (topping: Topping) => this.props.pizza.toppings
    .map(top => top.id)
    .includes(topping.id);

  render() {
    const { toppings, onClose } = this.props;
    return (
      <Form>
        {toppings.map(topping => (
            <ToppingCheckbox
              key={topping.id}
              topping={topping}
              onChange={this.changeTopping}
              selected={this.hasTopping(topping)}
            />
          )
        )}
        <hr/>
        <FormGroup row>
          <Col sm={{ size: 2, offset: 10 }}>
            <Button onClick={onClose}>Done</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default ToppingsForm;
