import { Primitives } from "@utils/helper/Primitives";
import PokedexPokemonHeight from "./PokedexPokemonHeight";
import PokedexPokemonWeight from "./PokedexPokemonWeight";
import PokedexPokemonNumberPokedex from "./PokedexPokemonNumberPokedex";
import PokedexPokemonDescription from "./PokedexPokemonDescription";
import { Pokemon, PokemonProps } from "@context/pokemon_example/pokemon/pokemon/domain/Pokemon";

export class PokedexPokemon extends Pokemon {

  readonly numberPokedex: PokedexPokemonNumberPokedex;

  readonly description: PokedexPokemonDescription;

  readonly height: PokedexPokemonHeight;

  readonly weight: PokedexPokemonWeight;

  constructor ( props: PokedexPokemonProps ) {
    super( props );
    this.numberPokedex = props.numberPokedex;
    this.description = props.description;
    this.height = props.height;
    this.weight = props.weight;
  }

  toPrimitive (): Primitives<PokedexPokemon> {
    return {
      numberPokedex: this.numberPokedex.valueOf(),
      description: this.description.toString(),
      height: this.height.valueOf(),
      weight: this.weight.valueOf(),
      ...super.toPrimitive()
    };
  }

  static create ( props: PokedexPokemonProps ): PokedexPokemon {
    return new PokedexPokemon( props );
  }
}

export type PokedexPokemonProps = {
    numberPokedex: PokedexPokemonNumberPokedex;
    description: PokedexPokemonDescription;
    height: PokedexPokemonHeight;
    weight: PokedexPokemonWeight;
} & PokemonProps;