import { Collection } from "@shared/domain/valueObject/common/Collection";
import { Primitives } from "@utils/helper/Primitives";

// Collection can be instantiated with multiple items
it( "should instantiate with multiple items when provided", () => {
  class TestCollection extends Collection<number> {
    toPrimitive (): Primitives<number[]> {
      return this;
    }
  }
  const collection = new TestCollection( 1, 2, 3 );
  expect( collection.length ).toBe( 3 );
  expect( collection ).toEqual([
    1, 2, 3
  ]);
});
it( "should instantiate with no items when none are provided", () => {
  class TestCollection extends Collection<number> {
    toPrimitive (): Primitives<number[]> {
      return this;
    }
  }
  const collection = new TestCollection();
  expect( collection.length ).toBe( 0 );
  expect( collection ).toEqual([]);
});