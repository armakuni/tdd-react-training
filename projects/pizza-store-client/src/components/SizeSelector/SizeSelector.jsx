import React from 'react';
import Options from '../Options';
import SizeLoader from '../SizeLoader';

export default function SizeSelector({ onUpdate }) {
  return (
    <SizeLoader>
      {(sizes) => (
        <Options
          question="Select the size of your pizza"
          options={sizes}
          onUpdate={onUpdate}
        />
      )}
    </SizeLoader>
  );
}
