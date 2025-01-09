import ValueObjectError from "@shared/domain/error/ValueObjectError";

export default class PokedexPokemonInvalidWeightException extends ValueObjectError {
  constructor ( value: number ) {
    super({
      code: "INVALID_POKEDEX_POKEMON_WEIGHT",
      message: `Invalid Pokedex Pokemon weight: ${value}`
    });
  }
}