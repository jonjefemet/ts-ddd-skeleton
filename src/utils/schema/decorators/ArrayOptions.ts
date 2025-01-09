import Joi from "joi";
import { DefaultSchemaOptions, getDefaultSchemaOptions } from "./DefaultOptions";
import { ModifierProviders, SchemaClass, TypedPropertyDecorator } from "../types";
import { createPropertyDecorator, getJoischema } from "../core";

/**
 * Opciones para un esquema de array.
 *
 * Esta interfaz se utiliza para definir las opciones que se pueden utilizar para personalizar un esquema de array Joi.
 * Extiende la interfaz `DefaultSchemaOptions`, lo que significa que un `ArraySchemaOptions` tiene todas las opciones de un esquema Joi por defecto, además de las opciones específicas para un esquema de array.
 */
export interface ArraySchemaOptions extends DefaultSchemaOptions {
    /**
     * Establece el número máximo de elementos que puede tener el array.
     *
     * @param limit - El número máximo de elementos que puede tener el array.
     * @returns El mismo objeto de opciones de esquema de array, permitiendo el encadenamiento de más modificadores de esquema.
     */
    max( limit: number ): this;

    /**
     * Establece el número mínimo de elementos que puede tener el array.
     *
     * @param limit - El número mínimo de elementos que puede tener el array.
     * @returns El mismo objeto de opciones de esquema de array, permitiendo el encadenamiento de más modificadores de esquema.
     */
    min( limit: number ): this;
}

export function getArraySchemaOptions ( getJoi: () => typeof Joi ) {
  const result: ModifierProviders<Joi.ArraySchema, ArraySchemaOptions> = {
    ...getDefaultSchemaOptions( getJoi ),
    max: ( limit ) => ({ schema }) => schema.max( limit ),
    min: ( limit ) => ({ schema }) => schema.min( limit )

  };

  return result;
}

/**
 * Interfaz para un decorador de propiedades de array por defecto.
 *
 * Esta interfaz se utiliza para definir el tipo de un decorador de propiedades de array que se crea con la función `createArraySchemaDecorator`.
 * Extiende las interfaces `ArraySchemaOptions` y `TypedPropertyDecorator<unknown>`, lo que significa que un `DefaultArrayDecorator` puede ser utilizado como un decorador de propiedades y también tiene todas las opciones de un esquema de array Joi.
 */
export interface DefaultArrayDecorator extends ArraySchemaOptions, TypedPropertyDecorator<unknown> {}

/**
 * Opciones para un decorador de propiedades de array.
 *
 * Estas opciones se pueden utilizar para personalizar el comportamiento de un decorador de propiedades de array.
 */
export interface ArrayPropertyDecoratorOptions {
  /**
   * La clase del elemento del array.
   *
   * Si se proporciona, el decorador de propiedades de array utilizará esta clase para obtener un esquema Joi que se utilizará para validar los elementos del array.
   * Si no se proporciona, el decorador de propiedades de array creará un esquema de array que no tiene elementos permitidos.
   */
  elementClass?: SchemaClass;
}
/**
 * Crea un decorador de propiedades para un esquema de array Joi.
 *
 * @param options - Opciones para el decorador de propiedades del array.
 * @returns Un decorador de propiedades que puede ser utilizado para decorar las propiedades de una clase con un esquema de array Joi.
 */
export function createArraySchemaDecorator (
  options?: ArrayPropertyDecoratorOptions
): DefaultArrayDecorator {
  // La función `createPropertyDecorator` se llama con una función de fábrica de esquemas y una función de obtención de opciones.
  return createPropertyDecorator<unknown, ArraySchemaOptions>()(
    // La función de fábrica de esquemas recibe un objeto con una propiedad `joi` que es una referencia a la biblioteca Joi.
    ({
      joi
    }) => {
      // Crea un nuevo esquema de array Joi.
      const schema = joi.array();

      // Si se proporcionó una clase de elemento en las opciones, se obtiene el esquema Joi para esa clase.
      const elementClass = options?.elementClass;

      if ( elementClass ) {
        const elementShema = getJoischema( elementClass );

        // Si se pudo obtener un esquema para la clase de elemento, se añade al esquema de array como un elemento permitido.
        if ( elementClass ) {
          return schema.items( elementShema );
        }

      }

      // Si no se proporcionó una clase de elemento o no se pudo obtener un esquema para ella, se devuelve el esquema de array sin elementos permitidos.
      return schema;
    },
    // La función de obtención de opciones se utiliza para obtener las opciones para el esquema de array.
    getArraySchemaOptions
  );
}