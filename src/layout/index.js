import React from 'react';
import { Col, Container, Jumbotron, Row } from 'reactstrap';
import Navigation from './Navigation';
import Toast from './Toast';

export default ({children}) => (
  <div>
    <Toast />
    <Navigation/>
    <Jumbotron>
      <Container>
        <Row>
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </div>
);

