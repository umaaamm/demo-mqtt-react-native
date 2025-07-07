module.exports = {
  preset: 'jest-expo',
    transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|@react-native' +
      '|@react-navigation' +       // Tambahkan ini
      '|@react-native-community' +
      '|react-native' +
      '|expo' +
      '|expo-router' +
      '|expo-font' +
      '|expo-status-bar' +
      '|expo-modules-core' +
      '|@unimodules' +
      ')',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
