type DefaultOptions = {
    required?: boolean;
    nullable?: boolean;
    optional?: boolean;
};

declare type StringOptions = {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
} & DefaultOptions;

declare type NumberOptions = {
  min?: number;
  max?: number;
} & DefaultOptions;

declare type BoolOptions = DefaultOptions;

declare type DateOptions = DefaultOptions;

declare type ObjectOptions = {
    properties: SchemaDefinition;
} & DefaultOptions;

declare type ArrayOptions = {
    item: SchemaDefinition | StringOptions | NumberOptions | BoolOptions | DateOptions;
    minItems?: number;
    maxItems?: number;
} & DefaultOptions;

declare type SchemaField =
  | { type: "string"; options: StringOptions }
  | { type: "number"; options: NumberOptions }
  | { type: "boolean"; options: BoolOptions }
  | { type: "date"; options: DateOptions }
  | { type: "object"; options: ObjectOptions }
  | { type: "array"; options: ArrayOptions }
  | { type: "uuid"; options?: StringOptions };

declare type SchemaTypes = StringOptions | NumberOptions | BoolOptions | DateOptions | ObjectOptions | ArrayOptions;

declare type SchemaDefinition = {
  [key: string]: SchemaField;
};

export { SchemaDefinition, StringOptions, NumberOptions, BoolOptions, DateOptions, ObjectOptions, ArrayOptions, SchemaTypes, DefaultOptions };
