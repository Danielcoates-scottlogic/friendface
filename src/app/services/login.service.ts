import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = "http://localhost:8080/login";
  constructor(private http: HttpClient) { }

  login(userData: any) {
    let body = {
      username: userData.username,
      password: userData.pwd
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
