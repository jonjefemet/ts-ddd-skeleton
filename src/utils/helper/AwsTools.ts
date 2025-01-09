import { AWS } from "@serverless/typescript";

function getConfigValues ( serverlessConfiguration: AWS ) {
  const serviceName = serverlessConfiguration.service;
  const outputs = serverlessConfiguration.resources.Outputs;
  const arn = "${" + serviceName + "." + Object.keys( outputs ).at( 0 ) + "}";

  return [
    serviceName,
    arn
  ];
}

export { getConfigValues };