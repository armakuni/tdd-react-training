interface PizzaSummaryProps {
  size: string,
  price: string,
}

export default function PizzaSummary({ size, price }: PizzaSummaryProps) {
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
