import { SecretStructureMap } from "./Config";

type SecretConfig = {
    [alias in keyof SecretStructureMap]: string;
};

export { SecretConfig, SecretStructureMap };