import Joi from "joi";
import { getJoischema } from "./core";
import { SchemaClass } from "./types";
import { createStringSchemaDecorator } from "./decorators/StringOptions";
import { createNumberSchemaDecorator } from "./decorators/NumberOptions";
import { createDateSchemaDecorator } from "./decorators/DateOptions";
import { createBooleanSchemaDecorator } from "./decorators/BooleanOptions";
import { ArrayPropertyDecoratorOptions, createArraySchemaDecorator } from "./decorators/ArrayOptions";
import { ObjectPropertyDecoratorOptions, createObjectSchemaDecorator } from "./decorators/ObjectOptions";

export class SchemaDefinition {

  string = () => createStringSchemaDecorator();

  number = () => createNumberSchemaDecorator();

  date = () => createDateSchemaDecorator();

  boolean = () => createBooleanSchemaDecorator();

  object = ( options?: ObjectPropertyDecoratorOptions ) => createObjectSchemaDecorator( options );

  array = ( options?: ArrayPropertyDecoratorOptions ) => createArraySchemaDecorator( options );

  getSchema = ( schema: SchemaClass ): Joi.ObjectSchema | undefined => {
    return getJoischema( schema );
  };

}