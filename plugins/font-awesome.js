export const extend = function (config) {

  var fa = 'node_modules/font-awesome/css/font-awesome.css';
  if (config.rootDir) {
    fa = path.resolve(config.rootDir, fa);
  }
  config.css.push(fa);
};
