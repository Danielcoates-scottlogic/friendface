import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../../components/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPostsService } from '../../services/add-posts.service';
import { GetPostsService } from '../../services/get-posts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostComponent, FormsModule, HttpClientModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(private postService: AddPostsService, private getPostService: GetPostsService){
      console.log('PostService:', postService);
    }
   onClickSubmit(data: any) {
    this.postService.addPosts(data).subscribe(
      response => {
        console.log('Post submitted successfully:', response);
        this.getPostService.fetchPosts();
      },
      error => {
        console.error('Error submitting post:', error);
      }
    );
 
    console.log(data);
   }
}
