import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  examplePost = {
    id: 1,
    author: "FriendFace User",
    date: "01/10/2019",
    content:
      "Today I started using FriendFace! It's the best social media site I've ever used.",
    likes: 0,
    colour: "red",
    checked: false,
  };
  posts = [this.examplePost];
}
