import * as types from '../actions/types';
import { normalize } from 'normalizr';
import * as schema from './schema';

const initialState = {
  entities: {
    pizza: {},
    topping: {},
    notification: {}
  },
  currentPizzas: [],
  currentToppings: [],
  currentNotifications: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.PIZZAS_RETRIEVED:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.payload.entities
        },
        currentPizzas: action.payload.result
      };

    case types.TOPPINGS_RETRIEVED:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.payload.entities
        },
        currentToppings: action.payload.result
      };

    case types.PIZZA_CREATED:
      return {
        ...state,
        entities: {
          ...state.entities,
          pizza: {
            ...action.payload.entities.pizza,
            ...state.entities.pizza
          }
        },
        currentPizzas: [action.payload.result, ...state.currentPizzas]
      };

    case types.TOPPING_CREATED:
      return {
        ...state,
        entities: {
          ...state.entities,
          topping: {
            ...action.payload.entities.topping,
            ...state.entities.topping
          }
        },
        currentToppings: [action.payload.result, ...state.currentToppings]
      };

    case types.TOPPING_REMOVED:
      return removeTopping(state, action);

    case types.PIZZA_TOPPINGS_RETRIEVED:
      return addToppingsToPizza(state, action);

    case types.PIZZA_REMOVED:
      return removePizza(state, action);

    case types.TOPPING_ADDED_TO_PIZZA:
      return addToppingToPizza(state, action);

    case types.TOPPING_REMOVED_FROM_PIZZA:
      return removeToppingFromPizza(state, action);

    case types.NOTIFICATION_RECEIVED:
      return {
        ...state,
        entities: {
          ...state.entities,
          notification: {
            ...state.entities.notification,
            ...action.payload.entities.notification,
          }
        },
        currentNotifications: [...state.currentNotifications, action.payload.result]
      };

    case types.NOTIFICATION_DISMISSED:
      return removeNotification(state, action);

    default:
      return state;
  }
}

//Need a nice lens lib here.
function addToppingsToPizza(state, { payload: { id, entities, result } }) {
  return {
    ...state,
    entities: {
      ...state.entities,
      pizza: {
        ...state.entities.pizza,
        [id]: {
          ...state.entities.pizza[id],
          toppings: result
        }
      },
      topping: {
        ...entities.topping,
        ...state.entities.topping
      }
    }
  };
}

function removePizza(state, action) {
  const newIds = state.currentPizzas.filter(id => id !== action.payload.id);
  const newPizzas = newIds.map(id => state.entities.pizza[id]);
  const normalizedData = normalize(newPizzas, [schema.pizza]);

  return {
    ...state,
    entities: {
      ...state.entities,
      pizza: {
        ...normalizedData.entities.pizza
      }
    },
    currentPizzas: newIds
  };
}

function removeTopping(state, action) {
  const newIds = state.currentToppings.filter(id => id !== action.payload.id);
  const newToppings = newIds.map(id => state.entities.topping[id]);
  const normalizedData = normalize(newToppings, [schema.topping]);

  return {
    ...state,
    entities: {
      ...state.entities,
      topping: {
        ...normalizedData.entities.topping
      }
    },
    currentToppings: newIds
  };
}

function addToppingToPizza(state, action) {
  const { pizzaId, toppingId } = action.payload;
  const pizza = state.entities.pizza[pizzaId];
  const toppings = [toppingId, ...pizza.toppings];
  return {
    ...state,
    entities: {
      ...state.entities,
      pizza: {
        ...state.entities.pizza,
        [pizzaId]: {
          ...pizza,
          toppings,
        }
      }
    }
  };
}

function removeToppingFromPizza(state, action) {
  const { pizzaId, toppingId } = action.payload;
  const pizza = state.entities.pizza[pizzaId];
  const toppings = pizza.toppings.filter(x => x !== toppingId);
  return {
    ...state,
    entities: {
      ...state.entities,
      pizza: {
        ...state.entities.pizza,
        [pizzaId]: {
          ...pizza,
          toppings,
        }
      }
    }
  };
}

function removeNotification(state, action) {
  const newIds = state.currentNotifications.filter(id => id !== action.payload.id);
  const newNotifications = newIds.map(id => state.entities.notification[id]);
  const normalizedData = normalize(newNotifications, [schema.notification]);

  return {
    ...state,
    entities: {
      ...state.entities,
      notification: {
        ...normalizedData.entities.notification
      },
    },
    currentNotifications: newIds
  };
}

