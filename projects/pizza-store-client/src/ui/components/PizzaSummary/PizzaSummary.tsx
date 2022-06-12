interface PizzaProps {
  size: string,
  price: string,
}

export default function PizzaSummary({ size, price }: PizzaProps) {
  return (
    <div>
      <div>
        Size:
        {size}
      </div>
      <div>
        Price:
        £
        {price}
      </div>
    </div>
  );
}
