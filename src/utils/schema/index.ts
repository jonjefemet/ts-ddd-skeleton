import { SchemaDefinition } from "./SchemaDefinition";

const schemaDefinition = new SchemaDefinition();

const {
  string, number, date, boolean, object, array, getSchema
} = schemaDefinition;

export { string, number, date, boolean, object, array, getSchema };