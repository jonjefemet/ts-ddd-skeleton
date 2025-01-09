import Joi from "joi";
import { DefaultSchemaOptions, getDefaultSchemaOptions } from "./DefaultOptions";
import { ModifierProviders, TypedPropertyDecorator } from "../types";
import { createPropertyDecorator } from "../core";

type GuidVersions = "uuidv1" | "uuidv2" | "uuidv3" | "uuidv4" | "uuidv5" | "uuidv6" | "uuidv7" | "uuidv8";

/**
 * Opciones para un esquema de cadena Joi.
 *
 * Esta interfaz se utiliza para definir las opciones que se pueden utilizar para personalizar un esquema de cadena Joi.
 * Extiende la interfaz `DefaultSchemaOptions`, lo que significa que un `StringSchemaOptions` tiene todas las opciones de un esquema Joi por defecto, además de las opciones específicas para un esquema de cadena.
 */
export interface StringSchemaOptions extends DefaultSchemaOptions {
    /**
     * Requiere que la cadena sea un correo electrónico válido.
     *
     * @returns El mismo objeto de opciones de esquema de cadena, permitiendo el encadenamiento de más modificadores de esquema.
     */
    email(): this;

    /**
     * Requiere que la cadena sea un GUID válido.
     *
     * @param options - Las versiones de GUID que se considerarán válidas.
     * @returns El mismo objeto de opciones de esquema de cadena, permitiendo el encadenamiento de más modificadores de esquema.
     */
    guid( options: GuidVersions ): this;

    allow( ...values: string[]): this;
}

export function getStringSchemaOptions ( getJoi: () => typeof Joi ) {
  const result: ModifierProviders<Joi.StringSchema, StringSchemaOptions> = {
    ...getDefaultSchemaOptions( getJoi ),
    email: () => ({ schema }) => schema.email(),
    guid: ( options: GuidVersions ) => ({ schema }) => schema.guid({ version: options }),
    allow: ( ...values ) => ({ schema }) => schema.allow( ...values )
  };

  return result;
}

export interface DefaultStringDecorator
extends StringSchemaOptions, TypedPropertyDecorator<string> {}

export function createStringSchemaDecorator (): DefaultStringDecorator {
  return createPropertyDecorator<string, StringSchemaOptions>()(
    ({ joi }) => joi.string(),
    getStringSchemaOptions
  );
}
