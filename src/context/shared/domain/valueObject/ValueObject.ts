export type Primitives = string | string | number | boolean | boolean | Date;

export default interface ValueObject<T extends Primitives> {
  readonly value: T;
  toString(): string;
}