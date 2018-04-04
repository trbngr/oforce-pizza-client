import uuid from 'uuid/v1';
import { normalize } from 'normalizr';

import http from './http';
import * as types from './types';
import { notification } from '../store/schema';

export const fetchPizzas = () => async (dispatch, getState, { schema }) => {
  await http.get('pizzas', data => ({
    type: types.PIZZAS_RETRIEVED,
    payload: normalize(data, [schema.pizza])
  }))(dispatch);
};

export const fetchPizzaToppings = (id: number) => async (dispatch, getState, { schema }) => {
  await http.get(`pizzas/${id}/toppings`, data => ({
    type: types.PIZZA_TOPPINGS_RETRIEVED,
    payload: {
      id,
      ...normalize(data, [schema.topping]),
    }
  }))(dispatch);
};

export const createPizza = (name, description) =>
  async (dispatch, getState, { schema }) => {
    await http.post(`pizzas`, { name, description }, response => {
      return ({
        type: types.PIZZA_CREATED,
        payload: normalize(response, schema.pizza)
      });
    })(dispatch);
  };

export const removePizza = id => async (dispatch) => {
  await http.delete(`pizzas/${id}`, () => {
    return ({
      type: types.PIZZA_REMOVED,
      payload: { id }
    });
  })(dispatch, {expectEmptyResponse:true});
};

export const addToppingToPizza = (pizzaId: number, toppingId: number) =>
  async (dispatch) => {
    await http.post(`pizzas/${pizzaId}/toppings?toppingId=${toppingId}`, () => {
      return ({
        type: types.TOPPING_ADDED_TO_PIZZA,
        payload: { pizzaId, toppingId }
      });
    })(dispatch, {expectEmptyResponse:true});
  };

export const removeToppingFromPizza = (pizzaId: number, toppingId: number) =>
  async (dispatch) => {
    await http.delete(`pizzas/${pizzaId}/toppings/${toppingId}`, () => ({
      type: types.TOPPING_REMOVED_FROM_PIZZA,
      payload: { pizzaId, toppingId }
    }))(dispatch, {expectEmptyResponse:true});
  };

export const fetchToppings = () => async (dispatch, getState, { schema }) => {
  await http.get('toppings', response => ({
    type: types.TOPPINGS_RETRIEVED,
    payload: normalize(response, [schema.topping])
  }))(dispatch);
};

export const createTopping = (name: string) =>
  async (dispatch, getState, { schema }) => {
    await http.post('toppings', { name }, response => [
      {
        type: types.TOPPING_CREATED,
        payload: normalize(response, schema.topping)
      },
      sendNotification(`Topping ${name} created.`)
    ])(dispatch);
  };

export const deleteTopping = (id: number) =>
  async (dispatch) => {
    const options = {
      expectEmptyResponse:true,
      handleError: () => raiseError("Topping belongs to at least one pizza.")
    };
    return await http.delete(`toppings/${id}`, () => [
      { type: types.TOPPING_REMOVED, payload: { id } },
      sendNotification('Topping removed.')
    ])(dispatch, options);
  };

export const fetchingData = { type: types.FETCHING_DATA };
export const completeDataFetching = { type: types.FETCHING_DATA_COMPLETE };

export const raiseError = messages => ({
  type: types.NOTIFICATION_RECEIVED,
  payload: normalize({
    id: uuid(),
    type: 'error',
    messages: Array.isArray(messages) ? messages : [messages]
  }, notification)
});

export const sendNotification = message => ({
  type: types.NOTIFICATION_RECEIVED,
  payload: normalize({ id: uuid(), type: 'success', message }, notification)
});

export const dismissNotification = id => ({
  type: types.NOTIFICATION_DISMISSED,
  payload: { id }
});
