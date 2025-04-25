import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetPostsService } from '../../services/get-posts.service';
import { HttpClientModule } from '@angular/common/http';
import { Post } from '../../interfaces/post';


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
  onFormChange() {
    this.sortPosts();
  }
  sortPosts(){
    const reversed = this.descending?-1:1;

    if (this.filterBy === "name") {
      this.posts.sort((a, b) => 
        a.author.localeCompare(b.author) * reversed
      );
    }
    else {
      this.posts.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf() *reversed);
    }
  }
  constructor(private postService: GetPostsService){}
  ngOnInit(): void {
    this.postService.posts$.subscribe((data => {
      this.posts=data;
    }))
    this.postService.fetchPosts();
  }

  toggleLike(post: any) {
    let likes = Number(post.likes);
    if (likes === 0){
      post.likes = likes + 1;
    }
    else {
      post.likes = likes - 1;
    }
  }

}
