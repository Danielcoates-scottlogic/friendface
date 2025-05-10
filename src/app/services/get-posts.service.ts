import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any[]>(this.apiURL, {headers}).subscribe(posts => {
      this.postsSubject.next(posts); 
    });
  }

}
