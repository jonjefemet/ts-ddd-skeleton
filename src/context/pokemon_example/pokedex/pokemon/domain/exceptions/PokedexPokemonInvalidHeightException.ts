import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class PokedexPokemonInvalidHeightException extends ValueObjectError {
  constructor ( value: number ) {
    super({
      code: "INVALID_POKEDEX_POKEMON_HEIGHT",
      message: `Invalid Pokedex Pokemon height: ${value}`
    });
  }
}