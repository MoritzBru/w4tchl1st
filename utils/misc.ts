export const conditionallyAddToArray = <Type>(condition: boolean, item: Type, fallback?: Type) => (condition ? [item] : fallback ? [fallback] : []);
