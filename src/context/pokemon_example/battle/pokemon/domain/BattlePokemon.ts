import BattlePokemonAttack from "./BattlePokemonAttack";
import BattlePokemonDefense from "./BattlePokemonDefense";
import BattlePokemonSpeed from "./BattlePokemonSpeed";
import BattlePokemonPointsOfLife from "./BattlePokemonPointsOfLife";
import { Primitives } from "@utils/helper/Primitives";
import { Pokemon, PokemonProps } from "@context/pokemon_example/pokemon/pokemon/domain/Pokemon";

export default class BattlePokemon extends Pokemon {

  private pointsOfLife: BattlePokemonPointsOfLife;

  readonly attack: BattlePokemonAttack;

  readonly defense: BattlePokemonDefense;

  readonly speed: BattlePokemonSpeed;

  constructor ( props: BattlePokemonProps ) {

    super( props );
    this.pointsOfLife = props.pointsOfLife;
    this.attack = props.attack;
    this.defense = props.defense;
    this.speed = props.speed;
  }

  hp (): number {
    return this.pointsOfLife.valueOf();
  }

  toPrimitive (): Primitives<BattlePokemon> & { pointsOfLife: number} {
    return {
      ...super.toPrimitive(),
      pointsOfLife: this.pointsOfLife.valueOf(),
      attack: this.attack.valueOf(),
      defense: this.defense.valueOf(),
      speed: this.speed.valueOf()
    };
  }

  isAlive (): boolean {
    return this.pointsOfLife.isAlive();
  }

  receiveDamage ( damage: number ): void {
    const newPointsOfLife = this.pointsOfLife.valueOf() - damage;
    this.pointsOfLife = new BattlePokemonPointsOfLife( newPointsOfLife < 0
      ? 0
      : newPointsOfLife );
  }

  attackFor ( enemy: BattlePokemon ): void {
    const damage = this.attack.calculateDamage( enemy.defense );
    enemy.receiveDamage( damage );
  }

}

export type BattlePokemonProps = {
    pointsOfLife: BattlePokemonPointsOfLife;
    attack: BattlePokemonAttack;
    defense: BattlePokemonDefense;
    speed: BattlePokemonSpeed;
} & PokemonProps;