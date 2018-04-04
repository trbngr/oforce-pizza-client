import * as React from 'react';
import type { Pizza } from '../../../types';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

type PizzaFormProps = {
  pizza: ?Pizza,
  onCancel: () => void,
  onSave: (name: string, description: string) => void,
}

type PizzaFormState = {
  name: string,
  description: string
};

class PizzaForm extends React.Component<PizzaFormProps, PizzaFormState> {
  state = {
    name: '',
    description: ''
  };

  setValue = name => ({ currentTarget: { value } }) => this.setState({ [name]: value });

  isValid = () => this.state.name.length > 2;

  savePizza = (e) => {
    e.stopPropagation();
    const {name, description} = this.state;
    this.props.onSave(name, description);
  };

  render() {
    const { name, description} = this.state;
    const { onCancel } = this.props;
    const valid = this.isValid();
    return (
      <Form>
        <FormGroup>
          <Label for="name">Pizza Name</Label>
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
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={this.setValue('description')}
          />
        </FormGroup>
        <hr/>
        <FormGroup row>
          <Col sm={{ size: 2, offset: 7 }}>
            <Button onClick={onCancel}>Cancel</Button>
          </Col>
          <Col sm={2}>
            <Button onClick={this.savePizza} color="success">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default PizzaForm;
