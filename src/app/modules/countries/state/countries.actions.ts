export class GetAllCountries {
  static readonly type = '[Countries] get all countries';
}
export class GetAllCountriesStart {
  static readonly type = '[Countries] get all countries start';
}

export class GetCountriesByRegion {
  static readonly type = '[Countries] get countries by region';
  constructor(public region: string) {}
}
export class GetCountriesByRegionStart {
  static readonly type = '[Countries] get countries by region start';
}

export class GetCountryByName {
  static readonly type = '[Countries] get country by name';
  constructor(public country: string) {}
}
