import { PokedexPokemon } from "@context/pokemon_example/pokedex/pokemon/domain/PokedexPokemon";
import PokedexPokemonRepository from "@context/pokemon_example/pokedex/pokemon/domain/PokedexPokemonRepository";
import PokemonId from "@context/pokemon_example/pokemon/pokemon/domain/PokemonId";
import Criteria from "@shared/domain/criteria/Criteria";

export default class MockPokedexPokemonRepository implements PokedexPokemonRepository {

  private mockSearch = jest.fn();

  private mockMatching = jest.fn();

  private mockSave = jest.fn();

  async search ( id: PokemonId ): Promise<PokedexPokemon> {
    return this.mockSearch( id );
  }

  returnOnSearch ( value: PokedexPokemon ): void {

    this.mockSearch.mockReturnValue( value );
  }

  async matching ( criteria: Criteria ): Promise<PokedexPokemon[]> {
    return await this.mockMatching( criteria );
  }

  returnOnMatching ( value: PokedexPokemon[]): void {
    this.mockMatching.mockReturnValue( value );
  }

  async save ( pokemon: PokedexPokemon ): Promise<void> {
    return this.mockSave( pokemon );
  }

  assureSeveHasBeenCalledWith ( pokemon: PokedexPokemon ): void {
    expect( this.mockSave ).toHaveBeenCalledWith( pokemon );
  }

}