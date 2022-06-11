import { SauceID } from './Sauce';
import { SizeID } from './Size';
import { ToppingID } from './Topping';

export interface Pizza {
  readonly size: SizeID | undefined;
  readonly sauce: SauceID | undefined;
  readonly toppings: Set<ToppingID>;
}

export function create(): Pizza {
  return {
    size: undefined,
    sauce: undefined,
    toppings: new Set(),
  };
}

export function setSize(pizza: Pizza, size: SizeID): Pizza {
  return { ...pizza, size };
}

export function setSauce(pizza: Pizza, sauce: SauceID): Pizza {
  return { ...pizza, sauce };
}

export function setToppings(pizza: Pizza, toppings: Set<ToppingID>): Pizza {
  return { ...pizza, toppings };
}
