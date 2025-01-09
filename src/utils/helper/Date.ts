/**
 * La función "sliceDateToString" toma un objeto Fecha y devuelve una representación de cadena de la
 * fecha en el formato "AAAA-MM-DD".
 * @param {Date} date - El parámetro `fecha` es de tipo `Fecha` y representa la fecha que desea
 * convertir en una cadena.
 * @returns La función `sliceDateToString` devuelve una cadena que representa la parte de fecha del
 * parámetro de entrada `date`.
 */
const sliceDateToString = ( date: Date ): string => {
  const stringDate = date.toISOString();
  const dateSlice = stringDate.slice( 0, 10 );

  return dateSlice;
};

const convertMinutesToMilliseconds = ( minutes: number ): number => {
  return minutes * 60 * 1000;
};

export { sliceDateToString, convertMinutesToMilliseconds };