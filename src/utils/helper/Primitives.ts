import { NumberValueObject } from "@shared/domain/valueObject/common/NumberValueObject";
import { StringValueObject } from "@shared/domain/valueObject/common/StringValueObject";
import { BooleanValueObject } from "@shared/domain/valueObject/common/BooleanValueObject";
import { DateValueObject } from "@shared/domain/valueObject/common/DateValueObject";

type Methods<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type MethodsAndProperties<T> = { [key in keyof T]: T[key] };

type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

type PrimitiveTypes = string | number | boolean | Date | undefined | null;

type ValueObjectValue<T> = T extends PrimitiveTypes
  ? ( T extends DateValueObject ? Date : T )
  : T extends StringValueObject
  ? string
  : T extends NumberValueObject
  ? number
  : T extends BooleanValueObject
  ? boolean
  : T extends DateValueObject
  ? Date
  : T extends { value: infer U }
  ? U
  : T extends Array<{ value: infer U }>
  ? U[]
  : T extends Array<infer U>
  ? Array<ValueObjectValue<U>>
  : T extends { [K in keyof Properties<T>]: unknown }
  ? { [K in keyof Properties<T>]: ValueObjectValue<Properties<T>[K]> }
  : T extends unknown
  ? T
  : never;

export type Primitives<T> = {
  [key in keyof Properties<T>]: ValueObjectValue<T[key]>;
};
