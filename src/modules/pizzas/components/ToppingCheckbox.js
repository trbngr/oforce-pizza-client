import React from 'react';
import type { Topping } from '../../../types';
import { FormGroup, Input, Label } from 'reactstrap';

type ToppingCheckboxProps = {
  topping: Topping,
  selected: boolean,
  onChange: (id: number, checked: boolean) => void
}

const ToppingCheckbox = (props: ToppingCheckboxProps) => {
  const topping = props.topping;
  const id = topping.id;
  const domId = `top-${id}`;

  return (
    <FormGroup check inline>
      <Input
        value={id}
        id={domId}
        type="checkbox"
        onChange={({currentTarget: {checked, value}}) => props.onChange(parseInt(value, 10), checked)}
        checked={props.selected}
      />
      <Label for={domId}>{topping.name}</Label>
    </FormGroup>
  );
};

export default ToppingCheckbox;
