import { SortStrategy, SortType } from "./SortingStrategy";

interface MultiSortingStrategy<T> {
  setStrategies( strategies: Array<SortStrategy<T>> ): void;
  sort( array: T[], sortType?: SortType ): T[];
}

export default class MultiSortStrategy<T> implements MultiSortingStrategy<T> {
  private strategies: Array<SortStrategy<T>>;

  setStrategies ( strategies: Array<SortStrategy<T>> ): void {
    this.strategies = strategies;
  }

  sort ( array: T[], sortType: SortType = SortType.ASC ): T[] {
    return this.strategies.reduce(( acc, strategy ) => strategy.sort( acc, sortType ), array );
  }
}
