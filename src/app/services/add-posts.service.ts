import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostsService {
  private apiURL = "http://localhost:8080/posts";
  constructor(private http: HttpClient) { }

  addPosts(postData: any, username: string): Observable<any[]> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = {
      content: postData.post,
      author: username,
      
    };
    return this.http.post<any>(this.apiURL, body, {headers});
  }

}
