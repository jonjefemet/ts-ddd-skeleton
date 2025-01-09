import { randomBytes } from "crypto";

export function secureRandom (): number {
  // Genera 4 bytes aleatorios
  const randomHex = randomBytes( 4 ).toString( "hex" );
  // Convierte el valor hexadecimal a un número entero
  const randomInt = parseInt( randomHex, 16 );

  // Divide por el valor máximo de 32 bits para obtener un número entre 0 y 1
  return randomInt / 0xFFFFFFFF;
}

export const randomIntNumber = ({
  min = 1, max = 0xFFFFFFFF
}: {min?: number; max: number }) => {
  return Math.floor( parseInt( randomBytes( 4 ).toString( "hex" ), 16 ) / 0xFFFFFFFF * ( max - min + 1 )) + min;
};