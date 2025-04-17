import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostsService {
  private apiURL = "http://localhost:8080/addPost";
  constructor(private http: HttpClient) { }

  addPosts(postData: any): Observable<any[]> {
    const params = {
      author: postData.author,
      date: postData.date,
      content: postData.post,
      colour: postData.colour
    };
    
    return this.http.post<any>(this.apiURL, null, { params });
  }

}
