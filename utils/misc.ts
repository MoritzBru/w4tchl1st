export const conditionallyAddToArray = <Type>(condition: boolean, item: Type, fallback?: Type) => (condition ? [item] : fallback ? [fallback] : []);

export const dateIsFuture = (date: Date) => date > new Date();

export function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
