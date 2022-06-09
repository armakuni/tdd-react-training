import Options from '../Options';
import SauceLoader from '../SauceLoader';

interface SauceSelectorProps {
  onUpdate: (value: string) => void;
}

export default function SauceSelector({ onUpdate }: SauceSelectorProps) {
  return (
    <SauceLoader>
      {(sauces) => (
        <Options
          question="Select the sauce for your paucea"
          options={sauces}
          onUpdate={onUpdate}
        />
      )}
    </SauceLoader>
  );
}
