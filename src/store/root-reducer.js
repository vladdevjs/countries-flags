import { combineReducers } from 'redux';
import { themeReducer } from './theme/theme-reducer';
import { countriesReducer } from './country/country-reducer';

export const rootReducer = combineReducers({ theme: themeReducer, countries: countriesReducer });
