import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  login_url: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  access_token: string;

  constructor() {
    this.login_url = 'https://' +
      environment.cognito_endpoint +
      '/login?response_type=token&client_id=' +
      environment.cognito_client_id +
      '&redirect_uri=' +
      encodeURIComponent(environment.cognito_redirect_uri) +
      '&scope=openid';
  }

  login(): void {
    window.location.href = this.login_url;
  }

  isLoggedIn(): boolean {
    const param: string = window.location.hash;
    if (param.length > 1) {
      if (param.slice(0, 1) === '#' || param.slice(0, 1) === '?') {
        const hashs: string[] = param.slice(1).split('&');
        let vars: object = {};
        for(let hash of hashs){
          const array: string[] = hash.split('=');
          vars[array[0]] = array[1];
        }
        if (vars['id_token'] != null) {
          this.id_token = vars['id_token'];
        }
        if (vars['token_type'] != null) {
          this.token_type = vars['token_type'];
        }
        if (vars['access_token'] != null) {
          this.access_token = vars['access_token'];
        }
        if (vars['expires_in'] != null) {
          this.expires_in = vars['expires_in'];
        }
      }
    }
    return this.id_token != null;
  }

  logout(): void {
    this.id_token = null;
    this.expires_in = null;
    this.access_token = null;
    this.token_type = null;
  }
}
