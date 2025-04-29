import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPostsService {
  private apiURL = 'http://localhost:8080/posts'; 
  private postsSubject = new BehaviorSubject<any[]>([]); 

  constructor(private http: HttpClient) {}

 
  get posts$(): Observable<any[]> {
    return this.postsSubject.asObservable();
  }

  fetchPosts(): void {
    this.http.get<any[]>(this.apiURL).subscribe(posts => {
      this.postsSubject.next(posts); 
      console.log(posts);
    });
  }
}
