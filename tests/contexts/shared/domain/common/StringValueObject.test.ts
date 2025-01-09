import { StringValueObject, StringValueObjectUndefinedException } from "@shared/domain/valueObject/common/StringValueObject";

class StringTest extends StringValueObject {}

// Creating a StringValueObject with a valid string initializes correctly
it( "should initialize correctly when given a valid string", () => {
  const value = "hola";
  const stringValueObject = new StringTest( value );
  expect( stringValueObject.valueOf()).toBe( value );
});
// Throwing StringValueObjectUndefinedException when initialized with null
it( "should throw StringValueObjectUndefinedException when initialized with null", () => {
  expect(() => new StringTest( null )).toThrow( StringValueObjectUndefinedException );
});