export class GetAllCountries {
  static readonly type = '[Countries] get all countries';
}
export class FetchCountriesStart {
  static readonly type = '[Countries] fetch  countries start';
}

export class GetCountriesByRegion {
  static readonly type = '[Countries] get countries by region';
  constructor(public region: string) {}
}


export class GetCountryByName {
  static readonly type = '[Countries] get country by name';
  constructor(public country: string) {}
}
