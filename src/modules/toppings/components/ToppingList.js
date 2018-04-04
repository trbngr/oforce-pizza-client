// @flow
import * as React from 'react';
import type { Topping } from '../../../types';
import { Button, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

type ToppingListProps = {
  toppings: Array<Topping>,
  onRemove: (id: number) => () => void,
}

const ToppingList = (props: ToppingListProps) => (
  <ListGroup>
    {props.toppings.map(topping => (
      <ListGroupItem key={topping.id}>
        <Row>

          <Col>
            <div>{topping.name}</div>
          </Col>

          <Col sm={2}>
            <Button
              outline
              onClick={props.onRemove(topping.id)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    ))}
  </ListGroup>
);

export default ToppingList;
