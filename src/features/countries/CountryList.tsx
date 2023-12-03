import { useNavigate } from 'react-router-dom';
import { useCountries } from './useCountries.js';

import { List } from 'components/List.js';
import { Card } from 'components/Card.js';
import { CountryInfo } from 'types/country.js';

const CountryList = () => {
  const navigate = useNavigate();
  const [countries, { status, error }] = useCountries();

  return (
    <>
      {error && <h2>Cant't fetch data</h2>}
      {status === 'loading' && <h2>Loading....</h2>}
      {status === 'fulfilled' && countries.length === 0 && <h2>Стран в соответствии с вашим запросов не нашлось...</h2>}
      {status === 'fulfilled' && (
        <List>
          {countries.map((c) => {
            const countryInfo: CountryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital,
                },
              ],
            };

            return <Card key={c.name} onClick={() => navigate(`/country/${c.name}`)} {...countryInfo} />;
          })}
        </List>
      )}
    </>
  );
};

export { CountryList };
