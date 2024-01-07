// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_BASE_URL: 'https://localhost:5001',
  // apiUrl: 'http://localhost:8005',
  // authUrl: 'http://localhost:8005',
  // deployUrl: 'http://localhost:4200',
  apiUrl: 'https://ilis-res.vnpt.vn/vnpt-ilis-sfm-web',
  authUrl: 'https://ilis-res.vnpt.vn/vnpt-ilis-sfm-web',
  deployUrl: 'https://ilis-res.vnpt.vn/vnpt-ilis-frontend-sfm-bnh',
  //authType: 'OAuth 2.0',
  authClientId: 'ilis_sfm_bnh',
  authClientSecret: 'gwEga9LCy5xSMp7SH7UV',
  authTimeoutFactor: 0.75,
  authAutoRefreshTokenInterval: 30000,
  //authAuthorizePath: '/Account/OAuthAuthorize',
  authTokenPath: '/api/OAuthToken/Post',
  authUserInfoPath: '/api/NguoiDung/GetProfileNguoiDung'
};
