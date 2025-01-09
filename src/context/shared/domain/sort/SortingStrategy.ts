export enum SortType {
  ASC,
  DESC
}

export interface SortStrategy<T> {
  sort( data: T[], sortType?: SortType ): T[];
}
