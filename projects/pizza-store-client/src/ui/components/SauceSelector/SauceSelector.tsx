import { FetchSauces } from '../../../model/entities/SauceRepository';
import Loader from '../Loader';
import Options from '../Options';

interface SauceSelectorProps {
  fetchSauces: FetchSauces;
  onUpdate: (value: string) => void;
}

export default function SauceSelector({ fetchSauces, onUpdate }: SauceSelectorProps) {
  return (
    <Loader loader={fetchSauces}>
      {(sauces) => (
        <Options
          question="Select the sauce for your pizza"
          options={sauces}
          onUpdate={onUpdate}
        />
      )}
    </Loader>
  );
}
