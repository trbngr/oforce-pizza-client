// @flow

export type Pizza = {
  id: number,
  name: string,
  description: string,
  toppings: Array<Topping>
}

export type Topping = {
  id: number,
  name: string,
}
