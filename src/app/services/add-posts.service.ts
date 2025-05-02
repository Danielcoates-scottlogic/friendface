import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostsService {
  private apiURL = "http://localhost:8080/posts";
  constructor(private http: HttpClient) { }

  addPosts(postData: any): Observable<any[]> {
    const body = {
      content: postData.post,
      author: postData.author,
      
    };
    console.log(postData);
    return this.http.post<any>(this.apiURL, body);
  }

}
