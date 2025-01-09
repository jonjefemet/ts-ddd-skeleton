import MockPokedexPokemonRepository from "../../__mocks__/MockPokedexPokemonRepository";
import CreatePokedexPokemonCommandMother from "./CreatePokedexPokemonCommandMother";
import PokedexPokemonMother from "../../domain/PokedexPokemonMother";
import CreatePokedexPokemonCommandHandler from "@context/pokemon_example/pokedex/pokemon/application/create/CreatePokedexPokemonCommandHandler";
import PokedexPokemonCreator from "@context/pokemon_example/pokedex/pokemon/application/create/PokedexPokemonCreator";
import PokedexPokemonInvalidWeightException from "@context/pokemon_example/pokedex/pokemon/domain/exceptions/PokedexPokemonInvalidWeightException";
import PokedexPokemonInvalidHeightException from "@context/pokemon_example/pokedex/pokemon/domain/exceptions/PokedexPokemonInvalidHeightException";
import InvalidPokemonTypeException from "@context/pokemon_example/pokemon/pokemon/domain/exceptions/InvalidPokemonTypeException";
import PokemonTypesCannotBeRepeatedExeption from "@context/pokemon_example/pokemon/pokemon/domain/exceptions/PokemonTypesCannotBeRepeatedExeption";

describe( "CreatePokedexPokemonCommandHandler", () => {

  let handler: CreatePokedexPokemonCommandHandler;
  let mockPokedexPokemonRepository: MockPokedexPokemonRepository;
  let pokedexPokemonCreator: PokedexPokemonCreator;

  beforeEach(() => {
    mockPokedexPokemonRepository = new MockPokedexPokemonRepository();
    pokedexPokemonCreator = new PokedexPokemonCreator( mockPokedexPokemonRepository );
    handler = new CreatePokedexPokemonCommandHandler( pokedexPokemonCreator );
  });
  it( "should create a pokedex pokemon", async () => {
    const command = CreatePokedexPokemonCommandMother.random();
    const pokedexPokemon = PokedexPokemonMother.fromCommand( command );
    await handler.handle( command );
    mockPokedexPokemonRepository.assureSeveHasBeenCalledWith( pokedexPokemon );
  });
  it( "should throw an error if the pokemon weight is invalid", async () => {
    expect(() => {
      const command = CreatePokedexPokemonCommandMother.invalidWeight();
      const pokedexPokemon = PokedexPokemonMother.fromCommand( command );
      handler.handle( command );
      mockPokedexPokemonRepository.assureSeveHasBeenCalledWith( pokedexPokemon );
    }).toThrow( PokedexPokemonInvalidWeightException );
  });
  it( "should throw an error if the pokemon height is invalid", async () => {
    expect(() => {
      const command = CreatePokedexPokemonCommandMother.invalidHeight();
      const pokedexPokemon = PokedexPokemonMother.fromCommand( command );
      handler.handle( command );
      mockPokedexPokemonRepository.assureSeveHasBeenCalledWith( pokedexPokemon );
    }).toThrow( PokedexPokemonInvalidHeightException );
  });
  it( "should throw an error if types are invalid", async () => {
    expect(() => {
      const command = CreatePokedexPokemonCommandMother.invalidTypes();
      const pokedexPokemon = PokedexPokemonMother.fromCommand( command );
      handler.handle( command );
      mockPokedexPokemonRepository.assureSeveHasBeenCalledWith( pokedexPokemon );
    }).toThrow( InvalidPokemonTypeException );
  });
  it ( "should throw an error if types are repeated", async () => {
    expect(() => {
      const command = CreatePokedexPokemonCommandMother.repeatedTypes();
      const pokedexPokemon = PokedexPokemonMother.fromCommand( command );
      handler.handle( command );
      mockPokedexPokemonRepository.assureSeveHasBeenCalledWith( pokedexPokemon );
    }).toThrow( PokemonTypesCannotBeRepeatedExeption );
  });
});