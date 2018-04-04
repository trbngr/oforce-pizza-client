import {schema} from 'normalizr';

export const topping = new schema.Entity('topping');
export const pizza = new schema.Entity('pizza', {
  toppings: [topping]
});
export const notification = new schema.Entity('notification');
