import { NumberValueObject, NumberValueObjectUndefinedException } from "@shared/domain/valueObject/common/NumberValueObject";

class NumberTest extends NumberValueObject {}

// Creating a NumberValueObject with a valid number initializes correctly
it( "should initialize correctly when given a valid number", () => {
  const value = 42;
  const numberValueObject = new NumberTest( value );
  expect( numberValueObject.valueOf()).toBe( value );
});
// Throwing NumberValueObjectUndefinedException when initialized with null
it( "should throw NumberValueObjectUndefinedException when initialized with null", () => {
  expect(() => new NumberTest( null )).toThrow( NumberValueObjectUndefinedException );
});