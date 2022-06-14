import {
  CustomerID, Discount, loadProduct, Order,
} from './database';

/* eslint-disable */

export default function calculateDiscount(order: any, customerId: any): number {
  var d = 0;
  var cp =0 , tp = 0,
      stndCnt = 0;
  var stndTtl = 0
  var qty = 0;

  var itmes = 0;
  var u = 100;
  let bt = 0;

  if (order.items.length > 0) {
    for (const item of order.items) {
      let p = loadProduct(item.productId);
      if (p.productClass == 'premium') {
        cp++;
        tp += p.price;
        u -= 2
      } else if (p.productClass == 'standard')
      {

        stndCnt++;
        stndTtl += p.price;
        u--;

      }
      itmes++;
      
      if (p.productClass == 'budget') bt += p.price
      
    }
  } else return 0

  function calcPrecent(percent: number, amt: number) {
    var mult = 100 / percent
    return (1 / mult )* amt
  }

  if (itmes >= 10) {
    d += bt / 2;
    if (cp >= 3) {
      d += tp * 0.05;
    }
  
    if (stndCnt >= 3) {
      d += stndTtl * 0.1;
    }

    if (itmes < 10) {
      d += bt / 2;
        d += tp * 0.05;

      d += stndTtl * 0.1;
    }
  }
  
  else if (itmes >= 5) 
  
  {
    ;
    if (cp >= 3){
      d = d + calcPrecent(5, tp);
    }
  
    if (stndCnt >= 3) d += stndTtl * 0.1;
    d = d + calcPrecent(20, bt)
    return d;

  } else if (itmes >= 3) {
    d += bt / (100 / 10);

    if (cp >= 3) d += tp / (100/5);
  
    if (stndCnt >= 3) {
      d += stndTtl * 0.1;
    }
  }




  //  retiurn the discoutn
  return d;
}
