import { TYPE_ICON_LOOKUP } from '~/constants/icon';
import type { Media, MediaType } from '~/types';

// TODO define locale
export const { format: formatVote } = Intl.NumberFormat(undefined, {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export const { format: formatDate } = Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

export const { format: formatCurrency } = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol',
  maximumFractionDigits: 0,
});

export const formatTime = (minutes: number) => {
  // seconds
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  // hours
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  // mins
  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? `${hours}h ` : ''}${mins}min`;
};

export const conditionallyAddToArray = <Type>(condition: boolean, item: Type, fallback?: Type) => (condition ? [item] : fallback ? [fallback] : []);

export const getItemTitle = (item: Media) => item.title || item.name || '';

export const getItemType = (item: Media): MediaType => {
  if (item.media_type && ['movie', 'tv'].includes(item.media_type)) return item.media_type;
  return item.title ? 'movie' : 'tv';
};

export const getItemIcon = (item: Media): string => {
  const type = getItemType(item);
  return TYPE_ICON_LOOKUP[type];
};

export const getItemUrl = (item: Media): string => {
  const type = getItemType(item);
  return `${type}/${item.id}`;
};
