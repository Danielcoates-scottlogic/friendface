import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as postData from '../../../assets/posts.json';
import { GetPostsService } from '../../services/get-posts.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  @Input() descending: boolean = false;
  @Input() filterBy: String = "date";
  posts: any[] = [];
  onFormChange() {
    this.sortPosts();
  }
  sortPosts(){
    console.log('here');
    let reversed = 1;
    if (this.descending === true) {
      reversed = -1;
    }
    if (this.filterBy === "name") {
      this.posts.sort((a, b) => 
        a.author.localeCompare(b.author) * reversed
      );
    }
    else {
      this.posts.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf() *reversed);
    }
  }
  constructor(private postService: GetPostsService){
    console.log('PostService:', postService);
  }
  ngOnInit(): void {
    this.postService.getPosts().subscribe((data => {
      this.posts=data;
    }))
    console.log(this.posts)
  }


}
