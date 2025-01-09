import BooleanValue from "../constant/BooleanValue.enum";

/**
 * La función toma una cadena como entrada y devuelve un valor booleano, convirtiendo la cadena en
 * booleano si es posible.
 * @param {string} string - El parámetro "cadena" es un valor de cadena que desea convertir en un valor
 * booleano.
 * @returns un valor booleano.
 */
const castStringToBoolean = ( string: string ): boolean => {

  if ( string === BooleanValue.FALSE ) return false;

  return Boolean( string );
};

export { castStringToBoolean };
