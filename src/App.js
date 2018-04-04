import React from 'react';
import Layout from './layout';
import { Button } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { PizzasContainer } from './modules/pizzas';
import { ToppingsContainer } from './modules/toppings';

const Home = ({history}) => (
  <React.Fragment>
    <h1>Welcome to Pizzah</h1>
    <p>
      <Button
        color="success"
        size="large"
        onClick={() => {
          console.log('button click', history);
          history.push('/pizzas', {create: true})
        }}
      >
        Create your Pie!
      </Button>
    </p>
  </React.Fragment>
);

const App = () => (
  <Layout>
    <Switch>
      <Route exact path='/pizzas' component={PizzasContainer}/>
      <Route exact path='/toppings' component={ToppingsContainer}/>
      <Route component={Home} />
    </Switch>
  </Layout>
);

export default App;
