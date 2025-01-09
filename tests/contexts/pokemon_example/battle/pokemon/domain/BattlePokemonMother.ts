import PokemonIdMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonIdMother";
import PokemonNameMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonName";
import PokemonTypesMother from "@tests/contexts/pokemon_example/pokemon/pokemon/domain/PokemonTypesMother";
import BattlePokemonPointsOfLifeMother from "./BattlePokemonPointsOfLifeMother";
import BattlePokemonAttackMother from "./BattlePokemonAttackMother";
import BattlePokemonDefenseMother from "./BattlePokemonDefenseMother";
import BattlePokemonSpeedMother from "./BattlePokemonSpeedMother";
import BattlePokemon, { BattlePokemonProps } from "@context/pokemon_example/battle/pokemon/domain/BattlePokemon";

export default class BattlePokemonMother {

  static create ( props: BattlePokemonProps ): BattlePokemon {
    return new BattlePokemon( props );
  }

  static random (): BattlePokemon {
    return BattlePokemonMother.create({
      id: PokemonIdMother.random(),
      name: PokemonNameMother.random(),
      types: PokemonTypesMother.random(),
      pointsOfLife: BattlePokemonPointsOfLifeMother.random(),
      attack: BattlePokemonAttackMother.random(),
      defense: BattlePokemonDefenseMother.random(),
      speed: BattlePokemonSpeedMother.random()
    });
  }

}