import Joi from "joi";
import { DefaultSchemaOptions, getDefaultSchemaOptions } from "./DefaultOptions";
import { ModifierProviders, TypedPropertyDecorator } from "../types";
import { createPropertyDecorator } from "../core";

/**
 * Opciones para un esquema booleano.
 *
 * Esta interfaz se utiliza para definir las opciones que se pueden utilizar para personalizar un esquema booleano Joi.
 * Extiende la interfaz `DefaultSchemaOptions`, lo que significa que un `BooleanSchemaOptions` tiene todas las opciones de un esquema Joi por defecto, además de las opciones específicas para un esquema booleano.
 */
export interface BooleanSchemaOptions extends DefaultSchemaOptions {
    /**
     * Añade valores que se considerarán `false`.
     *
     * @param value - Un valor que se considerará `false`.
     * @param values - Otros valores que se considerarán `false`.
     * @returns El mismo objeto de opciones de esquema booleano, permitiendo el encadenamiento de más modificadores de esquema.
     */
    falsy( value: string | number, ...values: Array<string | number> ): this;

    /**
     * Añade valores que se considerarán `true`.
     *
     * @param value - Un valor que se considerará `true`.
     * @param values - Otros valores que se considerarán `true`.
     * @returns El mismo objeto de opciones de esquema booleano, permitiendo el encadenamiento de más modificadores de esquema.
     */
    truthy( value: string | number, ...values: Array<string | number> ): this;
}

export function getBooleanSchemaOptions ( getJoi: () => typeof Joi ) {
  const result: ModifierProviders<Joi.BooleanSchema, BooleanSchemaOptions> = {
    ...getDefaultSchemaOptions( getJoi ),
    falsy: ( value: string | number, ...values: Array<string | number> ) =>
      ({ schema }) => schema.falsy( value, ...values ),
    truthy: ( value: string | number, ...values: Array<string | number> ) =>
      ({ schema }) => schema.truthy( value, ...values )
  };

  return result;
}

export interface DefaultBooleanDecorator
extends BooleanSchemaOptions, TypedPropertyDecorator<boolean> {}

export function createBooleanSchemaDecorator (): DefaultBooleanDecorator {
  return createPropertyDecorator<boolean, BooleanSchemaOptions>()(
    ({ joi }) => joi.boolean(),
    getBooleanSchemaOptions
  );
}
