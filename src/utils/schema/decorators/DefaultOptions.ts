import Joi from "joi";
import { ModifierProviders, TypedPropertyDecorator } from "../types";
import { createPropertyDecorator } from "../core";

/**
 * Opciones por defecto para un esquema.
 *
 * Esta interfaz se utiliza para definir las opciones que se pueden utilizar para personalizar un esquema Joi.
 * Proporciona métodos para hacer que un esquema sea requerido, opcional, nulo y para añadir una validación personalizada.
 */
export interface DefaultSchemaOptions {
    /**
     * Hace que el esquema sea requerido.
     *
     * @returns El mismo objeto de opciones de esquema, permitiendo el encadenamiento de más modificadores de esquema.
     */
    required(): this;

    /**
     * Permite que el valor del esquema sea nulo.
     *
     * @returns El mismo objeto de opciones de esquema, permitiendo el encadenamiento de más modificadores de esquema.
     */
    nullable(): this;

    /**
     * Hace que el esquema sea opcional.
     *
     * @returns El mismo objeto de opciones de esquema, permitiendo el encadenamiento de más modificadores de esquema.
     */
    optional(): this;

    /**
     * Añade una validación personalizada al esquema.
     *
     * @param schemaBuilder - Una función que recibe un objeto con el esquema actual y una referencia a la biblioteca Joi, y devuelve un esquema Joi modificado.
     * @returns El mismo objeto de opciones de esquema, permitiendo el encadenamiento de más modificadores de esquema.
     */
    custom: ( schemaBuilder: ( options: { schema: Joi.Schema; joi: typeof Joi }) => Joi.Schema ) => this;
}

export function getDefaultSchemaOptions<TSchema extends Joi.Schema> ( getJoi: () => typeof Joi ) {
  const result: ModifierProviders<TSchema, DefaultSchemaOptions> = {
    required: () => ({ schema }) => schema.required() as TSchema,
    optional: () => ({ schema }) => schema.optional() as TSchema,
    nullable: () => ({ schema }) => schema.allow( null ) as TSchema,
    custom: ( schemaBuilder ) => ({ schema }) => schemaBuilder({
      schema,
      joi: getJoi()
    }) as TSchema

  };

  return result;
}

export interface DefaultSchemaDecorator
extends DefaultSchemaOptions, TypedPropertyDecorator<unknown> {}

export function createDefaultSchemaDecorator (): DefaultSchemaDecorator {
  return createPropertyDecorator<unknown, DefaultSchemaOptions>()(
    ({ joi }) => joi.any(),
    getDefaultSchemaOptions
  );
}