import Joi from "joi";
import { SchemaDefinition, StringOptions, SchemaTypes, NumberOptions, BoolOptions, DefaultOptions, DateOptions, ObjectOptions, ArrayOptions } from "./Schema";

const newTypeDefinitions: Record<string, ( schemaTypes: SchemaTypes ) => Joi.Schema > = {
  string: ( schemaTypes ) => convertStringOptions( schemaTypes ),
  number: ( schemaTypes ) => convertNumberOptions( schemaTypes ),
  boolean: ( schemaTypes ) => convertBoolOptions( schemaTypes ),
  date: ( schemaTypes ) => convertDateOptions( schemaTypes ),
  object: ( schemaTypes ) => convertObjectOptions( schemaTypes as ObjectOptions ),
  array: ( schemaTypes ) => convertArrayOptions( schemaTypes as ArrayOptions )
};

function convertToJoiSchema ( schema: SchemaDefinition ): Joi.ObjectSchema {

  const joiSchema = Object.entries( schema ).reduce(( acc, [
    key,
    element
  ]) => {
    const { type } = element;
    const typeDefinition = newTypeDefinitions[type];

    if ( typeDefinition ) {
      acc[key] = typeDefinition( element.options );
    }

    return acc;
  }, {});

  return Joi.object( joiSchema );
}

function defaultOptions <T extends Joi.Schema> ( options: DefaultOptions, schema: T ): T {

  if ( options.required ) {
    schema.required();
  }

  if ( options.nullable ) {
    schema.allow( null );
  }

  if ( options.optional ) {
    schema.optional();
  }

  return schema;
}

function convertStringOptions ( options: StringOptions ): Joi.StringSchema {
  const joiSchema = Joi.string();

  if ( options.minLength ) {
    joiSchema.min( options.minLength );
  }

  if ( options.maxLength ) {
    joiSchema.max( options.maxLength );
  }

  if ( options.pattern ) {
    joiSchema.pattern( new RegExp( options.pattern ));
  }

  if ( options.required ) {
    joiSchema.required();
  }

  return defaultOptions( options, joiSchema );
}

function convertNumberOptions ( options: NumberOptions ): Joi.NumberSchema {
  const joiSchema = Joi.number();

  if ( options.min ) {
    joiSchema.min( options.min );
  }

  if ( options.max ) {
    joiSchema.max( options.max );
  }

  return defaultOptions( options, joiSchema );
}

function convertBoolOptions ( options: BoolOptions ): Joi.BooleanSchema {
  const joiSchema = Joi.boolean();

  return defaultOptions( options, joiSchema );
}

function convertDateOptions ( options: DateOptions ): Joi.DateSchema {
  const joiSchema = Joi.date();

  return defaultOptions( options, joiSchema );
}

function convertObjectOptions ( options: ObjectOptions ): Joi.ObjectSchema {
  const joiSchema = Joi.object();

  if ( options.properties ) {
    joiSchema.append( convertToJoiSchema( options.properties ));
  }

  return defaultOptions( options, joiSchema );
}

function isOptionsType ( item: object ): item is StringOptions | NumberOptions | BoolOptions | DateOptions {
  return "minLength" in item || "min" in item || "enum" in item || "format" in item;
}

function convertArrayOptions ( options: ArrayOptions ): Joi.ArraySchema {

  let joiSchema: Joi.ArraySchema<unknown[]>;

  if ( isOptionsType( options.item )) {
    joiSchema = Joi.array().items( convertToJoiSchema( options.item as SchemaDefinition ));
  } else {

    joiSchema = Joi.array().items( Joi.string()); // Reemplaza Joi.string() con la conversión adecuada
  }

  return defaultOptions( options, joiSchema );

}

export { convertToJoiSchema };