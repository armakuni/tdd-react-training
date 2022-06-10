import { FetchSizes } from '../../model/SizeRepository';
import Options from '../Options';
import SizeLoader from '../SizeLoader';

interface SizeSelectorProps {
  fetchSizes: FetchSizes;
  onUpdate: (value: string) => void;
}

export default function SizeSelector({ fetchSizes, onUpdate }: SizeSelectorProps) {
  return (
    <SizeLoader fetchSizes={fetchSizes}>
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
