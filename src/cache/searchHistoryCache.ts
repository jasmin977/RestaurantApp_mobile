import { GLOBAL_STORAGE } from '.';

const SEARCH_HISTORY_KEY = 'search_history';

class SearchHistoryCache {
  public static storeSearchHistory(history: string) {
    GLOBAL_STORAGE.set(SEARCH_HISTORY_KEY, JSON.stringify(history));
  }

  public static getSearchHistory() {
    const history = GLOBAL_STORAGE.getString(SEARCH_HISTORY_KEY);
    if (history) return JSON.parse(history);
  }

  public static clearSearchHistory() {
    GLOBAL_STORAGE.delete(SEARCH_HISTORY_KEY);
  }
}

export default SearchHistoryCache;
