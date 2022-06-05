import React from 'react';

export default function Pizza({ size, price }) {
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
