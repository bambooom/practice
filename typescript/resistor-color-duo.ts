export enum ResistorValues {
  black = 0,
  brown = 1,
  red = 2,
  orange = 3,
  yellow = 4,
  green = 5,
  blue = 6,
  violet = 7,
  grey = 8,
  white = 9,
}
type Color = keyof typeof ResistorValues;

export function decodedValue([first, second]: Color[]): number {
  return Number(`${ResistorValues[first]}${ResistorValues[second]}`);
}

// another solution
interface Color2 {
  [c: string]: number;
}
const colorsMap: Color2 = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};
export function decodedValue2(colors: string[]): number {
  if (colors.length < 2) {
    throw 'At least two colors need to be present';
  }
  const [first, second] = colors;
  return Number(`${colorsMap[first]}${colorsMap[second]}`);
}

// another normal one
const valueMaps: { [key: string]: number } = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};
export function decodedValue3([band1, band2]: string[]): number {
  return valueMaps[band1] * 10 + valueMaps[band2];
}

export function decodedResistorValue([first, second, third]: Color[]) {
  return Number(
    `${ResistorValues[first]}${ResistorValues[second]}${'0'.repeat(
      ResistorValues[third],
    )}`,
  );
}

export const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
] as const;

type Colors = typeof COLORS[number];

export const colorCode = (color: Colors) => COLORS.indexOf(color);
