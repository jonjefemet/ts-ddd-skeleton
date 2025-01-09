import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class PokemonTypesCannotBeRepeatedExeption extends ValueObjectError {

  constructor () {
    super({
      code: "POKEMON_TYPES_CANNOT_BE_REPEATED",
      message: `Pokemon types cannot be repeated`
    });
  }
}