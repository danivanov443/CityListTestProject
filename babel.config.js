module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './',
        alias: {
          '@app': './',
          '@api': './src/api/',
          '@components': './src/components/',
          '@constants': './src/constants/',
          '@hooks': './src/hooks/',
          '@navigation': './src/navigation/',
          '@screens': './src/screens/',
          '@themes': './src/themes/',
          '@utils': './src/utils/',
          '@src': './src',
        },
      },
    ],
  ],
};
