import qs from "qs";
import url from "url";

/**
 * La función "transformToFormData" toma datos de tipo desconocido y los devuelve como una cadena
 * codificada en URL.
 * @param {unknown} data - El parámetro "datos" es de tipo "desconocido", lo que significa que puede
 * ser cualquier tipo de datos.
 * @returns una representación de cadena de los datos de la carga útil.
 */
const transformToFormData = ( data: unknown ) => {
  const payload = qs.stringify( data );

  return payload.toString();
};

/**
 * La función `transformToQueryString` toma un objeto de pares clave-valor y devuelve una
 * representación de cadena del objeto en formato de cadena de consulta.
 * @param data - El parámetro `datos` es un objeto de tipo `Registro<cadena, cadena>`. Representa pares
 * clave-valor donde tanto las claves como los valores son de tipo cadena.
 * @returns La función `transformToQueryString` devuelve una representación de cadena del objeto de
 * datos dado en formato de cadena de consulta.
 */
const transformToQueryString = ( data: Record<string, string> ) => {
  return new url.URLSearchParams( data ).toString();
};

/**
 * La función devuelve la configuración del encabezado para enviar datos del formulario en un formato
 * específico.
 * @returns Se devuelve un objeto con la propiedad "Tipo de contenido" establecida en
 * "application/x-www-form-urlencoded".
 */
const getHeaderToFormData = () => {
  return { "Content-Type": "application/x-www-form-urlencoded" };
};

/**
 * La función `getHeaderToBearerToken` toma un token como entrada y devuelve un objeto con un
 * encabezado de Autorización que contiene el token como token de portador.
 * @param {string} token - El parámetro `token` es una cadena que representa un token de autenticación.
 * @returns Un objeto con una sola propiedad "Autorización" cuyo valor es una cadena que concatena la
 * palabra "Portador" con el valor del parámetro "token".
 */
const getHeaderToBearerToken = ( token: string ) => {
  return { Authorization: `Bearer ${token}` };
};

/**
 * La función `getEncoding` devuelve un objeto con un par clave-valor para el encabezado "aceptar
 * codificación".
 * @returns Un objeto con una única propiedad "aceptar-codificación" y su valor es "*".
 */
const getEncoding = () => {
  return { "accept-encoding": "*" };
};

export { transformToFormData,
  transformToQueryString,
  getHeaderToFormData,
  getHeaderToBearerToken,
  getEncoding };
