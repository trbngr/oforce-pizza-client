// @flow
import React from 'react';
import type { Pizza } from '../../../types';
import { Collapse, Fade, Media } from 'reactstrap';

type Props = {
  pizza: Pizza,
  close: () => void,
  loading: boolean
}

const PizzaToppings = (props: Props) => {
  const { pizza: { toppings } } = props;
  return (
    <Fade enter exit in>
      <Collapse isOpen={true}>
        <ul className="">
          {(toppings || []).map(topping => (
            <Media key={topping.id}>
              <Media body>
                {topping.name}
              </Media>
            </Media>
          ))}
        </ul>
      </Collapse>
    </Fade>
  );
};

export default PizzaToppings;
