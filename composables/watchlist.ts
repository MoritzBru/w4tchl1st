import type { Media, MediaDetails } from '~/types';

export function useWatchlistItem(item: Media & Partial<MediaDetails>) {
  const toast = useToast();

  const { removeFromWatchlist, addToWatchlist, getAccountStates } = useTmdb();

  const isLoading = ref(false);

  const _type = getItemType(item);
  const _title = getItemTitle(item);

  function initAccountStates(item: Media & Partial<MediaDetails>) {
    if (item?.account_states) return item.account_states;
    const route = useRoute();
    if (route.meta.isWatchlist) {
      return { watchlist: true };
    }
    return null;
  }

  const _accountStates = ref(initAccountStates(item));

  if (_accountStates.value?.watchlist === undefined) {
    const { state, isLoading: loading } = useAsyncState(getAccountStates(_type, item.id), null);
    syncRefs(loading, isLoading);
    syncRefs(state, _accountStates);
  }

  const isOnWatchlist = computed<boolean>({
    get() {
      return _accountStates.value?.watchlist || false;
    },
    set(newValue: boolean) {
      _accountStates.value!.watchlist = newValue;
    },
  });

  async function remove() {
    try {
      isLoading.value = true;
      await removeFromWatchlist(_type, item.id);
      toast.add({
        title: 'Successfully removed from Watchlist',
        description: _title,
        icon: 'i-ph-check-circle-duotone',
      });
      isOnWatchlist.value = false;
    }
    catch (err) {
      toast.add({
        title: 'Could not remove from Watchlist',
        description: _title,
        icon: 'i-ph-warning-duotone',
        color: 'red',
      });
    }
    finally {
      isLoading.value = false;
    }
  }

  async function add() {
    try {
      isLoading.value = true;

      await addToWatchlist(_type, item.id);
      toast.add({
        title: 'Successfully added to Watchlist',
        description: _title,
        icon: 'i-ph-check-circle-duotone',
      });
      isOnWatchlist.value = true;
    }
    catch (err) {
      toast.add({
        title: 'Could not add to Watchlist',
        description: _title,
        icon: 'i-ph-warning-duotone',
        color: 'red',
      });
    }
    finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading: readonly(isLoading),
    isOnWatchlist: readonly(isOnWatchlist),
    remove,
    add,
  };
}
