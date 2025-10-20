export type NumerologyInput = {
  fullName: string;
  dateOfBirth: string; // format: YYYY-MM-DD
};

export type NumerologyResult = {
  mulank: NumerologyNumber;
  bhagyank: NumerologyNumber;
  nameNumber: NumerologyNumber;
};

export type NumerologyNumber = {
  value: number;
  planet: string;
  traits: string[];
  compatibleNumbers: number[];
};

const CHALDEAN_MAP: Record<string, number> = {
  a: 1,
  i: 1,
  j: 1,
  q: 1,
  y: 1,
  b: 2,
  k: 2,
  r: 2,
  c: 3,
  g: 3,
  l: 3,
  s: 3,
  d: 4,
  m: 4,
  t: 4,
  e: 5,
  h: 5,
  n: 5,
  x: 5,
  u: 6,
  v: 6,
  w: 6,
  o: 7,
  z: 7,
  f: 8,
  p: 8,
};

const NUMBER_PROFILES: Record<number, NumerologyNumber> = {
  1: {
    value: 1,
    planet: 'Sun',
    traits: ['Leadership', 'Confidence', 'Innovation'],
    compatibleNumbers: [1, 3, 5],
  },
  2: {
    value: 2,
    planet: 'Moon',
    traits: ['Sensitivity', 'Diplomacy', 'Creativity'],
    compatibleNumbers: [2, 4, 6],
  },
  3: {
    value: 3,
    planet: 'Jupiter',
    traits: ['Optimism', 'Expression', 'Mentorship'],
    compatibleNumbers: [1, 3, 6, 9],
  },
  4: {
    value: 4,
    planet: 'Rahu',
    traits: ['Stability', 'Discipline', 'Systems'],
    compatibleNumbers: [2, 4, 8],
  },
  5: {
    value: 5,
    planet: 'Mercury',
    traits: ['Adaptability', 'Communication', 'Travel'],
    compatibleNumbers: [1, 3, 5, 6],
  },
  6: {
    value: 6,
    planet: 'Venus',
    traits: ['Harmony', 'Beauty', 'Care'],
    compatibleNumbers: [3, 5, 6, 9],
  },
  7: {
    value: 7,
    planet: 'Ketu',
    traits: ['Spirituality', 'Analysis', 'Intuition'],
    compatibleNumbers: [2, 4, 7],
  },
  8: {
    value: 8,
    planet: 'Saturn',
    traits: ['Persistence', 'Justice', 'Authority'],
    compatibleNumbers: [1, 4, 8],
  },
  9: {
    value: 9,
    planet: 'Mars',
    traits: ['Courage', 'Passion', 'Action'],
    compatibleNumbers: [3, 6, 9],
  },
};

const digitalRoot = (value: number): number => {
  let current = value;
  while (current > 9) {
    current = current
      .toString()
      .split('')
      .reduce((sum, digit) => sum + Number.parseInt(digit, 10), 0);
  }
  return current === 0 ? 0 : current;
};

const normalizeDate = (dob: string) => {
  const [year, month, day] = dob.split('-').map((part) => Number.parseInt(part, 10));
  return { year, month, day };
};

export const calculateMulank = (dob: string): NumerologyNumber => {
  const { day } = normalizeDate(dob);
  const mulankValue = digitalRoot(day);
  return NUMBER_PROFILES[mulankValue];
};

export const calculateBhagyank = (dob: string): NumerologyNumber => {
  const { day, month, year } = normalizeDate(dob);
  const bhagyankValue = digitalRoot(day + month + year);
  return NUMBER_PROFILES[bhagyankValue];
};

export const calculateNameNumber = (fullName: string): NumerologyNumber => {
  const cleaned = fullName.toLowerCase().replace(/[^a-z]/g, '');
  const total = cleaned
    .split('')
    .map((char) => CHALDEAN_MAP[char] ?? 0)
    .reduce((sum, value) => sum + value, 0);
  const nameNumberValue = digitalRoot(total);
  return NUMBER_PROFILES[nameNumberValue];
};

export const calculateNumerology = (input: NumerologyInput): NumerologyResult => {
  const mulank = calculateMulank(input.dateOfBirth);
  const bhagyank = calculateBhagyank(input.dateOfBirth);
  const nameNumber = calculateNameNumber(input.fullName);
  return { mulank, bhagyank, nameNumber };
};
