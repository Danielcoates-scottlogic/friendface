import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateLikesService {
  apiUrl = "http://localhost:8080/likes";
  constructor(private http: HttpClient) { }

  likes(username: string, postId: any) {
    let body = {
      username: username,
      postId: postId
    };
    return this.http.post<any>(this.apiUrl, body);
  }

  countLikes(postId: any) {
    return this.http.get<any>(this.apiUrl + '?postId=' + postId);
  }
}
