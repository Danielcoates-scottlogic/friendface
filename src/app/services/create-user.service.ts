import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private apiURL = "http://localhost:8080/users";
  constructor(private http: HttpClient) { }
  createUser(postData: any) {
    let body: {
      username: string;
      colour: string;
      password: string;
      profileImg?: string;
    } = {
      username: postData.createUsername,
      colour: postData.colour,
      password: postData.createPwd
    };
    if(postData.profileImage) {
      body['profileImg'] = postData.profileImage;
    }
    console.log(body);
    return this.http.post<any>(this.apiURL, body);
  }
}
