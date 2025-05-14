import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostComponent } from '../../components/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPostsService } from '../../services/add-posts.service';
import { GetPostsService } from '../../services/get-posts.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { GuachosImagePickerModule, ImagePickerConf } from 'guachos-image-picker';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostComponent, FormsModule, HttpClientModule, GuachosImagePickerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imagePickerConf: ImagePickerConf = {
    borderRadius: '4px',
    width: '100px',
    height: '100px',
    hideDownloadBtn: true,
    hideEditBtn: true,
    language: 'en',
  };
  imgSrc = '';
  signedIn = false;
  helper = new JwtHelperService();
  token = localStorage.getItem('jwt')!;
  username: string = "";
  constructor(private postService: AddPostsService, private getPostService: GetPostsService) { }

  ngOnInit() {
    if(localStorage.getItem('jwt') !== null) {
      this.signedIn = true;
      this.username = this.helper.decodeToken(this.token).sub;
    }
  }

  onClickSubmit(data: any, addPost: NgForm) {
    if (this.imgSrc){
      const dataWithImage = {
        ...data,
        postImage: this.imgSrc
      };
      data = dataWithImage;
    };
    this.postService.addPosts(data, this.username).subscribe(
      response => {
        console.log('Post submitted successfully:', response);
        this.getPostService.fetchPosts();
        addPost.resetForm();
      },
      error => {
        console.error('Error submitting post:', error);
      }
    );
  }

  onImageChange(img: any) {
    this.imgSrc = img;
  }
}
