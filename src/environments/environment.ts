// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BACKEND_BASE_URL = 'http://127.0.0.1:8081/';

export const environment = {
  production: false,
  RetrieveVideos: BACKEND_BASE_URL + 'RetrieveVideos/',
  RetrieveMatches: BACKEND_BASE_URL + 'RetrieveMatches/',
  AddMatch: BACKEND_BASE_URL + 'AddMatch/',
  AddVideo: BACKEND_BASE_URL + 'AddVideo/',
  GetToken: BACKEND_BASE_URL + 'GetToken/',
  GenerateAccessToken: BACKEND_BASE_URL + 'GenerateAccessToken/',
  RetrieveUniquePlayers: BACKEND_BASE_URL + 'RetrieveUniquePlayers/',
  DeleteMatch: BACKEND_BASE_URL + 'DeleteMatch/',
  UpdateMatch: BACKEND_BASE_URL + 'UpdateMatch/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
