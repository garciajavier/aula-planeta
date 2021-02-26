const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Aula Planeta',
  envName: 'PROD',
  production: true,
  apiUrl: 'https://aula-node-backend.herokuapp.com/api',
  GOOGLE_ID: '926325069712-l2poa3lju094kf75ghrmru3p09n9lr3l.apps.googleusercontent.com',
  GOOGLE_SECRET: 'MLAh29-wehWvgKdsbFxDr86C',
  test: false,
  i18nPrefix: './',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress'],
    eslint: packageJson.devDependencies['eslint']
  }
};
