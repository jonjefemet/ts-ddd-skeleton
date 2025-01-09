import Joi from "joi";
import "reflect-metadata";
import { GetBaseSchemaFunction, ModifierProviders, SchemaClass, TypedPropertyDecorator, WorkingSchema, DecoratorContext, PropertyDecorator, StringOrSymbolKey } from "./types";

/* La línea `const WORKING_SCHEMA_KEY = "tsdv:working-schema";` declara una variable constante llamada
`WORKING_SCHEMA_KEY` y le asigna el valor `"tsdv:working-schema"`. Esta constante se utiliza como
clave para almacenar y recuperar metadatos relacionados con el esquema de trabajo en el código. */
export const WORKING_SCHEMA_KEY = "tsdv:working-schema";
/* La línea `const SCHEMA_KEY = "tsdv:schema";` declara una variable constante llamada `SCHEMA_KEY` y
le asigna el valor `"tsdv:schema"`. Esta constante se utiliza como clave para almacenar y recuperar
metadatos relacionados con el esquema en el código. */
export const SCHEMA_KEY = "tsdv:schema";

/**
 * La función devuelve un Joi.ObjectSchema o indefinido según el SchemaClass proporcionado.
 * @param {SchemaClass} Class - El parámetro `Class` es la clase de esquema para la que desea generar
 * un esquema Joi.
 */
export function getJoischema ( Class: SchemaClass ): Joi.ObjectSchema | undefined {
  const isSchemaDefined = Reflect.hasOwnMetadata( SCHEMA_KEY, Class.prototype );

  if ( isSchemaDefined ) {
    return Reflect.getOwnMetadata( SCHEMA_KEY, Class.prototype );
  }

  const workingSchema = getMergedWorkingSchemas( Class.prototype );

  const joiSchema: Joi.ObjectSchema | undefined = (
    workingSchema
      ? Joi.object().keys( workingSchema )
      : undefined
  );
  Reflect.defineMetadata( SCHEMA_KEY, joiSchema, Class.prototype );

  return joiSchema;

}

/**
 * La función `getWorkingSchema` recupera los metadatos del esquema de trabajo para una clase de
 * destino determinada.
 * @param {TClass} target - El parámetro `target` es la clase o función constructora para la que desea
 * recuperar el esquema de trabajo.
 * @returns un valor de tipo `WorkingSchema` o `indefinido`.
 */
export function getWorkingSchema<TClass> ( target: TClass ): WorkingSchema | undefined {
  const workingSchema: WorkingSchema = Reflect.getOwnMetadata( WORKING_SCHEMA_KEY, target );

  return workingSchema;
}

/**
 * La función fusiona de forma recursiva los esquemas de trabajo de un objeto y sus prototipos
 * principales.
 * @param {object} target - El parámetro `target` es un objeto para el cual queremos recuperar los
 * esquemas de trabajo fusionados.
 * @returns un objeto de esquema fusionado, que es una combinación del esquema principal y el esquema
 * de trabajo. Si no existe ni el esquema principal ni el esquema de trabajo, la función devuelve
 * indefinido.
 */
export function getMergedWorkingSchemas ( target: object ): WorkingSchema | undefined {

  const parentPrototype = Object.getPrototypeOf( target );

  const parentSchema = (
    parentPrototype &&
        ( parentPrototype.constructor !== Object ) &&
        getMergedWorkingSchemas( parentPrototype )
  );

  const workingSchema = getWorkingSchema( target );

  if ( workingSchema || parentSchema ) {
    return {
      ...parentSchema,
      ...workingSchema
    };
  }

  return undefined;
}
export const getJoi = ( options: { joi?: typeof Joi } | undefined = {}) => options.joi || Joi;

/**
 * Crea un decorador de propiedades.
 *
 * @returns Una función que acepta una función de obtención de esquema base y una función de obtención de proveedores de modificadores, y devuelve un decorador de propiedades.
 */
export const createPropertyDecorator = <TAllowedTypes, TSchemaModifiers>() => (
    <TSchema extends Joi.Schema>(
    getBaseSchema: GetBaseSchemaFunction<TSchema, TAllowedTypes>,
    getModifierProviders: ( getJoi: () => typeof Joi ) => ModifierProviders<TSchema, TSchemaModifiers>
  ) => {
      // Inicializa el esquema y la lista de modificadores a aplicar.
      let schema: TSchema | undefined;
      const modifiersToApply: Array<( context: DecoratorContext<TSchema> ) => TSchema> = [];

      // Obtiene los proveedores de modificadores.
      const modifierProviders = getModifierProviders(() => getJoi());

      // Define el decorador sin tipo.
      const decoratorUntyped: TypedPropertyDecorator<TAllowedTypes> = ( target, propertyKey ) => {
        // Obtiene la referencia a Joi.
        const joi = getJoi();

        // Obtiene el esquema base.
        schema = getBaseSchema({
          joi,
          target,
          propertyKey
        });
        // Aplica los modificadores al esquema.
        modifiersToApply.forEach(( modifierToApply ) => {
          schema = modifierToApply({
            schema: schema
          });
        });
        // Actualiza el esquema de trabajo.
        updateWorkingSchema( target, propertyKey, schema );
      };

      // Define el decorador con tipo.
      const decorator = decoratorUntyped as PropertyDecorator<TAllowedTypes, TSchemaModifiers>;

      // Añade los modificadores al decorador.
      forEachModifierProvider( modifierProviders, ( modifierName, modifierProvider ) => {
        indexable( decoratorUntyped )[modifierName] = ( ...args: unknown[]) => {
          // Añade el proveedor de modificadores a la lista de modificadores a aplicar.
          modifiersToApply.push( modifierProvider( ...args ));

          // Devuelve el decorador.
          return decorator;
        };
      });

      // Devuelve el decorador.
      return decorator;
    }
);

/**
 * La función `forEachModifierProvider` itera sobre una colección de proveedores de modificadores y
 * ejecuta una función de devolución de llamada para cada proveedor.
 * @param modifierProviders - Un objeto que contiene proveedores de modificadores. Cada proveedor de
 * modificadores es una función que toma un número arbitrario de argumentos y devuelve otra función que
 * toma un objeto de contexto y devuelve un objeto de esquema.
 * @param callback - El parámetro `callback` es una función que toma dos argumentos: `modifierName` y
 * `modifierProvider`. Se llama para cada proveedor de modificadores en el objeto `modifierProviders`.
 */
function forEachModifierProvider<TSchema extends Joi.Schema> (
  modifierProviders: ModifierProviders<TSchema, unknown>,
  callback: (
        modifierName: string,
        modifierProvider: ( ...args: unknown[]) => ( context: DecoratorContext<TSchema> ) => TSchema,
    ) => void
) {
  Object
    .keys( modifierProviders )
    .forEach(( modifierName ) => {
      const modifierProvider = modifierProviders[modifierName];
      callback( modifierName, modifierProvider );
    });
}

/* La función "indexable" es una función de utilidad que toma un valor de tipo "T" y devuelve un nuevo
tipo que es una combinación de "T" y una firma de índice. La firma de índice permite que el nuevo
tipo tenga propiedades con cualquier clave de cadena y valores de tipo "TValue". */
function indexable<T, TValue> ( value: T ): T & { [key: string]: TValue } {
  return value as T & { [key: string]: TValue };
}

/**
 * La función actualiza el esquema de trabajo para una clase y clave de propiedad determinadas con un
 * nuevo esquema.
 * @param {TClass} target - El parámetro de destino es la clase u objeto para el que queremos
 * actualizar el esquema de trabajo.
 * @param {TKey} propertyKey - El parámetro `propertyKey` es la clave de la propiedad en la clase para
 * la cual se actualiza el esquema. Puede ser una cadena o un símbolo.
 * @param schema - El parámetro `schema` es de tipo `Joi.Schema`. Representa el esquema de validación
 * que se asociará con la clave de propiedad en el esquema de trabajo.
 */
export function updateWorkingSchema<TClass, TKey extends StringOrSymbolKey<TClass>> (
  target: TClass,
  propertyKey: TKey,
  schema: Joi.Schema
) {
  let workingSchema = getWorkingSchema( target );

  if ( !workingSchema ) {
    workingSchema = {};
    Reflect.defineMetadata( WORKING_SCHEMA_KEY, workingSchema, target );
  }

  workingSchema[String( propertyKey )] = schema;
}