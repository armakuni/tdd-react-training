import './PizzaSummary.css';

interface PizzaSummaryProps {
  size: string,
  sauce: string,
  toppings: string[],
  price: string,
}

export default function PizzaSummary({
  size, sauce, toppings, price,
}: PizzaSummaryProps) {
  return (
    <div className="pizza-summary">
      <div className="pizza-summary__description">
        You are ordering
        <br />
        a
        {' '}
        {size && <strong>{size}</strong>}
        {' '}
        {sauce && <strong>{sauce}</strong>}
        {' '}
        pizza
        <br />
        {toppings.length > 0 && (
          <>
            with extra
            <br />
            <strong>{toppings.join(', ')}</strong>
          </>
        )}
      </div>
      <div className="pizza-summary__price">
        &pound;
        {price}
      </div>
    </div>
  );
}
