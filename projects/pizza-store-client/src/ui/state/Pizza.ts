export interface Pizza {
  readonly size: string | undefined;
  readonly sauce: string | undefined;
  readonly toppings: Set<string>;
}

export function create(): Pizza {
  return {
    size: undefined,
    sauce: undefined,
    toppings: new Set(),
  };
}

export function setSize(pizza: Pizza, size: string): Pizza {
  return { ...pizza, size };
}

export function setSauce(pizza: Pizza, sauce: string): Pizza {
  return { ...pizza, sauce };
}

export function setToppings(pizza: Pizza, toppings: Set<string>): Pizza {
  return { ...pizza, toppings };
}
