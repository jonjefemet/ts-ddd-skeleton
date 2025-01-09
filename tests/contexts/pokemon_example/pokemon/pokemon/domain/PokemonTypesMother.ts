import PokemonType, { PokemonTypeEnum } from "@context/pokemon_example/pokemon/pokemon/domain/PokemonType";
import PokemonTypes from "@context/pokemon_example/pokemon/pokemon/domain/PokemonTypes";
import { secureRandom } from "@utils/helper/Random";

export default class PokemonTypesMother {

  static random (): PokemonTypes {

    const types = Object.values( PokemonTypeEnum );
    const shuffled = types.sort(() => 0.5 - secureRandom());
    const selectedTypes = shuffled.slice( 0, 2 );

    return PokemonTypesMother.create( selectedTypes.map( type => PokemonType.create( type )));
  }

  static create ( value: PokemonType[]): PokemonTypes {
    return new PokemonTypes( ...value );
  }

  static invalid (): PokemonTypes {

    return PokemonTypesMother.create([
      PokemonType.fromValue( "INVALID" )
    ]);
  }

  static repeated (): PokemonTypes {

    return PokemonTypesMother.create([
      PokemonType.create( PokemonTypeEnum.FIRE ),
      PokemonType.create( PokemonTypeEnum.FIRE )
    ]);
  }
}