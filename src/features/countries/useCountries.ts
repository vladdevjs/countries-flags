import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectControls } from 'features/controls/controls-selectors';
import { loadCountries } from './countries-slice';
import { selectCountriesInfo, selectVisibleCountries } from './countries-selectors';
import { RootState, useAppDispatch } from 'store';
import { Country } from 'types';

export const useCountries = (): [Country[], ReturnType<typeof selectCountriesInfo>] => {
  const dispatch = useAppDispatch();
  const { search, region } = useSelector(selectControls);
  const countries = useSelector((state: RootState) => selectVisibleCountries(state, { search, region }));
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error } as ReturnType<typeof selectCountriesInfo>];
};
