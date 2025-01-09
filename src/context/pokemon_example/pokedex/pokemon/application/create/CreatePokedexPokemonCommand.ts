import { Command } from "@shared/domain/bus/command/Command";
import { Primitives } from "@utils/helper/Primitives";
import { PokedexPokemon } from "../../domain/PokedexPokemon";

export default class CreatePokedexPokemonCommand extends Command {

  readonly id: string;

  readonly name: string;

  readonly types: string[];

  readonly numberPokedex: number;

  readonly description: string;

  readonly height: number;

  readonly weight: number;

  constructor ( props: CreatePokedexPokemonCommandProps ) {
    super();
    this.id = props.id;
    this.numberPokedex = props.numberPokedex;
    this.description = props.description;
    this.height = props.height;
    this.weight = props.weight;
    this.name = props.name;
    this.types = props.types;

  }

}

export type CreatePokedexPokemonCommandProps = Primitives<PokedexPokemon>;