export enum ServicesEnum {
  DUMMY_SERVICE_HOST="DUMMY_SERVICE_HOST",
}

export default Object.freeze({
  [ServicesEnum["DUMMY_SERVICE_HOST"]]: process.env.DUMMY_SERVICE_HOST
});
