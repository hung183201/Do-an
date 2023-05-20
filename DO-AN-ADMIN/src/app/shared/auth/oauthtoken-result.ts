import { Profile } from './profile';

export interface OauthServiceTokenResult {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}


export class OauthServiceLocalStorage {
  token_type: string;
  access_token: string;
  refresh_token: string;

  access_token_stored_at: number;
  expires_at: number;

  remember_me: boolean;
  remember_me_username: string;
  
  remember_me_security_stamp: string;
  remember_me_password_hash: string;

  id_token_claims_obj: Profile;

}



//export class OauthServiceTokenResult implements IOauthServiceTokenResult {
//  access_token: string;
//  token_type: string;
//  expires_in: number;
//  refresh_token: string;
//}
