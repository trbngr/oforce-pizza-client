import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';

import * as selectors from '../../store/selectors';
import {
  createTopping,
  deleteTopping,
  fetchToppings
} from '../../actions/index';
import type { Topping } from '../../types';
import ToppingList from './components/ToppingList';
import ToppingForm from './components/ToppingForm';

type ToppingsContainerProps = {
  fetching: boolean,
  toppings: Array<Topping>,
  actions: {
    fetchToppings: () => void,
    deleteTopping: (id: number) => void,
    createTopping: (name: string) => void,
  }
};
type ToppingsContainerState = { showForm: boolean };

class ToppingsContainer extends React.Component<ToppingsContainerProps, ToppingsContainerState> {

  state = { showForm: false };

  componentDidMount() {
    this.props.actions.fetchToppings();
    const { location: { state } } = this.props;
    this.setState({ showForm: Boolean((state || {}).create) });
  }

  toggleForm = () => this.setState(st => ({ showForm: !st.showForm }));

  createTopping = (name: string) => this.setState(
    { showForm: false },
    () => this.props.actions.createTopping(name)
  );

  deleteTopping = (id: number) => () =>
    this.props.actions.deleteTopping(id);

  render() {
    const { toppings } = this.props;
    return (
      <div>
        <Row>
          <Col sm={{ size: 2, offset: 10 }}>
            <Button color="success" onClick={this.toggleForm}>
              Create a Topping
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Toppings</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ToppingList
              toppings={toppings}
              onRemove={this.deleteTopping}
            />
          </Col>
        </Row>

        <Modal
          backdrop="static"
          isOpen={this.state.showForm}
          toggle={this.toggleForm}
        >
          <ModalHeader toggle={this.toggleForm}>Create a Topping</ModalHeader>
          <ModalBody>
            <ToppingForm
              toppings={toppings}
              onCancel={this.toggleForm}
              onSave={this.createTopping}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    fetching: selectors.isFetchingData(state),
    toppings: selectors.toppings(state)
  }),
  (dispatch) => ({
    actions: bindActionCreators({
      createTopping,
      deleteTopping,
      fetchToppings,
    }, dispatch)
  })
)(ToppingsContainer);
