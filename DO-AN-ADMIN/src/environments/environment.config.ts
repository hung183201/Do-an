export interface EnvironmentConfig {
  apiService: string,
  allowedDomains: string[],
  disallowedRoutes: string[],
  apiCadasService: string,
  apiUrl: string,
  authUrl: string,
  authType: string,
  authClientId: string,
  authClientSecret: string,
  //authAuthorizePath: string,
  authTokenPath: string,
  authUserInfoPath : string,
}
