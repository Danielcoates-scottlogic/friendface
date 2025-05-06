import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetPostsService } from '../../services/get-posts.service';
import { UpdateLikesService } from '../../services/update-likes.service';
import { HttpClientModule } from '@angular/common/http';
import { Post } from '../../interfaces/post';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  @Input() descending: boolean = false;
  @Input() filterBy: string = "date";
  posts: Post[] = [];
  helper = new JwtHelperService();
  onFormChange() {
    this.sortPosts();
  }
  sortPosts(){
    const reversed = this.descending?-1:1;

    if (this.filterBy === "name") {
      this.posts.sort((a, b) => 
        a.user.username.localeCompare(b.user.username) * reversed
      );
    }
    else {
      this.posts.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf() *reversed);
    }
  }
  constructor(private postService: GetPostsService, private likesService: UpdateLikesService){}
  ngOnInit(): void {
    this.postService.posts$.subscribe((data => {
      this.posts=data;
    }))
    this.postService.fetchPosts();
  }

  toggleLike(post: any) {
    let token = localStorage.getItem('jwt')!;
    let username = this.helper.decodeToken(token).sub;
    this.likesService.likes(username, post.id).subscribe(
      response => {
        console.log('Like submitted successfully:', response);
      })
  }

}
