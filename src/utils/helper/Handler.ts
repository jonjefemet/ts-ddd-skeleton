/**
 * La función `handlerPath` toma un parámetro de cadena `context` y devuelve una versión modificada de
 * `context` eliminando la ruta del directorio de trabajo actual y reemplazando las barras invertidas
 * con barras diagonales.
 * @param {string} context - El parámetro `context` es una cadena que representa el directorio de
 * trabajo actual.
 */
const handlerPath = ( context: string ) => `${context.split( process.cwd())[1].substring( 1 ).replace( /\\/g, "/" )}`;

export { handlerPath };
