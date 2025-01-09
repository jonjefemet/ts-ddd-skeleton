/**
 * La función `copyObject` crea una copia profunda de un objeto convirtiéndolo en una cadena JSON y
 * luego analizándolo nuevamente en un nuevo objeto.
 * @param obj - El parámetro `obj` es el objeto del que desea hacer una copia.
 * @returns La función `copyObject` devuelve una copia profunda del objeto de entrada `obj`.
 */
const copyObject = ( obj: unknown ) => {
  return JSON.parse( JSON.stringify( obj ));
};

export { copyObject };