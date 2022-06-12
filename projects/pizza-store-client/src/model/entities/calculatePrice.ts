/* eslint-disable */

import groupBy from "../../helpers/groupBy";
import { PriceCalculator } from "./PriceCalculator";

const calculatePrice: PriceCalculator = (priceList: any, input: any) => {
  // console.log(input);

  const result = groupBy((price: any) => price.type, priceList);

  const prices = {
    sizes: result.size.map((size) => ({ ...size, size: size.id })),
    toppings: result.topping,
  };

  /* Calculate pizza price
    1. Calculate price of pizza based on size
    2. To implement - JIRA-12345
    3. Calculate price of toppings
    4. Apply discount to toppings price
    5. Sum it all together
  */

  // Price of pizza
  var pp;
  // Topping prices
  var topPri = [];
  // Discounted topping prices
  var discTop = [];
  // Total price of toppings after discount
  var discTopPri = 0;

  if (input.size === '') {
    pp = 0;
  } else {
    for (let size of prices.sizes) {
      if (size.size === input.size) {
        pp = size.price;
      }
    }
  }

  for (let choice of input.toppings) {
    var tempPrice = 0;
    for (let t of prices.toppings) {
      if (choice === t.id) {
        tempPrice = t.price;
      }
    }

    if (input.size === '') {
      tempPrice = 0;
    } else {
      var multi;
      for (let size of prices.sizes) {
        if (size.size === input.size) {
          multi = size.toppingPriceMultiplier;
        }
      }
      tempPrice = multi * tempPrice;
    }

    topPri.push(tempPrice);

  }

  const topNo = topPri.length;


  // Change to 3 after JIRA-1234 has been completed
  if (topNo > 2) {


    /*
    Uncomment this and comment-out following line when JIRA-1234 is complete
    const numberToDeduct = Math.floor(toppingCount / 4);*/

    const numberToDeduct = Math.floor(topNo / 3);
    topPri.sort();


    for (let i = numberToDeduct; i < topPri.length; i++) {
      discTop.push(topPri[i]);
    }

  } else {
    discTop = topPri;
  }

  for (let temp of discTop) {
    discTopPri = discTopPri + temp; // Need to change this in future
  }

  /*
  if (input.size === 'x-large' && topNo > 3) {
      total = total - 2;
  } else if (input.size === 'large' && topNo > 3) {
      total = total - 1;
  } else {
      total = total - 0.5;
  }
  */

  return pp + discTopPri;
}

export default calculatePrice;
