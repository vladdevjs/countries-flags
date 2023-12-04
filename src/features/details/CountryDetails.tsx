import { NavigateFunction } from 'react-router';
import { Info } from './Info';
import { useDetails } from './useDetails';

interface CountryDetailsProps {
  name?: string;
  navigate: NavigateFunction;
}

export const CountryDetails = ({ name = '', navigate }: CountryDetailsProps) => {
  const { currentCountry, error, status } = useDetails(name);

  return (
    <>
      {status === 'loading' && <h2>Loading ... </h2>}
      {error && <h2>{error}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </>
  );
};
