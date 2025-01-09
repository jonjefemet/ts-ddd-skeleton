import { Uuid, UuidInvalidException } from "@shared/domain/valueObject/common/Uuid";

// Creating a Uuid with a valid UUID string should succeed
it( "should create a Uuid instance when given a valid UUID string", () => {
  const validUuid = Uuid.random().toString();
  const uuidInstance = new Uuid( validUuid );
  expect( uuidInstance ).toBeInstanceOf( Uuid );
  expect( uuidInstance.toString()).toBe( validUuid );
});
// Creating a Uuid with an empty string should throw UuidInvalidException
it( "should throw UuidInvalidException when given an empty string", () => {
  expect(() => new Uuid( "" )).toThrow( UuidInvalidException );
});