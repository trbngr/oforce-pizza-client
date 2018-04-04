import * as React from 'react';
import type { Topping } from '../../../types';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

type ToppingFormProps = {
  pizza: ?Topping,
  onCancel: () => void,
  onSave: (name: string, description: string) => void,
}

type ToppingFormState = {
  name: string
};

class ToppingForm extends React.Component<ToppingFormProps, ToppingFormState> {
  state = {
    name: ''
  };

  setValue = name => ({ currentTarget: { value } }) => this.setState({ [name]: value });

  isValid = () => this.state.name.length > 2;

  saveTopping = (e) => {
    e.stopPropagation();
    const {name, description} = this.state;
    this.props.onSave(name, description);
  };

  render() {
    const { name } = this.state;
    const { onCancel } = this.props;
    const valid = this.isValid();
    return (
      <Form>
        <FormGroup>
          <Label for="name">Topping Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            valid={valid}
            invalid={!valid}
            onChange={this.setValue('name')}
          />
          {!this.isValid() && (
            <FormFeedback>
              Whoops. This name is too short.
            </FormFeedback>
          )}
        </FormGroup>

        <hr/>
        <FormGroup row>
          <Col sm={{ size: 2, offset: 7 }}>
            <Button onClick={onCancel}>Cancel</Button>
          </Col>
          <Col sm={2}>
            <Button onClick={this.saveTopping} color="success">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default ToppingForm;
