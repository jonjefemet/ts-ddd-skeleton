import Joi from "joi";

/**
 * El tipo WorkingSchema es un objeto con claves de cadena y valores que son tipos Joi.Schema.
 * @property [index: undefined] - El [índice: cadena] es una declaración de tipo para las claves del
 * objeto WorkingSchema. Significa que las claves pueden ser cualquier valor de cadena.
 */
export type WorkingSchema = { [index: string]: Joi.Schema };

export type StringOrSymbolKey<T> = Extract<keyof T, string | symbol>;

/* El `constructor de interfaz de exportación<T>` define una interfaz genérica en TypeScript.
Representa una función constructora que puede crear objetos de tipo "T". La `T` es un parámetro de
tipo que se puede reemplazar con cualquier tipo específico cuando se usa la interfaz `Constructor`. */
export interface Constructor<T> {
    new ( ...args: unknown[]): T;
}

export type SchemaClass = Constructor<unknown>;

/**
 * El tipo `MethodNames<T>` asigna cada propiedad de `T` a su nombre de método correspondiente si la
 * propiedad es una función; de lo contrario, la asigna a `never`.
 * @property [: undefined] - El código anterior define un tipo `MethodNames<T>` que toma un tipo
 * genérico `T`. Utiliza un tipo mapeado para iterar sobre las claves "K" de "T". Para cada clave,
 * verifica si el valor correspondiente en `T` es un tipo de función `(...args: desconocido[])
 */
type MethodNames<T> = {
    [K in keyof T]: T extends ( ...args: unknown[]) => unknown ? K : never;
};

/* La interfaz `DecoratorContext<TSchema extends Joi.Schema>` define una interfaz genérica en
TypeScript. Representa el objeto de contexto que se pasa a una función decoradora. El parámetro de
tipo `TSchema` representa el tipo de esquema que se está decorando, que está restringido a ser un
subtipo de `Joi.Schema`. La propiedad `schema` de la interfaz es de tipo `TSchema` y representa el
objeto de esquema real que se está decorando. */
export interface DecoratorContext<TSchema extends Joi.Schema> {
    schema: TSchema;
}

/**
 * El tipo `ModifierProviders` en TypeScript representa una asignación de nombres de métodos
 * modificadores a funciones que toman argumentos y devuelven una función que modifica un objeto
 * `TSchema` determinado.
 * @property [: undefined] - Las propiedades del tipo `ModifierProviders` se definen de la siguiente
 * manera:
 */
export type ModifierProviders<
    TSchema extends Joi.Schema,
    TModifiers,
    > = {
        [K in keyof MethodNames<TModifiers>]: TModifiers[K] extends ( ...args: unknown[]) => unknown ?
        ( ...args: Parameters<TModifiers[K]> ) => ( context: DecoratorContext<TSchema> ) => TSchema :
        never;
    };

export type AllowUnions<TType, TDesired, TOriginal> = TType extends TDesired ? TOriginal : TDesired;

export type MapAllowUnions<TObject, TKey extends keyof TObject, TDesired> = {
    [K in TKey]: AllowUnions<TObject[K], TDesired, TObject[K]>;
};

export type TypedPropertyDecorator<TPropertyType> = (
    <TClass extends MapAllowUnions<TClass, TKey, TPropertyType>, TKey extends StringOrSymbolKey<TClass>>(
        target: TClass,
        propertyKey: TKey,
    ) => void
);

/* La interfaz `GetBaseSchemaFunction` define una firma de función que devuelve un objeto `TSchema`.
Toma un objeto de opciones con las propiedades `joi`, `target` y `propertyKey`. La propiedad `joi`
es de tipo `typeof Joi`, que representa la biblioteca Joi. La propiedad `target` representa la clase
de destino y la propiedad `propertyKey` representa la clave de la propiedad que se está decorando. */
export interface GetBaseSchemaFunction<TSchema, TAllowedTypes> {
    <TClass extends MapAllowUnions<TClass, TKey, TAllowedTypes>, TKey extends StringOrSymbolKey<TClass>>( options: {
        joi: typeof Joi;
        target: TClass;
        propertyKey: TKey;
    }): TSchema;
}

export type PropertyDecorator<TAllowedTypes, TSchemaModifiers> = (
    TypedPropertyDecorator<TAllowedTypes> &
    TSchemaModifiers
);
