import Options from '../Options';
import Loader from '../Loader';

export type SizesFetcher = () => Promise<Record<string, string>>

interface SizeSelectorProps {
  fetchSizes: SizesFetcher;
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
