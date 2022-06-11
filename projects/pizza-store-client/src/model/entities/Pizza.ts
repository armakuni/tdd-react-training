import { Sauce } from './Sauce';
import { Size } from './Size';
import { ToppingID } from './Topping';

export interface Pizza {
  readonly size: Size | undefined;
  readonly sauce: Sauce | undefined;
  readonly toppings: Set<ToppingID>;
}

export function create(): Pizza {
  return {
    size: undefined,
    sauce: undefined,
    toppings: new Set(),
  };
}

export function setSize(pizza: Pizza, size: Size): Pizza {
  return { ...pizza, size };
}

export function setSauce(pizza: Pizza, sauce: Sauce): Pizza {
  return { ...pizza, sauce };
}

export function setToppings(pizza: Pizza, toppings: Set<ToppingID>): Pizza {
  return { ...pizza, toppings };
}
