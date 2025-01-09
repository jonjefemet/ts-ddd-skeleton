import { EnumValueObject } from "@shared/domain/valueObject/common/EnumValueObject";
import { StringValueObjectUndefinedException } from "@shared/domain/valueObject/common/StringValueObject";

class TestEnumValueObject extends EnumValueObject<string> {
  protected throwErrorForInvalidValue (): void {
    throw new Error( "Invalid value" );
  }
}

// Valid value is accepted and stored correctly
it( "should store the value when a valid value is provided", () => {

  const validValues = [
    "VALUE1", "VALUE2"
  ];
  const value = "VALUE1";
  const enumValueObject = new TestEnumValueObject( value, validValues );

  expect( enumValueObject.toString()).toBe( value );
});
// Null or undefined value throws StringValueObjectUndefinedException
it( "should throw StringValueObjectUndefinedException when value is null or undefined", () => {

  const validValues = [
    "VALUE1", "VALUE2"
  ];

  expect(() => new TestEnumValueObject( null, validValues )).toThrow( StringValueObjectUndefinedException );
  expect(() => new TestEnumValueObject( undefined, validValues )).toThrow( StringValueObjectUndefinedException );
});
it( "should return true for a single valid value", () => {
  const validValue = "valid";

  const enumValueObject = new TestEnumValueObject( validValue, [
    "valid"
  ]);

  const result = enumValueObject.contains( validValue );

  expect( result ).toBe( true );
});
it( "should return true for an array containing valid values", () => {
  const validValues = [
    "valid1", "valid2"
  ];
  const enumValueObject = new TestEnumValueObject( "valid1", validValues );

  const result = enumValueObject.contains( validValues );

  expect( result ).toBe( true );
});
it( "should call throwErrorForInvalidValue when value is not in validValues", () => {
  const validValues = [
    "A", "B", "C"
  ];

  expect(() => new TestEnumValueObject( "D", validValues )).toThrow( Error );
});