import { ServerlessCompose } from "./src/utils/helper/Type";

const defaultDependencies = [
  "email-service-layer-db",
  "email-service-layer-aws",
  "email-service-layer-lib"
];

const defaultParameters = {
  libLayer: "${email-service-layer-lib.SisturManageLibLambdaLayerQualifiedArn}",
  dbLayer: "${email-service-layer-db.SisturManageDBLambdaLayerQualifiedArn}",
  awsLayer: "${email-service-layer-aws.SisturManageAWSLambdaLayerQualifiedArn}"

};

const serverlessCompose: ServerlessCompose = {
  services: {
    "email-service-layer-db": {
      path: "./layers/db"
    },
    "email-service-layer-aws": {
      path: "./layers/aws"
    },
    "email-service-layer-lib": {
      path: "./layers/lib"
    },
    "sistur-scrigno": {
      path: "services/scrigno",
      dependsOn: defaultDependencies,
      params: defaultParameters
    },
    "sistur-opera": {
      path: "services/opera",
      dependsOn: defaultDependencies,
      params: defaultParameters
    }
  }
};

module.exports = serverlessCompose;