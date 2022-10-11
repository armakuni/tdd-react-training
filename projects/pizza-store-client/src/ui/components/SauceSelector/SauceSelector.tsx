import Loader from '../Loader';
import Options from '../Options';

export type SaucesFetcher = () => Promise<Record<string, string>>

interface SauceSelectorProps {
  fetchSauces: SaucesFetcher;
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
