// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApp: 'http://localhost:8080',
  urlBase: 'http://localhost:8080/base',
  moduleCliente: { name: 'cliente' },
  moduleEspecie: { name: 'especie' },
  moduleRaca: { name: 'raca' },
  modulePet: { name: 'pet' },
  moduleLinha: { name: 'linha' },
  modulePorte: { name: 'porte' },
  moduleIdadePet: { name: 'idade-pet' },
  //

  moduleFormacao: { name: 'Formacao', id: 'CDFormacao' },
  moduleAreaAplicacao: { name: 'AreaAplicacao' },
  moduleInstituicao: { name: 'Instituicao' },

  isDevelope: true,
  firebase: {
    apiKey: 'AIzaSyAW7jFSM6aWo48-Y4wBW9R6YvjkV5WjTsQ',
    authDomain: 'tinder-pet-23dc3.firebaseapp.com',
    databaseURL: 'https://tinder-pet-23dc3.firebaseio.com',
    projectId: 'tinder-pet-23dc3',
    storageBucket: 'tinder-pet-23dc3.appspot.com',
    messagingSenderId: '1094795286183',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
