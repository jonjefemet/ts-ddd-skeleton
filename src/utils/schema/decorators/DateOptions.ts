import Joi from "joi";
import { DefaultSchemaOptions, getDefaultSchemaOptions } from "./DefaultOptions";
import { ModifierProviders, TypedPropertyDecorator } from "../types";
import { createPropertyDecorator } from "../core";

/**
 * Opciones para un esquema de fecha Joi.
 *
 * Esta interfaz se utiliza para definir las opciones que se pueden utilizar para personalizar un esquema de fecha Joi.
 * Extiende la interfaz `DefaultSchemaOptions`, lo que significa que un `DateSchemaOptions` tiene todas las opciones de un esquema Joi por defecto, además de las opciones específicas para un esquema de fecha.
 */
export interface DateSchemaOptions extends DefaultSchemaOptions {
    /**
     * Establece la fecha máxima permitida.
     *
     * @param limit - La fecha máxima permitida. Puede ser un número (representando una marca de tiempo), "now" (representando la fecha y hora actuales), una cadena (que se parseará como una fecha) o un objeto Date.
     * @returns El mismo objeto de opciones de esquema de fecha, permitiendo el encadenamiento de más modificadores de esquema.
     */
    max( limit: number | "now" | string | Date ): this;

    /**
     * Establece la fecha mínima permitida.
     *
     * @param limit - La fecha mínima permitida. Puede ser un número (representando una marca de tiempo), "now" (representando la fecha y hora actuales), una cadena (que se parseará como una fecha) o un objeto Date.
     * @returns El mismo objeto de opciones de esquema de fecha, permitiendo el encadenamiento de más modificadores de esquema.
     */
    min( limit: number | "now" | string | Date ): this;
}

export function getDateSchemaOptions ( getJoi: () => typeof Joi ) {
  const result: ModifierProviders<Joi.DateSchema, DateSchemaOptions> = {
    ...getDefaultSchemaOptions( getJoi ),
    max: ( limit: number | "now" | string | Date ) => ({ schema }) => schema.max( limit ),
    min: ( limit: number | "now" | string | Date ) => ({ schema }) => schema.min( limit )

  };

  return result;
}

export interface DefaultDateDecorator
extends DateSchemaOptions, TypedPropertyDecorator<Date> {}

export function createDateSchemaDecorator (): DefaultDateDecorator {
  return createPropertyDecorator<Date, DateSchemaOptions>()(
    ({ joi }) => joi.date(),
    getDateSchemaOptions
  );
}
