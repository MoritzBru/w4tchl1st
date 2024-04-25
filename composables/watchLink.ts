import { useLocalStorage } from '@vueuse/core';
import type { MediaDetails, MediaType } from '~/types';
import { WatchLinkModal } from '#components';

export function useWatchLink() {
  const watchLink = useLocalStorage('wl-watchLink', '');

  const modal = useModal();

  function getWatchUrl(item: MediaDetails, type: MediaType) {
    if (!watchLink.value) return;
    return watchLink.value
      .replace('[:id]', item.id)
      .replace('[:type]', type);
  }

  function changeWatchLink() {
    modal.open(WatchLinkModal);
  }

  return {
    watchLink,
    getWatchUrl,
    changeWatchLink,
  };
}
