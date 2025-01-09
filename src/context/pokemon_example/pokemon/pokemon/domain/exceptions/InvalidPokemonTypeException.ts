import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class InvalidPokemonTypeException extends ValueObjectError {
  constructor ( value: string ) {
    super({
      code: "INVALID_POKEMON_TYPE",
      message: `Invalid Pokemon type: ${value}`
    });
  }
}