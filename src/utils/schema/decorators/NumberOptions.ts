import Joi from "joi";
import { DefaultSchemaOptions, getDefaultSchemaOptions } from "./DefaultOptions";
import { ModifierProviders, TypedPropertyDecorator } from "../types";
import { createPropertyDecorator } from "../core";

/**
 * Opciones para un esquema de número Joi.
 *
 * Esta interfaz se utiliza para definir las opciones que se pueden utilizar para personalizar un esquema de número Joi.
 * Extiende la interfaz `DefaultSchemaOptions`, lo que significa que un `NumberSchemaOptions` tiene todas las opciones de un esquema Joi por defecto, además de las opciones específicas para un esquema de número.
 */
export interface NumberSchemaOptions extends DefaultSchemaOptions {
    /**
     * Establece el número mínimo permitido.
     *
     * @param limit - El número mínimo permitido.
     * @returns El mismo objeto de opciones de esquema de número, permitiendo el encadenamiento de más modificadores de esquema.
     */
    min( limit: number ): this;

    /**
     * Establece el número máximo permitido.
     *
     * @param limit - El número máximo permitido.
     * @returns El mismo objeto de opciones de esquema de número, permitiendo el encadenamiento de más modificadores de esquema.
     */
    max( limit: number ): this;

    /**
     * Requiere que el número sea positivo.
     *
     * @returns El mismo objeto de opciones de esquema de número, permitiendo el encadenamiento de más modificadores de esquema.
     */
    positive(): this;
}
export function getNumberSchemaOptions ( getJoi: () => typeof Joi ) {
  const result: ModifierProviders<Joi.NumberSchema, NumberSchemaOptions> = {
    ...getDefaultSchemaOptions( getJoi ),
    min: ( limit ) => ({ schema }) => schema.min( limit ),
    max: ( limit ) => ({ schema }) => schema.max( limit ),
    positive: () => ({ schema }) => schema.positive()
  };

  return result;
}

export interface DefaultNumberDecorator
extends NumberSchemaOptions, TypedPropertyDecorator<number> {}

export function createNumberSchemaDecorator (): DefaultNumberDecorator {
  return createPropertyDecorator<number, NumberSchemaOptions>()(
    ({ joi }) => joi.number(),
    getNumberSchemaOptions
  );
}
