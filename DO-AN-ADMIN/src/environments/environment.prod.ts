export const environment = {
  production: false,
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
  authTokenPath: '/api/OAuthToken/Post',
  authUserInfoPath: '/api/NguoiDung/GetProfileNguoiDung'
};
