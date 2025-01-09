import { Request } from "@middy/core";
import { APIResponse } from "@shared/infrastructure/controller/APIGatewayProxyEventFactoryHandler";
import APIGatewayProxyCustomEvent from "@shared/infrastructure/controller/events/APIGatewayProxyEventCustomEvent";
import { AWSEvents } from "@shared/infrastructure/controller/events/Events";
import SQSCustomEvent from "@shared/infrastructure/controller/events/SQSCustomEvent";
import HttpStatusCode from "@utils/constant/HttpStatusCode.enum";
import TriggerEventType from "@utils/constant/TriggerEventType.enum";
import CustomErrorAbstractFactory from "@utils/error/CustomErrorAbstractFactory";
import DefaultError from "@utils/error/DefaultError";
import Exception from "@utils/error/Exception";
import { isTestEnviroment } from "@utils/helper/Stage";
import Logger from "@utils/log/Logger";

type Response = {
    statusCode: number;
    body: string;
    headers: Record<string, string>;
};

const baseHeaders: Record<string, string> = {
  "Content-Type": "application/json; charset=UTF-8",
  "Access-Control-Allow-Headers": "timestamp,tz,tenant-id,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true"
};

const defaultException: Exception = {
  code: "b71edc08-b6bf-466e-b9a6-f59cb4543607",
  message: "Unknown Error"
};

/**
 * La función `SQSResponseHandler` procesa registros SQS y registra errores de elementos fallidos.
 * @param request - El parámetro `request` en la función `SQSResponseHandler` es de tipo
 * `Request<SQSCustomEvent>`. Contiene las siguientes propiedades:
 */
const SQSResponseHandler = ( request: Request<SQSCustomEvent> ) => {

  const {
    event: { Records }, response
  } = request;

  Logger.run( "ResponseHandlerSQS", request );
  const batchItemFailures = [];

  for ( const [
    idx,
    record
  ] of Object.entries( Records )) {
    const {
      status, reason
    } = response[idx];

    if ( status === "fulfilled" ) continue;

    batchItemFailures.push({
      itemIdentifier: record.messageId
    });
    Logger.error( reason, record );

  }

  request.response = {
    batchItemFailures
  };
};

/**
 * La función `HTTPResponseHandler` procesa una respuesta HTTP extrayendo el código de estado, el
 * cuerpo y los encabezados del objeto de respuesta y luego pasándolos a `ResponseHandler`.
 * @param request - El parámetro `request` en la función `HTTPResponseHandler` es de tipo
 * `Request<APIGatewayProxyCustomEvent, APIResponse>`. Esto significa que espera un objeto que contiene
 * información sobre el evento del proxy API Gateway y la respuesta de la API.
 * @returns La función HTTPResponseHandler devuelve el resultado de llamar a la función ResponseHandler
 * con el código de estado, el cuerpo (convertido a una cadena JSON) y los encabezados como argumentos.
 */
const HTTPResponseHandler = ( request: Request<APIGatewayProxyCustomEvent, APIResponse > ) => {

  const { response } = request;
  const {
    statusCode = HttpStatusCode.OK, body = undefined, headers = {}
  } = response;

  const customHeaders = {
    ...baseHeaders,
    ...headers
  };

  const jsonBody = body
    ? JSON.stringify( body )
    : undefined;
  request.response = ResponseHandler( statusCode, jsonBody, customHeaders );

};

/**
 * La función `SuccessResponseHandler` en TypeScript maneja diferentes tipos de eventos llamando a
 * controladores de respuesta específicos según el origen del evento.
 * @param request - El parámetro `request` en la función `SuccessResponseHandler` es de tipo
 * `Request<AWSEvents>`. Esta función maneja diferentes tipos de fuentes de eventos, como HTTP y SQS,
 * al delegar el manejo de respuestas a controladores de respuestas específicos según el tipo de fuente
 * de eventos.
 */
export const SuccessResponseHandler = ( request: Request<AWSEvents> ) => {
  const eventReponseType = {
    [TriggerEventType.HTTP]: ( request: Request<APIGatewayProxyCustomEvent> ) => {
      HTTPResponseHandler( request );
    },
    [TriggerEventType.SQS]: ( request: Request<SQSCustomEvent> ) => SQSResponseHandler( request )
  } as const;

  const eventReponse = eventReponseType[request.event.eventSource];

  if ( eventReponse ) {
    eventReponse( request );
  }
};

/**
 * La función ErrorResponseHandler maneja los errores registrándolos, verificando si se trata de un
 * evento HTTP, creando un error personalizado si es necesario y devolviendo una respuesta con el
 * código de estado y el mensaje apropiados.
 * @param request - El parámetro `request` en la función `ErrorResponseHandler` es de tipo
 * `Request<AWSEvents, desconocido, CustomErrorAbstractFactory>`. Esto significa que la función espera
 * un objeto que contenga información relacionada con la solicitud, incluido el origen del evento, el
 * error y la lógica de manejo de errores. El `
 * @returns La función ErrorResponseHandler devuelve una respuesta generada por la función
 * ResponseHandler. La respuesta incluye el código de estado HTTP, el mensaje de error formateado y los
 * encabezados base en formato JSON.
 */
export const ErrorResponseHandler = ( request: Request<AWSEvents, unknown, CustomErrorAbstractFactory> ) => {

  Logger.error( "ErrorResponseHandler", request.error );
  const isHttpEvent = request.event.eventSource === TriggerEventType.HTTP;

  if ( !isHttpEvent && !isTestEnviroment ) {
    throw request.error;
  }

  const isCustomError = request.error instanceof CustomErrorAbstractFactory;
  let error = request.error;

  if ( !isCustomError ) {
    defaultException.message = error.message || defaultException.message;
    error = new DefaultError( defaultException );
  }

  return ResponseHandler( error.httpStatusCode, JSON.stringify( error.format()), baseHeaders ) ;
};

/**
 * La función `ResponseHandler` toma un código de estado, un cuerpo opcional y encabezados opcionales,
 * y devuelve un objeto Response con estos valores.
 * @param {number} statusCode - El parámetro `statusCode` es un número que representa el código de
 * estado HTTP que se incluirá en la respuesta.
 * @param {string} [body] - El parámetro `body` en la función `ResponseHandler` es una cadena que
 * representa el contenido del cuerpo de la respuesta. Puede contener cualquier dato que desee devolver
 * en la respuesta, como datos JSON, contenido HTML o texto sin formato. Si no se proporciona ningún
 * "cuerpo" al llamar
 * @param [headers] - El parámetro `headers` en la función `ResponseHandler` es un objeto de registro
 * que contiene pares clave-valor de nombres de encabezado y sus valores correspondientes. Estos
 * encabezados se utilizan para proporcionar información adicional sobre la respuesta que se envía
 * desde el servidor.
 * @returns Se devuelve un objeto de respuesta con el código de estado, el cuerpo y los encabezados
 * proporcionados.
 */
const ResponseHandler = ( statusCode: number, body?: string, headers?: Record<string, string> ): Response => {

  return {
    statusCode: statusCode,
    body: body,
    headers: headers
  };
};