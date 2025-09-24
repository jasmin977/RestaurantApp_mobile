import { user } from '../entities';
import { GLOBAL_STORAGE } from '.';

const APP_KEY = 'app_data';

interface appData {
  firstTimeScanned: boolean;
  isInitialized: boolean;
}
class AppDataCache {
  public static getAppData(): appData | null {
    const appDataString = GLOBAL_STORAGE.getString(APP_KEY);
    return appDataString ? JSON.parse(appDataString) : null;
  }
  public static storeAppData(updates: Partial<appData>) {
    const existingAppDataString = GLOBAL_STORAGE.getString(APP_KEY);
    const existingAppData: appData = existingAppDataString
      ? JSON.parse(existingAppDataString)
      : { firstTimeScanned: false, isInitialized: false };

    const updatedAppData = { ...existingAppData, ...updates };
    GLOBAL_STORAGE.set(APP_KEY, JSON.stringify(updatedAppData));
  }

  public static clearAppData() {
    GLOBAL_STORAGE.delete(APP_KEY);
  }
}

export default AppDataCache;
