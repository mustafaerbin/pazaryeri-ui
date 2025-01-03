export class SearchBoxDto {
  id: string;
  searchOption: string;
  spanClass: string;
  searchLabel: string;
}

export class SearchSuggestion {
  id?: string;
  text?: string;
  type?: SearchTypes;
  hint?: string;
  routerLink?: string;
  historic?: boolean;
}

export enum SearchTypes {
  NONE,
  DOSYA,
  DAVA,
  ICRA,
  MERCI,
  TCKN,
  VKN,
  BORCLU,
}
