import { useLocalStorage } from '@vueuse/core';
import type { MediaDetails, MediaType } from '~/types';
import { WatchLinkModal } from '#components';

export function useWatchLink() {
  const watchLink = useLocalStorage('wl-watchLink', '');

  const modal = useModal();

  const watchLinkReplacements = {
    id: '[:id]',
    type: '[:type]',
  };

  function getWatchUrl(item: MediaDetails, type: MediaType) {
    if (!watchLink.value) return;
    return watchLink.value
      .replace(watchLinkReplacements.id, item.id)
      .replace(watchLinkReplacements.type, type);
  }

  function changeWatchLink() {
    modal.open(WatchLinkModal);
  }

  return {
    watchLink,
    watchLinkReplacements,
    getWatchUrl,
    changeWatchLink,
  };
}
