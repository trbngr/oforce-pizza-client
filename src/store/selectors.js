import {createSelector} from 'reselect'

export const isFetchingData = createSelector(
  state => state.app,
  app => app.fetchingData
);

export const toppings = createSelector(
  state => state.db.currentToppings,
  state => state.db.entities.topping,
  (ids, entities) => ids.map(id => entities[id])
);

export const pizzas = createSelector(
  state => state.db.currentPizzas,
  state => state.db.entities.pizza,
  state => state.db.entities.topping,
  (ids, pizzas, toppings) =>
    ids.map(pizzaId => {
      const pizza = pizzas[pizzaId];
      return {
        ...pizza,
        toppings: (pizza.toppings || []).map(toppingId => toppings[toppingId])
      };
    })
);

const allNotifications = createSelector(
  state => state.db.currentNotifications,
  state => state.db.entities.notification,
  (ids, notifications) => {
    console.log({ids, notifications});
    return ids.map(id => ({id, ...notifications[id]}))
  }
);

const errorNotifications = createSelector(
  allNotifications,
  notifications => notifications.filter(x => x.type === 'error')
);

const successNotifications = createSelector(
  allNotifications,
  notifications => notifications.filter(x => x.type === 'success')
);

export const notifications = createSelector(
  errorNotifications, successNotifications,
  (error, success) => ({error, success})
);

