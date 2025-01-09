import TestEnviroment from "../constant/TestEnvironment.constant";

/**
 * La función comprueba si una etapa determinada es un entorno de prueba.
 * @param {string} stage - El parámetro `stage` es una cadena que representa la etapa o entorno actual.
 */
const isTestEnviroment = ( stage: string ): boolean => TestEnviroment.some(( env: string ) => env.toUpperCase() === stage.toUpperCase());

export { isTestEnviroment };