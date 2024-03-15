// TODO define locale
export const { format: formatVote } = Intl.NumberFormat(undefined, {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export const { format: formatDate } = Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

export const conditionallyAddToArray = <Type>(condition: Boolean, item: Type, fallback?: Type) => (condition ? [item] : fallback ? [fallback] : []);