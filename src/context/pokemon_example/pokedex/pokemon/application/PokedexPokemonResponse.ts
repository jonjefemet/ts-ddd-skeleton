import { Response } from "@shared/domain/bus/query/Response";
import { Primitives } from "@utils/helper/Primitives";

export default class PokedexPokemonResponse implements Response {
  constructor (
    public readonly id: string,
    public readonly name: string,
    public readonly types: string[],
    public readonly numberPokedex: number,
    public readonly description: string,
    public readonly height: number,
    public readonly weight: number
  ) {}

  static create ( props: PokedexPokemonResponseProps ): PokedexPokemonResponse {
    return new PokedexPokemonResponse(
      props.id,
      props.name,
      props.types,
      props.numberPokedex,
      props.description,
      props.height,
      props.weight
    );
  }
}

type PokedexPokemonResponseProps = Primitives<PokedexPokemonResponse>;