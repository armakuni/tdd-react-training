import {
  CustomerID, Discount, Order, Product, ProductID, ProductClassTypes
} from './database';

/* eslint-disable */
export type ProductLoader = (pid: ProductID) => Product;

export default function calculateDiscount(order: Order, loadProduct: ProductLoader): number {
  let discount = 0;
  
  let premiumProductCount = 0
  let totalPremiumProductCost = 0
   
  let standardProductCount = 0
  let totalStandardProductCost = 0

  let totalBudgetProductCost = 0

  var itemCount = order.items.length;

  // const products = order.items.map(item => loadProduct(item.productId));
  // const premiumCount = products.filter(p => p.productClass === ProductClassTypes.PREMIUM).length;

  for (const item of order.items) {
    let product = loadProduct(item.productId);

    const isPremiumProduct = product.productClass === ProductClassTypes.PREMIUM;
    const isStandardProduct = product.productClass === ProductClassTypes.STANDARD;
    const isBudgetProduct = product.productClass === ProductClassTypes.BUDGET;
    
    if (isPremiumProduct) {
      premiumProductCount++;
      totalPremiumProductCost += product.price;
    } else if (isStandardProduct) {
      standardProductCount++;
      totalStandardProductCost += product.price;
    } else if (isBudgetProduct) {
      totalBudgetProductCost += product.price;
    }
  }
  
  if (itemCount >= 10) {
    discount += discountProduct(totalBudgetProductCost, 0.2);
    if (premiumProductCount >= 3) {
      discount += discountProduct(totalPremiumProductCost, 0.05) ;
    }
    discount += applyStandardDiscount(standardProductCount, totalStandardProductCost);
  } else if (itemCount >= 5) {
    if (premiumProductCount >= 3){
      discount = discount + discountProduct(totalPremiumProductCost, 0.05);
    }
  
    discount += applyStandardDiscount(standardProductCount, totalStandardProductCost);

    return discount + calcPrecent(20, totalBudgetProductCost)

  } else if (itemCount >= 3) {
    discount += discountProduct(totalBudgetProductCost, 0.1); 

    if (premiumProductCount >= 3) { 
      discount += discountProduct(totalPremiumProductCost, 0.2);
    };

    discount += applyStandardDiscount(standardProductCount, totalStandardProductCost);
  }

  return roundTo2DecimalPlaces(discount);
}

function roundTo2DecimalPlaces(discount: number): number {
  return Number(discount.toPrecision(2));
}

function applyStandardDiscount(productCount: number, productCost: number): number {
  const discountThreshold = 3;
  const discountMultiplier = 0.1;
  return productCount >= discountThreshold ? discountProduct(productCost, discountMultiplier) : 0;
}

function discountProduct(totalBudgetProductCost: number, discountMultiplier: number) {
  return totalBudgetProductCost * discountMultiplier;
}

function calcPrecent(percent: number, amt: number) {
  var mult = 100 / percent
  return (1 / mult )* amt
}
