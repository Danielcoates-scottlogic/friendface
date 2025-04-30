import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private apiURL = "http://localhost:8080/users";
  constructor(private http: HttpClient) { }
  createUser(postData: any) {
    let body = {
      username: postData.createUsername,
      colour: postData.colour,
      password: postData.createPwd
    };
    console.log(body);
    return this.http.post<any>(this.apiURL, body);
  }
}
