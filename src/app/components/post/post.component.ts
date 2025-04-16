import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as postData from '../../../assets/posts.json';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  posts = postData.posts;

}
