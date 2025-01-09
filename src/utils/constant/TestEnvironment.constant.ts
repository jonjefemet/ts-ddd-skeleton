import Environment from "./Environment.enum";

const TestEnviroment: string[] = Object.seal([
  Environment.DEV,
  Environment.QA,
  Environment.LOCAL
]);

export default TestEnviroment;