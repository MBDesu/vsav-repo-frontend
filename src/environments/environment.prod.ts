const BACKEND_BASE_URL = 'https://api.vsav.video:8080/';

export const environment = {
  production: true,
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
