const browsers = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins')({
      mixins: require('./src/config/mixins'),
    }),
    require('postcss-nested'),
    require('autoprefixer')({ browsers }),
    require('postcss-discard-comments')({ removeAll: true }),
    require('postcss-media-minmax'),
    require('postcss-advanced-variables')({
      variables: require('./src/config/variables'),
    }),
    require('postcss-custom-media')({
      extensions: require('./src/config/media-breakpoints'),
    }),
    require('postcss-color-function'),
    require('postcss-initial'),
    require('css-mqpacker')(),
    require('postcss-csso'),
  ],
};
