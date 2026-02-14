## Example

In `TidGi-Mobile`, we use this module to access the wiki folder stored in `/sdcard/Documents/TidGi/`.

```typescript
import { ExternalStorage } from 'expo-filesystem-android-external-storage';
import { Platform } from 'react-native';

const WIKI_FOLDER = '/sdcard/Documents/TidGi/';

async function syncWiki() {
  if (Platform.OS !== 'android') return;

  const hasPermission = await ExternalStorage.isExternalStorageManager();
  if (!hasPermission) {
    console.warn('Missing MANAGE_EXTERNAL_STORAGE permission');
    return;
  }

  // Ensure folder exists
  if (!(await ExternalStorage.exists(WIKI_FOLDER))) {
    await ExternalStorage.mkdir(WIKI_FOLDER);
  }

  // List all tiddlers
  const files = await ExternalStorage.readDir(WIKI_FOLDER);
  console.log(`Found ${files.length} files`);
}
```
