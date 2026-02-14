const { withAndroidManifest } = require('@expo/config-plugins');

const withExternalStoragePermission = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    
    if (!androidManifest.manifest['uses-permission']) {
      androidManifest.manifest['uses-permission'] = [];
    }

    // Add MANAGE_EXTERNAL_STORAGE permission
    if (!androidManifest.manifest['uses-permission'].find(p => p.$['android:name'] === 'android.permission.MANAGE_EXTERNAL_STORAGE')) {
      androidManifest.manifest['uses-permission'].push({
        $: {
          'android:name': 'android.permission.MANAGE_EXTERNAL_STORAGE',
          // Optionally add tools:ignore="ScopedStorage" if needed but usually standard permission is enough
        },
      });
    }

    return config;
  });
};

module.exports = withExternalStoragePermission;
