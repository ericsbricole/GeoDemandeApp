import { Currency } from "./search/Currency";
import { Translations } from "./Translations";
import { RegionalBloc } from "./RegionalBloc";
import { Language } from "./Language";

export class Country {
    name: string;
    topLevelDomain: string;
    alpha2Code: string;
    alpha3Code: string;
    callingCode: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area: number;
    gini: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    currencies: Currency[];
    languages: Language[];
    translations: Translations;
    flag: string;
    regionalBlocs: RegionalBloc[];
    cioc: string;

    constructor(obj?: any) {
      Object.assign(this, obj);
    }
  }
  