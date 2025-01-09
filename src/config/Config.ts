export default Object.freeze({
  STAGE: process.env.Stage || "local",
  AWS_REGION: process.env.AWS_REGION || "us-east-1",
  DB_SECRET_NAME: process.env.SecretDBName,
  SNS_EVENT_BUS_ARN: process.env.SNSEventBusArn
});
