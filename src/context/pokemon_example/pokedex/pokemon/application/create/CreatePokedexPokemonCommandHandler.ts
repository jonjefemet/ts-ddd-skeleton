import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import CreatePokedexPokemonCommand from "./CreatePokedexPokemonCommand";
import { Command } from "@shared/domain/bus/command/Command";
import PokedexPokemonCreator from "./PokedexPokemonCreator";

import PokedexPokemonNumberPokedex from "../../domain/PokedexPokemonNumberPokedex";
import PokedexPokemonDescription from "../../domain/PokedexPokemonDescription";
import PokedexPokemonHeight from "../../domain/PokedexPokemonHeight";
import PokedexPokemonWeight from "../../domain/PokedexPokemonWeight";
import Log from "@utils/decorators/Log";
import PokemonId from "@context/pokemon_example/pokemon/pokemon/domain/PokemonId";
import PokemonName from "@context/pokemon_example/pokemon/pokemon/domain/PokemonName";
import PokemonTypes from "@context/pokemon_example/pokemon/pokemon/domain/PokemonTypes";
import PokemonType from "@context/pokemon_example/pokemon/pokemon/domain/PokemonType";

export default class CreatePokedexPokemonCommandHandler implements CommandHandler<CreatePokedexPokemonCommand> {

  constructor (
    private readonly pokedexPokemonCreator: PokedexPokemonCreator
  ) {}

  subscribedTo (): Command {
    return CreatePokedexPokemonCommand;
  }

  @Log()
  async handle ( command: CreatePokedexPokemonCommand ): Promise<void> {
    const {
      id, name, types, numberPokedex, description, height, weight
    } = command;

    const props = {
      id: new PokemonId( id ),
      name: new PokemonName( name ),
      types: new PokemonTypes( ...types.map( type => PokemonType.fromValue( type ))),
      numberPokedex: new PokedexPokemonNumberPokedex( numberPokedex ),
      description: new PokedexPokemonDescription( description ),
      height: new PokedexPokemonHeight( height ),
      weight: new PokedexPokemonWeight( weight )
    };

    await this.pokedexPokemonCreator.create( props );
  }

}