import Joi from "joi";
import { DefaultSchemaOptions, getDefaultSchemaOptions } from "./DefaultOptions";
import { ModifierProviders, SchemaClass, TypedPropertyDecorator } from "../types";
import { createPropertyDecorator, getJoischema } from "../core";

/**
 * Opciones para un esquema de objeto Joi.
 *
 * Esta interfaz se utiliza para definir las opciones que se pueden utilizar para personalizar un esquema de objeto Joi.
 * Extiende la interfaz `DefaultSchemaOptions`, lo que significa que un `ObjectSchemaOptions` tiene todas las opciones de un esquema Joi por defecto, además de las opciones específicas para un esquema de objeto.
 */
export interface ObjectSchemaOptions extends DefaultSchemaOptions {
    /**
     * Define las claves y sus esquemas para el esquema de objeto.
     *
     * @param keySchemaMap - Un objeto que mapea las claves a sus esquemas, o una función que recibe una referencia a la biblioteca Joi y devuelve tal objeto.
     * @returns El mismo objeto de opciones de esquema de objeto, permitiendo el encadenamiento de más modificadores de esquema.
     */
    keys( keySchemaMap: Joi.SchemaMap | (( joi: typeof Joi ) => Joi.SchemaMap )): this;
}

export function getObjectSchemaOptions ( getJoi: () => typeof Joi ) {
  const result: ModifierProviders<Joi.ObjectSchema, ObjectSchemaOptions> = {
    ...getDefaultSchemaOptions( getJoi ),
    keys: ( keyShemaMap ) => ({ schema }) => schema.keys(
      ( typeof keyShemaMap === "function" ) ?
        keyShemaMap( getJoi()) :
        keyShemaMap
    )
  };

  return result;
}

export interface DefaultObjectDecorator
extends ObjectSchemaOptions, TypedPropertyDecorator<object> {}

export interface ObjectPropertyDecoratorOptions {
    objectClass?: SchemaClass;
}

/**
 * Crea un decorador de propiedades de objeto.
 *
 * @param options - Las opciones para el decorador de propiedades de objeto.
 * @returns Un decorador de propiedades de objeto.
 */
export function createObjectSchemaDecorator (
  options?: ObjectPropertyDecoratorOptions
): DefaultObjectDecorator {
  return createPropertyDecorator<object, ObjectSchemaOptions>()(
    ({
      joi, target, propertyKey
    }) => {
      // Obtiene el tipo de elemento de las opciones o de los metadatos de diseño.
      const elementType = ( options && options.objectClass ) ?
        options.objectClass :
        Reflect.getMetadata( "design:type", target, propertyKey );

      // Obtiene el esquema Joi para el tipo de elemento, o crea un esquema de objeto Joi por defecto si no hay un esquema para el tipo de elemento.
      const schema = (
        ( elementType && elementType !== Object ) && getJoischema( elementType )
      ) || joi.object();

      // Devuelve el esquema.
      return schema;
    },
    getObjectSchemaOptions
  );
}
