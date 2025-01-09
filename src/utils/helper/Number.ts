/**
 * La función `formatDecimal` toma un número como entrada y devuelve un número decimal formateado con
 * dos decimales.
 * @param {number} number - El parámetro "número" es el número decimal al que desea formatear.
 * @returns La función `formatDecimal` devuelve un número decimal formateado con un mínimo de 2
 * decimales.
 */
const formatDecimal = ( number: number ) => {
  const result = Intl.NumberFormat( "de-DE", { minimumFractionDigits: 2 }).formatToParts( number );

  const fraction = result.find( x => x.type == "fraction" );

  return +( Math.floor( number ) + "." + fraction.value.substring( 0, 2 ));

};

/**
 * La función calcula el porcentaje de un valor determinado.
 * @param {number} value - El valor es el número del que desea calcular el porcentaje.
 * @param {number} percentage - El parámetro "porcentaje" representa el valor porcentual que desea
 * calcular. Debe ser un número entre 0 y 100.
 * @returns el importe porcentual calculado, que es un número.
 */
const calculatePercentageAmount = ( value: number, percentage: number ): number => {
  return value * ( percentage / 100 );
};

const isPositiveNumber = ( value: number ): boolean => value > 0;

export { formatDecimal,
  calculatePercentageAmount,
  isPositiveNumber };