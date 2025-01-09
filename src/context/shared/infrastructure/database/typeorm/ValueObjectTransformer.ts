import ValueObject, { Primitives } from "@shared/domain/valueObject/ValueObject-old";
import { NewableClass } from "../../../domain/NewableClass";

export const ValueObjectTransformer = <T extends Primitives>( ValueObject: NewableClass<ValueObject<T>> ) => {
  return {
    to: ( value: ValueObject<T> ): T => value.value,
    from: ( value: T ): ValueObject<T> => new ValueObject( value )
  };
};
