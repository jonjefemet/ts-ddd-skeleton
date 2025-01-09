import { AWSEvents } from "@shared/infrastructure/controller/events/Events";
import { Request } from "@middy/core";
import APIGatewayProxyCustomEvent from "@shared/infrastructure/controller/events/APIGatewayProxyEventCustomEvent";
import SQSCustomEvent from "@shared/infrastructure/controller/events/SQSCustomEvent";
import SNSCustomEvent from "@shared/infrastructure/controller/events/SNSCustomEvent";
import { MiddlewareParams } from "./handlerMiddleware";
import jsonBodyParser from "@middy/http-json-body-parser";
import TriggerEventType from "@utils/constant/TriggerEventType.enum";
import HttpRequestParameter from "@utils/constant/HttpRequestParameter.enum";
import { getJoischema } from "@utils/schema/core";
import InfraestructureError from "@shared/domain/error/InfraestructureError";
import HttpStatusCode from "@utils/constant/HttpStatusCode.enum";

/**
 * La función `APIEventBuilder` procesa solicitudes API analizando el cuerpo JSON, configurando la
 * versión del evento, validando los parámetros de la solicitud y manejando errores.
 * @param request - El parámetro `request` en la función `APIEventBuilder` es de tipo
 * `Request<APIGatewayProxyCustomEvent>`. Este parámetro probablemente representa la solicitud entrante
 * al punto final de API y contiene información como el método HTTP, encabezados, cuerpo, parámetros de
 * consulta, parámetros de ruta, etc.
 * @param {MiddlewareParams} middlewareParams - El parámetro `middlewareParams` en la función
 * `APIEventBuilder` parece contener información relacionada con la configuración del middleware para
 * manejar solicitudes API. Incluye la versión del protocolo HTTP que se utiliza y validadores de los
 * parámetros de solicitud basados en la versión especificada.
 */
const APIEventBuilder = async ( request: Request<APIGatewayProxyCustomEvent>, middlewareParams: MiddlewareParams ) => {
  await jsonBodyParser().before( request );
  request.event.version = middlewareParams.version.HTTP.default;

  const requestParameter = {
    [HttpRequestParameter.BODY]: request.event.body || {},
    [HttpRequestParameter.QUERY]: request.event.queryStringParameters || {},
    [HttpRequestParameter.PATH]: request.event.pathParameters || {}
  };

  const validators = ( middlewareParams.validators && middlewareParams.validators[request.event.version]) || [];

  await Promise.all( validators.map( async validator => {
    const schema = getJoischema( validator.schema );

    if ( schema ) await schema.validateAsync( requestParameter[validator.type], { abortEarly: false }).catch( error => {
      const infraestructureError = InfraestructureError.create({
        code: "b2c5e3c2-8306-4b18-a33c-628e9da7f950",
        message: error.message
      }, HttpStatusCode.BAD_REQUEST );
      infraestructureError.stack = error.stack;

      throw infraestructureError;
    });
  }));

};

/**
 * Esta función de TypeScript procesa eventos SQS analizando el cuerpo de cada registro y configurando
 * la versión del evento en función de los parámetros del middleware.
 * @param request - El parámetro `solicitud` es un objeto que contiene un objeto `Solicitud` con un
 * tipo genérico `SQSCustomEvent`. Se utiliza para procesar eventos SQS.
 * @param {MiddlewareParams} middlewareParams - MiddlewareParams es un objeto que contiene varios
 * parámetros que utiliza la función de middleware. En este caso específico, parece contener una
 * propiedad llamada "versión" que probablemente contiene información relacionada con la versión del
 * SQS (Simple Queue Service) que se está utilizando. El objeto middlewareParams se está utilizando
 * para acceder
 */
const SQSEventBuilder = async ( request: Request<SQSCustomEvent>, middlewareParams: MiddlewareParams ) => {

  request.event.Records.forEach( record => {
    if ( record.body ) {
      record.body = JSON.parse( record.body );
    }
  });
  request.event.version = middlewareParams.version.SQS.default;
};

/**
 * La función `SNSEventBuilder` procesa registros de eventos SNS analizando el mensaje y configurando
 * la versión del evento.
 * @param request - El parámetro `solicitud` es un objeto que contiene un objeto `Solicitud` con un
 * tipo genérico `SNSCustomEvent`. Este objeto probablemente representa una solicitud entrante
 * relacionada con un evento SNS (Servicio de notificación simple).
 * @param {MiddlewareParams} middlewareParams - MiddlewareParams es un objeto que contiene varias
 * propiedades que se utilizan como parámetros de middleware en la función. Parece que se accede a la
 * propiedad de versión desde middlewareParams para configurar la versión del evento SNS en el objeto
 * de solicitud.
 */
const SNSEventBuilder = async ( request: Request<SNSCustomEvent>, middlewareParams: MiddlewareParams ) => {
  request.event.Records.forEach( record => {
    if ( record.Sns.Message ) {
      record.Sns.Message = JSON.parse( record.Sns.Message );
    }
  });
  request.event.version = middlewareParams.version.SNS.default;
};

/* `RequestFactory` es una función de fábrica que crea diferentes tipos de creadores de eventos según
el `eventType` proporcionado. Toma dos parámetros: `solicitud` de tipo `Request<AWSEvents>` y
`middlewareParams` de tipo `MiddlewareParams`. */
export const RequestFactory = ( function ( request: Request<AWSEvents>, middlewareParams: MiddlewareParams ) {
  const builders = {
    [TriggerEventType.HTTP]: APIEventBuilder,
    [TriggerEventType.SQS]: SQSEventBuilder,
    [TriggerEventType.SNS]: SNSEventBuilder
  } as const;

  return {
    build: ( eventType: TriggerEventType ) => {
      const eventBuilder = builders[eventType];

      if ( !eventBuilder ) throw new Error( `Invalid event type: ${eventType}` );

      return eventBuilder( request as Request, middlewareParams );

    }
  };
});