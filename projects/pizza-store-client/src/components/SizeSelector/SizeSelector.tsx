import { FetchSizes } from '../../model/SizeRepository';
import Options from '../Options';
import Loader from '../Loader';

interface SizeSelectorProps {
  fetchSizes: FetchSizes;
  onUpdate: (value: string) => void;
}

export default function SizeSelector({ fetchSizes, onUpdate }: SizeSelectorProps) {
  return (
    <Loader loader={fetchSizes}>
      {(sizes) => (
        <Options
          question="Select the size of your pizza"
          options={sizes}
          onUpdate={onUpdate}
        />
      )}
    </Loader>
  );
}
