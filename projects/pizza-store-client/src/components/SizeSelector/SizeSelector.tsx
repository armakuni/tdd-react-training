import React from 'react';
import Options from '../Options';
import SizeLoader from '../SizeLoader';

interface SizeSelectorProps {
  onUpdate: (value: string) => void;
}

export default function SizeSelector({ onUpdate }: SizeSelectorProps) {
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
