import { Primitives } from "@utils/helper/Primitives";

export abstract class Collection<T> extends Array<T> {

  constructor ( ...items: T[]) {
    super( ...items );
  }

  abstract toPrimitive(): Primitives<T[]>;
}