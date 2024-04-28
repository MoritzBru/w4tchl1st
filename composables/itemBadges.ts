import type { Badge, Media } from '~/types';

export function useItemBadges(item: Media) {
  const ratingBadge: Badge = {
    label: formatVote(item.vote_average),
    icon: item.vote_average > 7 ? 'i-ph-star-fill' : item.vote_average > 5 ? 'i-ph-star-half-fill' : 'i-ph-star',
    iconClass: 'text-amber-500',
  };

  const voteNumberBadge: Badge = {
    label: `${formatVote(item.vote_count)} Votes`,
    icon: 'i-ph-users-duotone',
    iconClass: 'text-primary-600',
  };

  const itemReleaseDate = new Date(item.release_date || item.first_air_date || NaN);

  const releaseDateBadge: Badge = {
    label: isNaN(Number(itemReleaseDate)) ? 'unknown' : formatDate(itemReleaseDate),
    icon: 'i-ph-calendar-blank-fill',
    iconClass: dateIsFuture(itemReleaseDate) ? 'text-orange-600' : 'text-emerald-600',
  };

  const defaultBadges: Badge[] = [
    ratingBadge,
    releaseDateBadge,
  ];

  return {
    ratingBadge,
    voteNumberBadge,
    releaseDateBadge,
    defaultBadges,
  };
}
