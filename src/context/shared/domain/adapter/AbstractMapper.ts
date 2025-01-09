import Mapper from "./Mapper";

export default abstract class AbstractMapper<S, T> implements Mapper<S, T> {

  protected abstract map( entity: S ): T;

  transform( entity: S ): T;
  transform( array: S[]): T[];
  /**
   * La función toma una entidad o una matriz de entidades y las transforma en un tipo diferente usando
   * una función de mapeo.
   * @param {S | S[]} entityOrArray - El parámetro `entityOrArray` puede ser una sola entidad de tipo
   * `S` o una matriz de entidades de tipo `S`.
   * @returns ya sea un valor único de tipo T o una matriz de tipo T, según el tipo de parámetro de
   * entrada. Si el parámetro de entrada es una matriz, la función asignará cada elemento de la matriz
   * y le aplicará la función "mapa", devolviendo una matriz de tipo T. Si el parámetro de entrada no
   * es una matriz, la función simplemente aplicará el "mapa"
   */
  transform ( entityOrArray: S | S[]): T | T[] {
    return Array.isArray( entityOrArray )
      ? entityOrArray.map(( item: S ) => this.map( item ))
      : this.map( entityOrArray );
  }

}
