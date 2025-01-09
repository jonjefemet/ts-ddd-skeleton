import AggregateRoot from "@shared/domain/aggregate/AggregateRoot";
import PokemonId from "./PokemonId";
import PokemonName from "./PokemonName";
import PokemonTypes from "./PokemonTypes";
import { Primitives } from "@utils/helper/Primitives";

export abstract class Pokemon extends AggregateRoot {

  readonly id: PokemonId;

  readonly name: PokemonName;

  readonly types: PokemonTypes;

  constructor ( props: PokemonProps ) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.types = props.types;
  }

  toPrimitive (): Primitives<Pokemon> {

    return {
      id: this.id.valueOf(),
      name: this.name.valueOf(),
      types: this.types.toPrimitive()
    };
  }
}

export type PokemonProps = {
  id: PokemonId;
  name: PokemonName;
  types: PokemonTypes;
};