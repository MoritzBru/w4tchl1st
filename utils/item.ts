import { TYPE_ICON_LOOKUP } from '~/constants/icon';
import type { Media, MediaType } from '~/types';

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
