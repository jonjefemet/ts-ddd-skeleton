import { IntegerMother } from "./IntegerMother";
export class Repeater {
  static random ( callable: CallableFunction, iterations: number ) {
    return Array( iterations || IntegerMother.random( 20 ))
      .fill({})
      .map(() => callable());
  }
}
