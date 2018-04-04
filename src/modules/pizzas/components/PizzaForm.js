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

  isNameValid = () => this.state.name.length > 0;
  isDescriptionValid = () => this.state.description.length > 0;

  savePizza = (e) => {
    e.stopPropagation();
    const { name, description } = this.state;
    this.props.onSave(name, description);
  };

  render() {
    const { name, description } = this.state;
    const { onCancel } = this.props;
    const nameValid = this.isNameValid();
    const descriptionValid = this.isDescriptionValid();
    return (
      <Form>
        <FormGroup>
          <Label for="name">Pizza Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            valid={nameValid}
            invalid={!nameValid}
            onChange={this.setValue('name')}
          />
          {!nameValid && (
            <FormFeedback> Name is required </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            id="description"
            type="text"
            value={description}
            valid={descriptionValid}
            invalid={!descriptionValid}
            onChange={this.setValue('description')}
          />
          {!descriptionValid && (
            <FormFeedback> Description is required. </FormFeedback>
          )}
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
