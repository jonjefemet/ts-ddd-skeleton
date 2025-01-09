/* El código declara un tipo llamado `MixedList` usando la palabra clave `declare` de TypeScript. Este
tipo puede contener valores que son una matriz de tipo "T" o un objeto con claves de cadena y
valores de tipo "T". */
declare type MixedList<T> = T[] | {
  [key: string]: T;
};

declare type Maybe<T> = T | undefined;

declare type ServerlessCompose = {
    services: {
        [key: string]: {
          path: string;
          dependsOn?: string[];
          params?: {[key: string]: string};
        };
    };
};

declare type PartialWithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export { MixedList, Maybe, ServerlessCompose, PartialWithRequired };